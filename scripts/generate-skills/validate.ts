import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { load } from 'js-yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..', '..');
const COMPONENTS_DIR = path.join(REPO_ROOT, 'src/content/articles/products/components');

type Severity = 'must' | 'should' | 'avoid';

type ChecklistItem = {
  severity?: unknown;
  text?: unknown;
  source_section?: unknown;
  sub_items?: unknown;
  note?: unknown;
  layer2_candidate?: unknown;
};

type IssueLevel = 'error' | 'warn';
type Issue = { level: IssueLevel; code: string; message: string; itemIndex?: number };

type Report = {
  component: string;
  yamlPath: string;
  itemCount: number;
  severityCounts: Record<Severity, number>;
  categoryCoverage: { covered: number; total: number; missing: string[] };
  issues: Issue[];
};

const ITEM_MIN = 1;
const ITEM_MAX = 40;
const TEXT_MIN = 10;
const TEXT_MAX = 200;
const VALID_SEVERITIES: Severity[] = ['must', 'should', 'avoid'];
const SEVERITY_MONOTONE_MIN_ITEMS = 6;

// ルール化対象外の見出し（実装情報・参考リンク・構造ラベル等）。カバー率計算から除外する。
const NON_RULE_HEADING_PATTERNS: RegExp[] = [
  /^Props$/,
  /^関連リンク$/,
  /^関連ページ$/,
  /^関連するチェックリスト$/,
  /^参考文献$/,
  /^実装例$/,
  /との違い$/,
  // checklist.yaml 自体を表示する節。抽出対象外（自己参照・循環防止）のため原理的にカバーできない
  /^使い方チェックリスト$/,
];

// source_section のセグメントのうち、見出しではなく mdx 冒頭（最初の見出しより前の説明文）を
// 指す擬似セグメント。実在する見出しがないため逆方向チェックの対象外とする。
const LEAD_PARAGRAPH_SEGMENT = '冒頭';

// `使用上の注意 > ... (via MultipleModalWarning.mdx)` の由来注記。セグメント分解の前に落とす。
const VIA_SUFFIX_PATTERN = /\s*\(via [^)]+\)\s*$/;

function findChecklistFiles(): string[] {
  const result: string[] = [];
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(p);
      else if (entry.isFile() && entry.name === 'checklist.yaml') result.push(p);
    }
  };
  walk(COMPONENTS_DIR);
  return result.sort();
}

