import fs from 'node:fs';
import path from 'node:path';

const GH_API = 'https://api.github.com';
const REPO = 'kufu/tamatebako';
const RULES_PATH = 'packages/eslint-plugin-smarthr/rules';

const EXCLUDED_RULE_PREFIXES = ['autofixer-', 'format-', 'prohibit-', 'require-'];
const EXCLUDED_RULE_NAMES = ['component-name', 'trim-props', 'no-import-other-domain'];

export type EslintRuleRaw = {
  name: string;
  readme: string;
};

export type EslintRuleWithContent = {
  name: string;
  description: string;
  ngSection: string;
  okSection: string;
  matchedComponents: Set<string>;
};

function isExcluded(ruleName: string): boolean {
  if (EXCLUDED_RULE_NAMES.includes(ruleName)) return true;
  return EXCLUDED_RULE_PREFIXES.some((prefix) => ruleName.startsWith(prefix));
}

type GhFetchOptions = {
  /** 404 を許容する場合 true。許容時は null を返す。 */
  allow404?: boolean;
  /** rate limit 検出時の retry 試行回数。デフォルト 3 回。 */
  maxRetries?: number;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function ghFetch(url: string, options: GhFetchOptions = {}): Promise<Response | null> {
  const { allow404 = false, maxRetries = 3 } = options;
  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const res = await fetch(url, { headers });
    if (res.ok) return res;
    if (res.status === 404 && allow404) return null;

    // rate limit: X-RateLimit-Remaining: 0 か 403/429 のときは reset まで待って再試行
    const remaining = res.headers.get('x-ratelimit-remaining');
    const isRateLimited = (res.status === 403 || res.status === 429) && (remaining === '0' || res.headers.get('retry-after'));
    if (isRateLimited && attempt < maxRetries) {
      const retryAfterSec = Number(res.headers.get('retry-after')) || 0;
      const resetEpoch = Number(res.headers.get('x-ratelimit-reset')) || 0;
      const nowSec = Math.floor(Date.now() / 1000);
      const waitSec = Math.max(retryAfterSec, resetEpoch ? resetEpoch - nowSec : 0, 1);
      console.warn(`⚠️  GitHub API rate limit に遭遇。${waitSec}s 待機して再試行 (${attempt + 1}/${maxRetries}): ${url}`);
      await sleep(waitSec * 1000);
      continue;
    }

    throw new Error(`GitHub API ${res.status} ${res.statusText}: ${url}`);
  }

  throw new Error(`GitHub API rate limit 再試行回数を超過: ${url}`);
}

/**
 * tamatebako の eslint-plugin-smarthr/rules/ 配下から各ルールの README.md を取得する。
 * 結果は cachePath にキャッシュし、存在すれば再利用する。
 *
 * `ruleNamesOutputPath` を渡した場合、上流のルールディレクトリ名一覧 (除外前の全件) を
 * 改行区切りで書き出す。AI プロンプト (`.github/prompts/checklist-v3.md` 等) から参照される。
 */
export async function fetchEslintRules(cachePath: string, ruleNamesOutputPath?: string): Promise<EslintRuleRaw[]> {
  if (fs.existsSync(cachePath)) {
    const raw = JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
    if (Array.isArray(raw)) return raw as EslintRuleRaw[];
  }

  if (!process.env.GITHUB_TOKEN) {
    console.warn(
      '⚠️  GITHUB_TOKEN が未設定です。GitHub API の unauthenticated rate limit (60 req/hour) のためルール取得が rate limit にかかる可能性があります。',
    );
  }

  const dirRes = await ghFetch(`${GH_API}/repos/${REPO}/contents/${RULES_PATH}`);
  if (!dirRes) throw new Error(`GitHub API: rules ディレクトリ取得失敗`);
  const entries = (await dirRes.json()) as Array<{ name: string; type: string }>;
  const allRuleNames = entries
    .filter((e) => e.type === 'dir')
    .map((e) => e.name)
    .sort();

  if (ruleNamesOutputPath) {
    fs.mkdirSync(path.dirname(ruleNamesOutputPath), { recursive: true });
    fs.writeFileSync(ruleNamesOutputPath, allRuleNames.join('\n') + '\n');
  }

  const rules: EslintRuleRaw[] = [];
  for (const ruleName of allRuleNames) {
    if (isExcluded(ruleName)) continue;
    const readmeUrl = `${GH_API}/repos/${REPO}/contents/${RULES_PATH}/${ruleName}/README.md`;
    const r = await ghFetch(readmeUrl, { allow404: true });
    if (!r) {
      // README.md が無いルールは意図的にスキップ
      continue;
    }
    const json = (await r.json()) as { content: string; encoding: string };
    const readme = Buffer.from(json.content, json.encoding as BufferEncoding).toString('utf-8');
    rules.push({ name: ruleName, readme });
  }

  fs.mkdirSync(path.dirname(cachePath), { recursive: true });
  fs.writeFileSync(cachePath, JSON.stringify(rules, null, 2));
  return rules;
}

