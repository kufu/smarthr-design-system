import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { runAllChecks } from './lib/checks.ts';
import type { Severity } from './lib/finding.ts';
import { parseGuide } from './lib/guide-parser.ts';
import { buildReport, renderMarkdown, type ComponentResult } from './lib/audit-report.ts';
import { COMPONENTS_DOC_DIR, listGuideDirNames, loadSources } from './lib/sources.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, 'output');

function countBySeverity(findings: { severity: Severity }[]): Record<Severity, number> {
  const c: Record<Severity, number> = { error: 0, warning: 0, info: 0 };
  for (const f of findings) c[f.severity]++;
  return c;
}

function main(): void {
  const onlyArg = process.argv.indexOf('--only');
  const only = onlyArg !== -1 ? process.argv[onlyArg + 1]?.split(',') : null;

  let dirNames = listGuideDirNames();
  if (only) dirNames = dirNames.filter((d) => only.includes(d));

  console.log(`[audit] ${dirNames.length} 件のガイドを静的監査します`);
  const src = loadSources(dirNames);

  const results: ComponentResult[] = dirNames.map((dirName) => {
    const doc = parseGuide(path.join(COMPONENTS_DOC_DIR, `${dirName}.md`));
    const findings = runAllChecks(doc, src);
    return { component: dirName, findings, counts: countBySeverity(findings) };
  });

  const report = buildReport(new Date().toISOString(), results);

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(OUTPUT_DIR, 'findings.json'), JSON.stringify(report, null, 2) + '\n');
  fs.writeFileSync(path.join(OUTPUT_DIR, 'audit-summary.md'), renderMarkdown(report));

  // コンソールサマリ
  console.log(`\n=== 静的監査サマリ ===`);
  console.log(`スキャン: ${report.scanned}`);
  console.log(`🔴 error 保有: ${report.componentsWithError} / 🟡 warning のみ: ${report.componentsWithWarning} / ✅ 指摘なし: ${report.clean}`);
  console.log(`finding 総数: error ${report.totals.error} / warning ${report.totals.warning} / info ${report.totals.info}`);
  console.log(`チェック別:`, JSON.stringify(report.byCheck));
  const topErrors = results
    .filter((r) => r.counts.error > 0)
    .sort((a, b) => b.counts.error - a.counts.error)
    .slice(0, 15);
  if (topErrors.length) {
    console.log(`\n🔴 error 保有コンポーネント（上位）:`);
    for (const r of topErrors) console.log(`  - ${r.component}: error ${r.counts.error}, warning ${r.counts.warning}`);
  }
  console.log(`\n出力: ${path.join(OUTPUT_DIR, 'audit-summary.md')}`);
}

main();
