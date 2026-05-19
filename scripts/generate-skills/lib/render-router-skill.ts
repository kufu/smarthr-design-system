import type { ComponentGroup } from './parse-metadata.js';
import type { IndexMdxInfo } from './parse-index-mdx.js';
import { pascalToKebab } from './name-mapping.js';

export type RouterEntry = {
  group: ComponentGroup;
  indexInfo: IndexMdxInfo | null;
  designSystemDir: string | undefined;
};

/**
 * index.mdx の description (Phase 3 で統一済) を用途列に使う。
 * 派生先や未割当グループ用のフォールバック文も含む。
 */
function resolveEntryDescription(entry: RouterEntry): string {
  const fromMdx = entry.indexInfo?.description?.replace(/\r?\n/g, ' ').trim();
  if (fromMdx) return fromMdx;
  return `${entry.group.dirName} コンポーネント`;
}

/**
 * router スキル description の代表シナリオ (M4-S8 結論: パターンC)。
 * skill-triggers.json 廃止に伴い (name, シナリオ文) のペアをここに固定で保持する。
 * 発火率に効く典型 5 件のみ。
 */
const REPRESENTATIVE_SCENARIOS: ReadonlyArray<readonly [string, string]> = [
  ['Button', 'ボタンを置くとき、クリックで操作を実行させるとき'],
  ['Input', 'テキスト・数値を1行で入力させるとき、フォームに入力欄を追加するとき'],
  ['Table', '表形式でデータを一覧表示するとき'],
  ['ActionDialog', 'ユーザーに操作や入力を求めるダイアログを表示するとき'],
  ['TextLink', 'テキストにリンクを付けるとき'],
];

/**
 * frontmatter の description を組み立てる (パターンC: head + 代表シナリオ5件、約220字)。
 */
function buildFrontmatterDescription(): string {
  const head =
    'smarthr-ui のどのコンポーネントを使うべきかの選定ガイド。フォームを作る、テーブルを表示する、ボタンを置く、ダイアログを開く、通知を出すなど、何らかの UI を実装しようとしているときに使う。具体的なコンポーネントの SKILL.md を呼ぶ前にまず読む。';
  const scenarios = REPRESENTATIVE_SCENARIOS.map(([name, text]) => `${name}（${text}）`);
  return `${head} 主なシナリオ: ${scenarios.join('、')}。`;
}

/**
 * component-selector ルータースキル。
 * 各コンポーネントの description（index.mdx の frontmatter）を集約して、
 * AI が「どのコンポーネントの SKILL.md を呼ぶべきか」を判断する一覧を生成する。
 */
export function renderRouterSkill(entries: RouterEntry[]): string {
  const sorted = [...entries].sort((a, b) => a.group.dirName.localeCompare(b.group.dirName));
  const description = buildFrontmatterDescription();
  // frontmatter 内の " はエスケープ
  const escapedDescription = description.replace(/"/g, '\\"');

  const parts: string[] = [];
  parts.push('---');
  parts.push('name: component-selector');
  parts.push(`description: "${escapedDescription}"`);
  // §8: paths は router スキルのみに付与する方針。
  // 個別スキル (render-skill.ts) には付けない。
  // 拡張子は tsx / jsx に限定（.ts / .mjs / .cjs / .mdx は React コンポーネント実装ファイルでないため除外）。
  parts.push('paths:');
  parts.push('  - "**/*.tsx"');
  parts.push('  - "**/*.jsx"');
  parts.push('metadata:');
  parts.push('  version: "1.0.0"');
  parts.push('  source: smarthr-design-system');
  parts.push('  generated-from: layer1');
  parts.push('---');
  parts.push('');
  parts.push('# smarthr-ui コンポーネント選定ガイド');
  parts.push('');
  parts.push(
    'このスキルは、UI 要件から該当するコンポーネントを特定するためのインデックスです。コンポーネントの詳細な使い方は、各コンポーネント名のスキル（例: `smarthr-design-system:button`）を参照してください。',
  );
  parts.push('');
  parts.push('## コンポーネント一覧');
  parts.push('');
  parts.push('| コンポーネント | 用途 | 対応スキル |');
  parts.push('|---|---|---|');

  for (const entry of sorted) {
    const name = entry.group.dirName;
    const skillName = pascalToKebab(name);
    const isDeprecated = entry.indexInfo?.deprecated ?? false;
    const displayName = isDeprecated ? `⚠️ ${name}（非推奨）` : name;
    const rawDesc = resolveEntryDescription(entry).replace(/\r?\n/g, ' ').replace(/\|/g, '\\|').trim();
    const desc = isDeprecated ? `【非推奨】${rawDesc}` : rawDesc;
    parts.push(`| ${displayName} | ${desc} | \`smarthr-design-system:${skillName}\` |`);
  }
  parts.push('');
  parts.push('## 利用フロー');
  parts.push('');
  parts.push('1. 実装したい UI 要件を整理する（例: 「フォームを作る」「テーブルを表示する」）');
  parts.push('2. 上記の表から該当しそうなコンポーネントを特定する');
  parts.push('3. そのコンポーネントの SKILL.md を読み、Props・実装ルール・使い方チェックリストに従って実装する');
  parts.push('');
  return parts.join('\n');
}
