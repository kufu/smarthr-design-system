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

async function ghFetch(url: string): Promise<Response> {
  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  const res = await fetch(url, { headers });
  if (!res.ok) {
    throw new Error(`GitHub API ${res.status} ${res.statusText}: ${url}`);
  }
  return res;
}

/**
 * tamatebako の eslint-plugin-smarthr/rules/ 配下から各ルールの README.md を取得する。
 * 結果は cachePath にキャッシュし、存在すれば再利用する。
 */
export async function fetchEslintRules(cachePath: string): Promise<EslintRuleRaw[]> {
  if (fs.existsSync(cachePath)) {
    const raw = JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
    if (Array.isArray(raw)) return raw as EslintRuleRaw[];
  }

  const dirRes = await ghFetch(`${GH_API}/repos/${REPO}/contents/${RULES_PATH}`);
  const entries = (await dirRes.json()) as Array<{ name: string; type: string }>;
  const ruleNames = entries.filter((e) => e.type === 'dir').map((e) => e.name);

  const rules: EslintRuleRaw[] = [];
  for (const ruleName of ruleNames) {
    if (isExcluded(ruleName)) continue;
    const readmeUrl = `${GH_API}/repos/${REPO}/contents/${RULES_PATH}/${ruleName}/README.md`;
    try {
      const r = await ghFetch(readmeUrl);
      const json = (await r.json()) as { content: string; encoding: string };
      const readme = Buffer.from(json.content, json.encoding as BufferEncoding).toString('utf-8');
      rules.push({ name: ruleName, readme });
    } catch {
      // README が無いルールはスキップ
    }
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

function extractPrimaryComponents(
  ruleName: string,
  description: string,
  componentDisplayNames: Set<string>,
): Set<string> {
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

export function getRelevantCodeExamples(
  rule: EslintRuleWithContent,
  componentName: string,
): { ng: string[]; ok: string[] } {
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
