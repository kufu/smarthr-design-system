import type { ConditionAggregate, PromptResult } from './aggregate.ts';

function fmt(v: number | null): string {
  if (v === null) return '–';
  return Number.isInteger(v) ? String(v) : v.toFixed(2);
}

function judgeCell(a: ConditionAggregate): string {
  return `O${fmt(a.outcomeMedian)} / P${fmt(a.processMedian)} / S${fmt(a.styleMedian)} / E${fmt(a.efficiencyMedian)}`;
}

/** iteration の集計結果を Markdown サマリに整形する */
export function renderSummaryMarkdown(iteration: number, results: PromptResult[]): string {
  const lines: string[] = [];
  lines.push(`# M8 Skill実効性ベンチ — iteration-${iteration}`);
  lines.push('');
  lines.push(
    'with_skill（オラクル注入）vs without_skill（共通プロジェクト文脈のみ）の比較。Judge は 4 観点 × 5 点リッカートの中央値（O=Outcome, P=Process, S=Style, E=Efficiency）。',
  );
  lines.push('');

  const flagged = results.filter((r) => r.regressions.length > 0);
  lines.push('## 要修正フラグ（with が without を下回った観点）');
  lines.push('');
  if (flagged.length === 0) {
    lines.push('該当なし（全プロンプトで with ≥ without）。');
  } else {
    lines.push('| プロンプト | 観点 | with | without | Δ |');
    lines.push('|---|---|---|---|---|');
    for (const r of flagged) {
      for (const x of r.regressions) {
        lines.push(`| ${r.promptId} | ${x.axis} | ${x.with} | ${x.without} | ${x.delta} |`);
      }
    }
  }
  lines.push('');

  lines.push('## Judge スコア中央値');
  lines.push('');
  lines.push('| プロンプト | 種別 | 条件 | Judge (O/P/S/E) | ゲート通過率 | 期待使用率 | eslint違反(平均) | native HTML(平均) |');
  lines.push('|---|---|---|---|---|---|---|---|');
  for (const r of results) {
    for (const cond of [r.with_skill, r.without_skill]) {
      lines.push(
        `| ${r.promptId} | ${r.category} | ${cond.condition} | ${judgeCell(cond)} | ${fmt(
          cond.gatePassRate,
        )} | ${fmt(cond.expectedUseRate)} | ${fmt(cond.eslintViolationsMean)} | ${fmt(
          cond.nativeHtmlMean,
        )} |`,
      );
    }
  }
  lines.push('');

  lines.push('## 機械チェックシグナル詳細');
  lines.push('');
  lines.push('| プロンプト | 条件 | unknown props(平均) | native HTML(平均) | eslint違反(平均) |');
  lines.push('|---|---|---|---|---|');
  for (const r of results) {
    for (const cond of [r.with_skill, r.without_skill]) {
      lines.push(
        `| ${r.promptId} | ${cond.condition} | ${fmt(cond.unknownPropsMean)} | ${fmt(
          cond.nativeHtmlMean,
        )} | ${fmt(cond.eslintViolationsMean)} |`,
      );
    }
  }
  lines.push('');

  return lines.join('\n');
}
