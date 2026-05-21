import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

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
const ITEM_MAX = 20;
const TEXT_MIN = 10;
const TEXT_MAX = 200;
const VALID_SEVERITIES: Severity[] = ['must', 'should', 'avoid'];

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

function validateOne(yamlPath: string): Report {
  const componentDir = path.dirname(yamlPath);
  const component = path.relative(COMPONENTS_DIR, componentDir);
  const indexMdxPath = path.join(componentDir, 'index.mdx');

  const issues: Issue[] = [];
  const severityCounts: Record<Severity, number> = { must: 0, should: 0, avoid: 0 };

  let items: ChecklistItem[] = [];
  try {
    const raw = fs.readFileSync(yamlPath, 'utf-8');
    const parsed = (yaml.load(raw) ?? {}) as { items?: unknown };
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

  const sourceSections = new Set<string>();
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
    } else {
      sourceSections.add(src);
    }
  });

  const usedSeverities = VALID_SEVERITIES.filter((s) => severityCounts[s] > 0);
  if (itemCount >= 3 && usedSeverities.length === 1) {
    issues.push({
      level: 'warn',
      code: 'SEVERITY_MONOTONE',
      message: `全項目が severity="${usedSeverities[0]}"。混在を検討`,
    });
  }

  const headings = extractHeadings(indexMdxPath);
  const sectionsConcat = Array.from(sourceSections).join(' || ');
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

function main() {
  const jsonMode = process.argv.includes('--json');
  const files = findChecklistFiles();
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
