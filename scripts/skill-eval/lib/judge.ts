import { JUDGE_MAX_TOKENS, JUDGE_MODEL } from '../config.ts';
import type { TestPrompt } from '../prompts.ts';
import { complete } from './anthropic.ts';
import type { MachineCheck } from './machine-check.ts';

export type JudgeScores = {
  outcome: number;
  process: number;
  style: number;
  efficiency: number;
};

export type JudgeResult = JudgeScores & {
  rationale: string;
  raw: string;
  error?: string;
};

const AXES = `評価観点（各 1〜5 点のリッカート尺度。5 が最良）:
- outcome: 要件を満たす smarthr-ui コンポーネントが選ばれ、正しく import・使用されているか。
- process: 似たコンポーネントの使い分け・props 選択の判断が妥当か（非推奨コンポーネントを避けているか含む）。
- style: SmartHR デザインシステムの規約・eslint-plugin-smarthr のルールに準拠しているか。
- efficiency: 独自の div / 生 HTML 実装を避け、既存コンポーネントで簡潔に実装できているか。冗長でないか。`;

const SCALE = `点数の目安:
5 = 模範的。指摘事項なし。
4 = 概ね良好。軽微な改善余地のみ。
3 = 要件は満たすが明確な問題あり。
2 = 重要な誤り（誤コンポーネント選択・規約違反）が複数。
1 = 要件未達、または重大な誤り。`;

/**
 * 生成コードを 4 観点 × 5 点で採点する LLM-as-Judge。
 * 条件（with/without）は伝えずブラインドで採点。機械チェックの客観シグナルは根拠として提示する。
 */
export async function judge(
  code: string,
  prompt: TestPrompt,
  machine: MachineCheck,
): Promise<JudgeResult> {
  const system = `あなたは SmartHR デザインシステム（smarthr-ui）に精通したシニアフロントエンドレビュアーです。提示された React コンポーネント実装を、与えられた要件と評価観点に従って厳密に採点します。出力は指定された JSON のみとし、説明文を JSON の外に書かないこと。`;

  const machineSummary = [
    `- パース可能: ${machine.parseable}`,
    `- smarthr-ui import: ${machine.hasSmarthrUiImport}`,
    `- 使用 smarthr-ui コンポーネント: ${machine.usedSmarthrComponents.join(', ') || '(なし)'}`,
    `- eslint(smarthr/*) 違反数: ${machine.eslintSmarthrViolations}`,
    `- metadata 未知 props 数: ${machine.unknownPropCount}`,
    `- 代替可能な native HTML 要素数: ${machine.nativeHtmlCount} (${machine.nativeHtmlElements.join(', ') || 'なし'})`,
  ].join('\n');

  const user = `### 要件
${prompt.prompt}

### 望ましいコンポーネント（参考）
- 許容: ${prompt.expected.join(', ')}
- 最も妥当: ${prompt.preferred}

### ${AXES}

### ${SCALE}

### 機械チェック結果（採点の客観的根拠として参照）
${machineSummary}

### 採点対象のコード
\`\`\`tsx
${code}
\`\`\`

### 出力フォーマット（この JSON のみ）
{"outcome": <1-5>, "process": <1-5>, "style": <1-5>, "efficiency": <1-5>, "rationale": "<各観点の要点を 2〜3 文で>"}`;

  const raw = await complete({
    model: JUDGE_MODEL,
    maxTokens: JUDGE_MAX_TOKENS,
    system,
    user,
  });

  return parseJudge(raw);
}

function clampScore(v: unknown): number {
  const n = Math.round(Number(v));
  if (!Number.isFinite(n)) return 0;
  return Math.min(5, Math.max(1, n));
}

export function parseJudge(raw: string): JudgeResult {
  const fallback: JudgeResult = {
    outcome: 0,
    process: 0,
    style: 0,
    efficiency: 0,
    rationale: '',
    raw,
    error: undefined,
  };
  try {
    const m = raw.match(/\{[\s\S]*\}/);
    if (!m) throw new Error('JSON が見つかりません');
    const obj = JSON.parse(m[0]) as Record<string, unknown>;
    return {
      outcome: clampScore(obj.outcome),
      process: clampScore(obj.process),
      style: clampScore(obj.style),
      efficiency: clampScore(obj.efficiency),
      rationale: String(obj.rationale ?? ''),
      raw,
    };
  } catch (e) {
    return { ...fallback, error: e instanceof Error ? e.message : String(e) };
  }
}
