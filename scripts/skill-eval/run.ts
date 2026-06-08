import fs from 'node:fs';
import path from 'node:path';

import { CONDITIONS, REPETITIONS, WORKSPACE_ROOT } from './config.ts';
import type { Condition } from './config.ts';
import { PROMPTS } from './prompts.ts';
import type { TestPrompt } from './prompts.ts';
import {
  aggregateCondition,
  diffConditions,
  type PromptResult,
  type RepRecord,
} from './lib/aggregate.ts';
import { buildUserMessage } from './lib/context.ts';
import { generateOnce } from './lib/generate.ts';
import { judge } from './lib/judge.ts';
import { runMachineCheck } from './lib/machine-check.ts';
import { renderSummaryMarkdown } from './lib/report.ts';
import { ensureDir, pool, writeJson, writeText } from './lib/util.ts';

type Args = {
  dryRun: boolean;
  iteration: number;
  only: string[] | null;
  concurrency: number;
};

function parseArgs(argv: string[]): Args {
  const get = (flag: string): string | undefined => {
    const i = argv.indexOf(flag);
    return i !== -1 ? argv[i + 1] : undefined;
  };
  return {
    dryRun: argv.includes('--dry-run'),
    iteration: Number(get('--iteration') ?? nextIteration()),
    only: get('--only')?.split(',') ?? null,
    concurrency: Number(get('--concurrency') ?? 4),
  };
}

/** workspace 配下の既存 iteration-N から次の番号を決める */
function nextIteration(): number {
  if (!fs.existsSync(WORKSPACE_ROOT)) return 1;
  const nums = fs
    .readdirSync(WORKSPACE_ROOT)
    .map((d) => /^iteration-(\d+)$/.exec(d)?.[1])
    .filter(Boolean)
    .map(Number);
  return nums.length ? Math.max(...nums) + 1 : 1;
}

function evalDir(iteration: number, promptId: string, condition: Condition): string {
  return path.join(WORKSPACE_ROOT, `iteration-${iteration}`, `eval-${promptId}`, condition);
}

// --- dry-run: API を叩かず、組み立てた context だけを書き出して配線を検証 ---
function dryRun(args: Args): void {
  console.log(`[dry-run] iteration-${args.iteration} / prompts=${selectPrompts(args).length}`);
  for (const prompt of selectPrompts(args)) {
    for (const condition of CONDITIONS) {
      const dir = evalDir(args.iteration, prompt.id, condition);
      const message = buildUserMessage(prompt, condition);
      writeText(path.join(dir, 'user-message.txt'), message);
      console.log(
        `  ${prompt.id} / ${condition}: message ${message.length} chars` +
          (condition === 'with_skill'
            ? ` (oracle docs: ${prompt.oracleDocs.join(', ')}${prompt.injectSelector ? ' + selector' : ''})`
            : ''),
      );
    }
  }
  console.log('[dry-run] OK — オラクル doc の解決と context 組み立てに成功しました。');
}

function selectPrompts(args: Args): TestPrompt[] {
  if (!args.only) return PROMPTS;
  return PROMPTS.filter((p) => args.only!.includes(p.id));
}

// --- 1 (プロンプト × 条件) を N 反復で実行 ---
async function runCondition(
  iteration: number,
  prompt: TestPrompt,
  condition: Condition,
  concurrency: number,
): Promise<RepRecord[]> {
  const dir = evalDir(iteration, prompt.id, condition);
  ensureDir(dir);
  writeText(path.join(dir, 'user-message.txt'), buildUserMessage(prompt, condition));

  const reps = Array.from({ length: REPETITIONS }, (_, i) => i + 1);
  return pool(reps, concurrency, async (rep) => {
    const repDir = path.join(dir, `rep-${rep}`);
    const gen = await generateOnce(prompt, condition, rep);
    writeText(path.join(repDir, 'raw.txt'), gen.rawText);
    writeText(path.join(repDir, 'generation.tsx'), gen.code);

    const machine = await runMachineCheck(gen.code, prompt);
    writeJson(path.join(repDir, 'machine.json'), machine);

    let judgeResult = null;
    if (machine.gatePassed) {
      judgeResult = await judge(gen.code, prompt, machine);
      writeJson(path.join(repDir, 'judge.json'), judgeResult);
    }
    console.log(
      `    ${prompt.id}/${condition}/rep-${rep}: gate=${machine.gatePassed}` +
        ` eslint=${machine.eslintSmarthrViolations} native=${machine.nativeHtmlCount}` +
        (judgeResult
          ? ` judge=O${judgeResult.outcome}/P${judgeResult.process}/S${judgeResult.style}/E${judgeResult.efficiency}`
          : ' judge=skip'),
    );
    return { rep, machine, judge: judgeResult } satisfies RepRecord;
  });
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));

  if (args.dryRun) {
    dryRun(args);
    return;
  }

  const prompts = selectPrompts(args);
  console.log(
    `[run] iteration-${args.iteration} / prompts=${prompts.length} / N=${REPETITIONS} / concurrency=${args.concurrency}`,
  );

  const results: PromptResult[] = [];
  for (const prompt of prompts) {
    console.log(`\n## ${prompt.id} (${prompt.category}) — ${prompt.prompt}`);
    const perCondition: Record<Condition, RepRecord[]> = {
      with_skill: [],
      without_skill: [],
    };
    for (const condition of CONDITIONS) {
      perCondition[condition] = await runCondition(
        args.iteration,
        prompt,
        condition,
        args.concurrency,
      );
    }
    const withAgg = aggregateCondition('with_skill', perCondition.with_skill);
    const withoutAgg = aggregateCondition('without_skill', perCondition.without_skill);
    const regressions = diffConditions(withAgg, withoutAgg);

    const promptResult: PromptResult = {
      promptId: prompt.id,
      category: prompt.category,
      prompt: prompt.prompt,
      expected: prompt.expected,
      preferred: prompt.preferred,
      with_skill: withAgg,
      without_skill: withoutAgg,
      regressions,
    };
    results.push(promptResult);
    writeJson(
      path.join(WORKSPACE_ROOT, `iteration-${args.iteration}`, `eval-${prompt.id}`, 'result.json'),
      promptResult,
    );
  }

  const iterRoot = path.join(WORKSPACE_ROOT, `iteration-${args.iteration}`);
  writeJson(path.join(iterRoot, 'summary.json'), {
    iteration: args.iteration,
    repetitions: REPETITIONS,
    generatedAt: new Date().toISOString(),
    results,
  });
  writeText(path.join(iterRoot, 'summary.md'), renderSummaryMarkdown(args.iteration, results));

  const flagged = results.filter((r) => r.regressions.length > 0);
  console.log(`\n=== 完了: iteration-${args.iteration} ===`);
  console.log(`要修正フラグ (with < without): ${flagged.length}/${results.length} 件`);
  for (const r of flagged) {
    console.log(
      `  - ${r.promptId}: ${r.regressions.map((x) => `${x.axis}(${x.with}<${x.without})`).join(', ')}`,
    );
  }
  console.log(`サマリ: ${path.join(iterRoot, 'summary.md')}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
