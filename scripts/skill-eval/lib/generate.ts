import { GEN_MAX_TOKENS, GEN_MODEL } from '../config.ts';
import type { Condition } from '../config.ts';
import type { TestPrompt } from '../prompts.ts';
import { complete } from './anthropic.ts';
import { buildUserMessage } from './context.ts';

/**
 * 出力テキストから最初の tsx/ts/jsx コードブロックを抽出する。
 * フェンスが無い場合は本文全体を返す（パース機械チェック側で弾く）。
 */
export function extractCode(raw: string): string {
  const fence = raw.match(/```(?:tsx|ts|jsx|js)?\s*\n([\s\S]*?)```/);
  if (fence) return fence[1].trim();
  return raw.trim();
}

export type Generation = {
  rep: number;
  rawText: string;
  code: string;
};

/** 1 回分の生成（(プロンプト × 条件) の 1 反復） */
export async function generateOnce(
  prompt: TestPrompt,
  condition: Condition,
  rep: number,
): Promise<Generation> {
  const user = buildUserMessage(prompt, condition);
  const rawText = await complete({
    model: GEN_MODEL,
    maxTokens: GEN_MAX_TOKENS,
    user,
  });
  return { rep, rawText, code: extractCode(rawText) };
}
