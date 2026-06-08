import type { Finding, Severity } from './finding.ts';

export type ComponentResult = {
  component: string;
  findings: Finding[];
  counts: Record<Severity, number>;
};

export type AuditReport = {
  generatedAt: string;
  scanned: number;
  totals: Record<Severity, number>;
  componentsWithError: number;
  componentsWithWarning: number;
  clean: number;
  byCheck: Record<string, Record<Severity, number>>;
  components: ComponentResult[];
};

export function buildReport(generatedAt: string, results: ComponentResult[]): AuditReport {
  const totals: Record<Severity, number> = { error: 0, warning: 0, info: 0 };
  const byCheck: Record<string, Record<Severity, number>> = {};
  let componentsWithError = 0;
  let componentsWithWarning = 0;
  let clean = 0;

  for (const r of results) {
    if (r.counts.error > 0) componentsWithError++;
    else if (r.counts.warning > 0) componentsWithWarning++;
    if (r.findings.length === 0) clean++;
    for (const f of r.findings) {
      totals[f.severity]++;
      byCheck[f.check] ??= { error: 0, warning: 0, info: 0 };
      byCheck[f.check][f.severity]++;
    }
  }

  return {
    generatedAt,
    scanned: results.length,
    totals,
    componentsWithError,
    componentsWithWarning,
    clean,
    byCheck,
    components: results,
  };
}

const SEV_LABEL: Record<Severity, string> = { error: '🔴 error', warning: '🟡 warning', info: '🔵 info' };

export function renderMarkdown(report: AuditReport): string {
  const L: string[] = [];
  L.push('# M8 層2 静的監査レポート — ガイドdoc 全件');
  L.push('');
  L.push(`生成: ${report.generatedAt}`);
  L.push('');
  L.push(
    '対象: `components/<PascalCase>.md`（component-guidelines）全件。各ガイドの中身が単一ソース（metadata.json / コンポーネント mdx / checklist.yaml）と整合しているかを決定的に検査（LLM不使用）。',
  );
  L.push('');

  L.push('## サマリ');
  L.push('');
  L.push(`- スキャン件数: **${report.scanned}**`);
  L.push(`- 🔴 error 保有コンポーネント: **${report.componentsWithError}**`);
  L.push(`- 🟡 warning のみ保有: **${report.componentsWithWarning}**`);
  L.push(`- ✅ 指摘なし: **${report.clean}**`);
  L.push(`- finding 総数: error ${report.totals.error} / warning ${report.totals.warning} / info ${report.totals.info}`);
  L.push('');

  L.push('### チェック別 finding 数');
  L.push('');
  L.push('| チェック | 🔴 error | 🟡 warning | 🔵 info |');
  L.push('|---|---|---|---|');
  const checkLabel: Record<string, string> = {
    metadata: 'metadata.json照合',
    deprecation: '非推奨参照検出',
    mdx: 'mdx整合',
    structure: '構造lint',
  };
  for (const [check, label] of Object.entries(checkLabel)) {
    const c = report.byCheck[check] ?? { error: 0, warning: 0, info: 0 };
    L.push(`| ${label} | ${c.error} | ${c.warning} | ${c.info} |`);
  }
  L.push('');

  // 要修正フラグ（error 保有を優先、次に warning）
  const flagged = report.components
    .filter((c) => c.counts.error > 0 || c.counts.warning > 0)
    .sort((a, b) => b.counts.error - a.counts.error || b.counts.warning - a.counts.warning);

  L.push('## 要修正フラグ（コンポーネント単位）');
  L.push('');
  if (flagged.length === 0) {
    L.push('error / warning なし。');
  } else {
    L.push('| コンポーネント | 🔴 | 🟡 | 🔵 | 主な指摘 |');
    L.push('|---|---|---|---|---|');
    for (const c of flagged) {
      const top = c.findings
        .filter((f) => f.severity !== 'info')
        .slice(0, 3)
        .map((f) => `${f.check}:${f.location}`)
        .join(', ');
      L.push(`| ${c.component} | ${c.counts.error} | ${c.counts.warning} | ${c.counts.info} | ${top} |`);
    }
  }
  L.push('');

  // 詳細
  L.push('## 指摘詳細');
  L.push('');
  for (const c of report.components) {
    if (c.findings.length === 0) continue;
    L.push(`### ${c.component} （🔴${c.counts.error} 🟡${c.counts.warning} 🔵${c.counts.info}）`);
    for (const f of c.findings) {
      const diff =
        f.expected !== undefined || f.actual !== undefined
          ? `（期待: \`${f.expected ?? '-'}\` / 実際: \`${f.actual ?? '-'}\`）`
          : '';
      L.push(`- ${SEV_LABEL[f.severity]} [${f.check}] \`${f.location}\` — ${f.message}${diff}`);
    }
    L.push('');
  }

  return L.join('\n');
}
