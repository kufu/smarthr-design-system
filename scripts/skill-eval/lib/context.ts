import fs from 'node:fs';
import path from 'node:path';

import {
  COMPONENTS_DIR,
  COMPONENT_SELECTOR_PATH,
  SKILL_MD_PATH,
} from '../config.ts';
import type { TestPrompt } from '../prompts.ts';

/**
 * 両条件に共通で付与する「smarthr-ui を使うプロジェクト」のベースライン文脈。
 * with / without の差を「ガイド doc の有無」だけに絞るための共通土台
 * (Notion Phase 1: ベースライン = 両条件に smarthr-ui 文脈を共通付与)。
 */
export const PROJECT_CONTEXT = `あなたは smarthr-ui（SmartHR のデザインシステムの React コンポーネントライブラリ）を採用した Web アプリケーションを開発しているフロントエンドエンジニアです。

前提:
- UI は可能な限り smarthr-ui のコンポーネントを import して構築します（\`import { ... } from 'smarthr-ui'\`）。
- 生の HTML 要素（div, span, button, table, input など）での独自実装は避け、対応する smarthr-ui コンポーネントを優先します。
- React + TypeScript (.tsx) で記述します。`;

/** モデルへの共通の出力指示 */
export const OUTPUT_INSTRUCTION = `以下の要件を満たす React コンポーネント（.tsx）を実装してください。

出力ルール:
- 完成した .tsx のコードのみを 1 つの \`\`\`tsx コードブロックで出力してください。
- コードブロックの外に説明文を書かないでください。
- import 文を含め、そのままファイルに保存できる形にしてください。`;

function readDoc(baseName: string): string {
  const p = path.join(COMPONENTS_DIR, `${baseName}.md`);
  return fs.readFileSync(p, 'utf-8');
}

/**
 * with_skill 条件のオラクル注入文字列を組み立てる。
 * - direct: 正解 doc のみを単一注入。
 * - boundary: SKILL.md の趣旨 + component-selector.md + 競合候補 doc を候補セット注入。
 *
 * ルーティング（どの doc を引くか）のノイズを排除し、Layer 3 コンテンツの実効性だけを測る。
 */
export function buildOracle(prompt: TestPrompt): string {
  const parts: string[] = [];

  // SKILL.md の本文（エントリポイントの方針: 事前知識で答えず doc を読む 等）
  parts.push('## smarthr-ui コンポーネントガイド（参照資料）\n');
  parts.push(stripFrontmatter(fs.readFileSync(SKILL_MD_PATH, 'utf-8')).trim());

  if (prompt.injectSelector) {
    parts.push('\n## コンポーネント選定ガイド（component-selector.md）\n');
    parts.push(fs.readFileSync(COMPONENT_SELECTOR_PATH, 'utf-8').trim());
  }

  for (const docName of prompt.oracleDocs) {
    parts.push(`\n## components/${docName}.md\n`);
    parts.push(readDoc(docName).trim());
  }

  return parts.join('\n');
}

function stripFrontmatter(md: string): string {
  if (md.startsWith('---')) {
    const end = md.indexOf('\n---', 3);
    if (end !== -1) {
      const after = md.indexOf('\n', end + 1);
      return after !== -1 ? md.slice(after + 1) : '';
    }
  }
  return md;
}

/**
 * 条件ごとの最終ユーザープロンプトを組み立てる。
 * - 共通: PROJECT_CONTEXT + 要件 + 出力指示
 * - with_skill のみ: オラクル注入を末尾に追加（差分はこれだけ）
 */
export function buildUserMessage(
  prompt: TestPrompt,
  condition: 'with_skill' | 'without_skill',
): string {
  const sections = [
    PROJECT_CONTEXT,
    `${OUTPUT_INSTRUCTION}\n\n### 要件\n${prompt.prompt}`,
  ];

  if (condition === 'with_skill') {
    sections.push(
      `下記の参照資料（smarthr-ui の公式ガイド）を必ず読んでから実装してください。Props・使い分け・実装ルールは資料の内容を正とします。\n\n${buildOracle(prompt)}`,
    );
  }

  return sections.join('\n\n---\n\n');
}
