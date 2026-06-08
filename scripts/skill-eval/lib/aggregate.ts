import type { Condition } from '../config.ts';
import type { TestPrompt } from '../prompts.ts';
import type { JudgeResult } from './judge.ts';
import type { MachineCheck } from './machine-check.ts';
import { mean, median, rate } from './stats.ts';

export type RepRecord = {
  rep: number;
  machine: MachineCheck;
  judge: JudgeResult | null; // ゲート未通過なら null
};

export type ConditionAggregate = {
  condition: Condition;
  reps: number;
  gatePassRate: number | null;
  expectedUseRate: number | null;
  eslintViolationsMean: number | null;
  unknownPropsMean: number | null;
  nativeHtmlMean: number | null;
  // Judge 中央値（ゲート通過 & 採点成功 rep のみ対象）
  judgedReps: number;
  outcomeMedian: number | null;
  processMedian: number | null;
  styleMedian: number | null;
  efficiencyMedian: number | null;
};

const AXES = ['outcome', 'process', 'style', 'efficiency'] as const;
export type Axis = (typeof AXES)[number];

export function aggregateCondition(
  condition: Condition,
  records: RepRecord[],
): ConditionAggregate {
  const judged = records.filter(
    (r) => r.judge !== null && !r.judge.error && r.machine.gatePassed,
  );
  const score = (axis: Axis) =>
    median(judged.map((r) => (r.judge as JudgeResult)[axis]));

  return {
    condition,
    reps: records.length,
    gatePassRate: rate(records.map((r) => r.machine.gatePassed)),
    expectedUseRate: rate(records.map((r) => r.machine.usedExpected)),
    eslintViolationsMean: mean(
      records.filter((r) => r.machine.gatePassed).map((r) => r.machine.eslintSmarthrViolations),
    ),
    unknownPropsMean: mean(records.map((r) => r.machine.unknownPropCount)),
    nativeHtmlMean: mean(records.map((r) => r.machine.nativeHtmlCount)),
    judgedReps: judged.length,
    outcomeMedian: score('outcome'),
    processMedian: score('process'),
    styleMedian: score('style'),
    efficiencyMedian: score('efficiency'),
  };
}

export type PromptResult = {
  promptId: string;
  category: TestPrompt['category'];
  prompt: string;
  expected: string[];
  preferred: string;
  with_skill: ConditionAggregate;
  without_skill: ConditionAggregate;
  /** with が without を下回った観点（要修正フラグの根拠） */
  regressions: Array<{ axis: Axis; with: number; without: number; delta: number }>;
};

const medianKey: Record<Axis, keyof ConditionAggregate> = {
  outcome: 'outcomeMedian',
  process: 'processMedian',
  style: 'styleMedian',
  efficiency: 'efficiencyMedian',
};

/** with vs without を観点別に比較し、with < without の観点を回帰として抽出 */
export function diffConditions(
  withAgg: ConditionAggregate,
  withoutAgg: ConditionAggregate,
): PromptResult['regressions'] {
  const regressions: PromptResult['regressions'] = [];
  for (const axis of AXES) {
    const w = withAgg[medianKey[axis]] as number | null;
    const wo = withoutAgg[medianKey[axis]] as number | null;
    if (w === null || wo === null) continue;
    if (w < wo) regressions.push({ axis, with: w, without: wo, delta: w - wo });
  }
  return regressions;
}