function extractFirstParagraph(content: string): string {
  const lines = content.split('\n');
  let inContent = false;
  const paragraphLines: string[] = [];

  for (const line of lines) {
    if (line.startsWith('# ')) {
      inContent = true;
      continue;
    }
    if (!inContent) continue;
    if (line.startsWith('#')) break;
    if (line.trim() === '') {
      if (paragraphLines.length > 0) break;
      continue;
    }
    paragraphLines.push(line.trim());
  }

  return paragraphLines.join(' ');
}

function extractSection(content: string, headerPattern: RegExp): string {
  const lines = content.split('\n');
  let inSection = false;
  const sectionLines: string[] = [];

  for (const line of lines) {
    if (headerPattern.test(line)) {
      inSection = true;
      continue;
    }
    if (inSection) {
      if (/^## /.test(line)) break;
      sectionLines.push(line);
    }
  }

  return sectionLines.join('\n');
}

function extractPrimaryComponents(ruleName: string, description: string, componentDisplayNames: Set<string>): Set<string> {
  const primary = new Set<string>();
  const segments = ruleName.split('-');
  const cleanedDescription = description.replace(/\[[^\]]*\]\([^)]*\)/g, '');

  for (const displayName of componentDisplayNames) {
    const lowerName = displayName.toLowerCase();

    if (segments.some((s) => s.toLowerCase() === lowerName)) {
      primary.add(displayName);
      continue;
    }

    let pairMatched = false;
    for (let i = 0; i < segments.length - 1; i++) {
      if (segments[i].toLowerCase() + segments[i + 1].toLowerCase() === lowerName) {
        primary.add(displayName);
        pairMatched = true;
        break;
      }
    }
    if (pairMatched) continue;

    const nameRegex = new RegExp(`(?<![A-Za-z])${displayName}(?![A-Za-z])`, 'i');
    if (nameRegex.test(cleanedDescription)) {
      primary.add(displayName);
    }
  }

  return primary;
}

export function buildComponentRuleMap(
  rules: EslintRuleRaw[],
  componentDisplayNames: Set<string>,
): Map<string, EslintRuleWithContent[]> {
  const componentRules = new Map<string, EslintRuleWithContent[]>();

  for (const { name: ruleName, readme } of rules) {
    const description = extractFirstParagraph(readme);
    const primaryComponents = extractPrimaryComponents(ruleName, description, componentDisplayNames);

    if (primaryComponents.size === 0) continue;

    const ngSection = extractSection(readme, /^## ❌ Incorrect/);
    const okSection = extractSection(readme, /^## ✅ Correct/);

    const ruleInfo: EslintRuleWithContent = {
      name: ruleName,
      description,
      ngSection,
      okSection,
      matchedComponents: primaryComponents,
    };

    for (const displayName of primaryComponents) {
      if (!componentRules.has(displayName)) {
        componentRules.set(displayName, []);
      }
      componentRules.get(displayName)!.push(ruleInfo);
    }
  }

  return componentRules;
}

export function getRelevantCodeExamples(rule: EslintRuleWithContent, componentName: string): { ng: string[]; ok: string[] } {
  const extract = (sectionContent: string): string[] => {
    const blocks: string[] = [];
    const codeBlockRegex = /```(?:\w+)?\n([\s\S]*?)```/g;
    let match;
    while ((match = codeBlockRegex.exec(sectionContent)) !== null) {
      const code = match[1].trim();
      if (new RegExp(`<${componentName}[\\s/>]`).test(code)) {
        blocks.push(code);
      }
    }
    return blocks;
  };
  return { ng: extract(rule.ngSection), ok: extract(rule.okSection) };
}