function extractHeadings(indexMdxPath: string): string[] {
  if (!fs.existsSync(indexMdxPath)) return [];
  const content = fs.readFileSync(indexMdxPath, 'utf-8');
  const headings: string[] = [];
  let inCode = false;
  for (const line of content.split('\n')) {
    if (/^\s*```/.test(line)) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;
    const m = line.match(/^(#{2,6})\s+(.+?)\s*$/);
    if (m) headings.push(m[2].trim());
  }
  return headings;
}

/**
 * mdx の見出し階層を `親 > 子 > 孫` 形式のフルパスとして列挙する。
 * source_section と同じ表記になるため、そのまま突き合わせに使える。
 */
function extractHeadingPaths(mdxPath: string): string[] {
  if (!fs.existsSync(mdxPath)) return [];
  const paths: string[] = [];
  let stack: string[] = [];
  let inCode = false;
  for (const line of fs.readFileSync(mdxPath, 'utf-8').split('\n')) {
    if (/^\s*```/.test(line)) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;
    const m = line.match(/^(#{2,6})\s+(.+?)\s*$/);
    if (!m) continue;
    const level = m[1].length;
    stack = stack.slice(0, level - 2);
    stack[level - 2] = m[2].trim();
    paths.push(stack.filter(Boolean).join(' > '));
  }
  return paths;
}

/**
 * source_section が指しうる見出しパスの集合。
 *
 * index.mdx に加えて import される `.mdx`（`_components/*.mdx` および親階層の同ディレクトリ）の
 * 見出しも含める。現状 import 先の mdx は見出しを持たず、`(via xxx.mdx)` 付きの source_section も
 * 展開先である親 index.mdx の見出しパスを使う規約だが、import 先が見出しを持つようになったときに
 * 誤検知しないよう先に含めておく。
 */
function collectKnownHeadingPaths(componentDir: string): string[] {
  const paths = extractHeadingPaths(path.join(componentDir, 'index.mdx'));
  for (const dir of [path.join(componentDir, '_components'), path.join(componentDir, '..', '_components')]) {
    if (!fs.existsSync(dir)) continue;
    for (const entry of fs.readdirSync(dir)) {
      if (entry.endsWith('.mdx')) paths.push(...extractHeadingPaths(path.join(dir, entry)));
    }
  }
  return paths;
}

function validateOne(yamlPath: string): Report {
  const componentDir = path.dirname(yamlPath);
  const component = path.relative(COMPONENTS_DIR, componentDir);
  const indexMdxPath = path.join(componentDir, 'index.mdx');

  const issues: Issue[] = [];
  const severityCounts: Record<Severity, number> = { must: 0, should: 0, avoid: 0 };

  let items: ChecklistItem[] = [];
  try {
    const raw = fs.readFileSync(yamlPath, 'utf-8');
    const parsed = (load(raw) ?? {}) as { items?: unknown };
    if (!Array.isArray(parsed.items)) {
      issues.push({ level: 'error', code: 'NO_ITEMS_ARRAY', message: '`items:` 配列が存在しない' });
    } else {
      items = parsed.items as ChecklistItem[];
    }
  } catch (e) {
    issues.push({ level: 'error', code: 'YAML_PARSE_ERROR', message: `YAML パース失敗: ${(e as Error).message}` });
  }

  const itemCount = items.length;

  if (itemCount < ITEM_MIN) {
    issues.push({ level: 'error', code: 'ITEM_COUNT_TOO_FEW', message: `項目数 ${itemCount} (最小 ${ITEM_MIN})` });
  } else if (itemCount > ITEM_MAX) {
    issues.push({ level: 'warn', code: 'ITEM_COUNT_TOO_MANY', message: `項目数 ${itemCount} (上限 ${ITEM_MAX})` });
  }

  // source_section → 最初に出現した item index（逆方向チェックの報告位置に使う）
  const sourceSections = new Map<string, number>();
  items.forEach((item, i) => {
    if (!item || typeof item !== 'object') {
      issues.push({ level: 'error', code: 'INVALID_ITEM', message: 'item が object でない', itemIndex: i });
      return;
    }
    const sev = item.severity;
    const text = item.text;
    const src = item.source_section;

    if (typeof sev !== 'string') {
      issues.push({ level: 'error', code: 'MISSING_SEVERITY', message: 'severity 欠落', itemIndex: i });
    } else if (!VALID_SEVERITIES.includes(sev as Severity)) {
      issues.push({ level: 'error', code: 'INVALID_SEVERITY', message: `severity "${sev}" は不正`, itemIndex: i });
    } else {
      severityCounts[sev as Severity]++;
    }

    if (typeof text !== 'string' || text.length === 0) {
      issues.push({ level: 'error', code: 'MISSING_TEXT', message: 'text 欠落', itemIndex: i });
    } else {
      if (text.length < TEXT_MIN) {
        issues.push({
          level: 'warn',
          code: 'TEXT_TOO_SHORT',
          message: `text 文字数 ${text.length} (最小 ${TEXT_MIN}): "${text}"`,
          itemIndex: i,
        });
      } else if (text.length > TEXT_MAX) {
        issues.push({
          level: 'warn',
          code: 'TEXT_TOO_LONG',
          message: `text 文字数 ${text.length} (上限 ${TEXT_MAX})`,
          itemIndex: i,
        });
      }
    }

    if (typeof src !== 'string' || src.length === 0) {
      issues.push({ level: 'error', code: 'MISSING_SOURCE_SECTION', message: 'source_section 欠落', itemIndex: i });
    } else if (!sourceSections.has(src)) {
      sourceSections.set(src, i);
    }
  });

  const usedSeverities = VALID_SEVERITIES.filter((s) => severityCounts[s] > 0);
  if (itemCount >= SEVERITY_MONOTONE_MIN_ITEMS && usedSeverities.length === 1) {
    issues.push({
      level: 'warn',
      code: 'SEVERITY_MONOTONE',
      message: `全項目が severity="${usedSeverities[0]}"。混在を検討`,
    });
  }

  // 逆方向チェック: source_section が mdx の見出しを正しく指しているか。
  // 順方向のカバー率（見出し → source_section）は「拾えていない見出し」しか見ないため、
  // 出典側が消えた・改名された・階層を書き間違えたといった出典とのズレを検出できない。
  //
  // 2 段階で見る:
  //   1. セグメントが実在するか      → SOURCE_SECTION_NOT_FOUND（見出しの削除・改名・転記ミス）
  //   2. 階層（フルパス）が一致するか → SOURCE_SECTION_HIERARCHY_MISMATCH（中間の見出しの抜け等）
  // 1 を通っても 2 で落ちる例: `レイアウト > [WIP] モバイル > X` は各セグメントが実在しても、
  // 実際の階層が `レイアウト > 2. ドロップダウンパネル > [WIP] モバイル > X` ならパスとしては誤り。
  const knownPaths = collectKnownHeadingPaths(componentDir);
  const knownPathSet = new Set(knownPaths);
  const knownHeadings = new Set(knownPaths.flatMap((p) => p.split('>').map((s) => s.trim())));
  for (const [src, itemIndex] of sourceSections) {
    const cleaned = src.replace(VIA_SUFFIX_PATTERN, '');
    const segments = cleaned
      .split('>')
      .map((s) => s.trim())
      .filter(Boolean);

    const unknown = segments.filter((s) => s !== LEAD_PARAGRAPH_SEGMENT && !knownHeadings.has(s));
    if (unknown.length > 0) {
      issues.push({
        level: 'error',
        code: 'SOURCE_SECTION_NOT_FOUND',
        message: `source_section "${src}" に mdx の見出しと一致しないセグメントがある: ${unknown.join(', ')}`,
        itemIndex,
      });
      continue;
    }

    // 冒頭（見出しではない擬似セグメント）を含むものは実在するパスを持たないため階層チェックの対象外
    if (segments.includes(LEAD_PARAGRAPH_SEGMENT) || knownPathSet.has(cleaned)) continue;

    const leaf = segments[segments.length - 1];
    const correct = knownPaths.filter((p) => p.split('>').pop()?.trim() === leaf);
    issues.push({
      level: 'error',
      code: 'SOURCE_SECTION_HIERARCHY_MISMATCH',
      message:
        `source_section "${src}" の見出し階層が mdx と一致しない` + (correct.length > 0 ? `。正しくは "${correct[0]}"` : ''),
      itemIndex,
    });
  }

  const allHeadings = extractHeadings(indexMdxPath);
  const headings = allHeadings.filter((h) => !NON_RULE_HEADING_PATTERNS.some((p) => p.test(h)));
  const sectionsConcat = Array.from(sourceSections.keys()).join(' || ');
  const missing: string[] = [];
  let covered = 0;
  for (const h of headings) {
    if (sectionsConcat.includes(h)) covered++;
    else missing.push(h);
  }
  const total = headings.length;
  const coverageRatio = total === 0 ? 1 : covered / total;
  if (total > 0 && coverageRatio < 0.3) {
    issues.push({
      level: 'warn',
      code: 'LOW_CATEGORY_COVERAGE',
      message: `見出しカバー率 ${(coverageRatio * 100).toFixed(0)}% (${covered}/${total})。未カバー: ${missing.slice(0, 5).join(', ')}${missing.length > 5 ? ' ...' : ''}`,
    });
  }

  return {
    component,
    yamlPath,
    itemCount,
    severityCounts,
    categoryCoverage: { covered, total, missing },
    issues,
  };
}

function parseFilesArg(): string[] | null {
  const args = process.argv.slice(2);
  const idx = args.indexOf('--files');
  if (idx < 0) return null;
  // --files の後続トークンを取り、フラグ (--xxx) が出たら打ち切り
  const tail = args.slice(idx + 1);
  const files: string[] = [];
  for (const a of tail) {
    if (a.startsWith('--')) break;
    files.push(a);
  }
  return files;
}

function main() {
  const jsonMode = process.argv.includes('--json');
  const explicit = parseFilesArg();
  const files = explicit
    ? // 明示指定: REPO_ROOT 起点で解決し、components 配下かつ checklist.yaml のみに正規化
      explicit
        .map((f) => (path.isAbsolute(f) ? f : path.resolve(REPO_ROOT, f)))
        .filter((f) => f.endsWith('/checklist.yaml') && f.startsWith(COMPONENTS_DIR + path.sep))
        .filter((f) => fs.existsSync(f))
    : findChecklistFiles();

  if (files.length === 0) {
    if (!jsonMode) console.log('対象ファイルなし。何もしません。');
    process.exit(0);
  }

  const reports = files.map(validateOne);

  if (jsonMode) {
    console.log(JSON.stringify(reports, null, 2));
  } else {
    for (const r of reports) {
      const errCount = r.issues.filter((i) => i.level === 'error').length;
      const warnCount = r.issues.filter((i) => i.level === 'warn').length;
      const mark = errCount > 0 ? 'ERR ' : warnCount > 0 ? 'WARN' : 'OK  ';
      console.log(
        `[${mark}] ${r.component} — items=${r.itemCount} (must=${r.severityCounts.must}/should=${r.severityCounts.should}/avoid=${r.severityCounts.avoid}) coverage=${r.categoryCoverage.covered}/${r.categoryCoverage.total}`,
      );
      for (const issue of r.issues) {
        const idx = issue.itemIndex !== undefined ? ` #${issue.itemIndex}` : '';
        console.log(`      ${issue.level.toUpperCase()} ${issue.code}${idx}: ${issue.message}`);
      }
    }
  }

  const totalErr = reports.reduce((a, r) => a + r.issues.filter((i) => i.level === 'error').length, 0);
  const totalWarn = reports.reduce((a, r) => a + r.issues.filter((i) => i.level === 'warn').length, 0);
  const errFiles = reports.filter((r) => r.issues.some((i) => i.level === 'error')).length;
  const warnFiles = reports.filter(
    (r) => r.issues.some((i) => i.level === 'warn') && !r.issues.some((i) => i.level === 'error'),
  ).length;
  const okFiles = reports.length - errFiles - warnFiles;

  if (!jsonMode) {
    console.log('');
    console.log(`=== Summary ===`);
    console.log(`files: ${reports.length} (ok=${okFiles}, warn=${warnFiles}, error=${errFiles})`);
    console.log(`issues: errors=${totalErr}, warnings=${totalWarn}`);
  }

  process.exit(totalErr > 0 ? 1 : 0);
}

main();
