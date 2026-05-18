import type { ComponentGroup } from './parse-metadata.js';
import type { IndexMdxInfo } from './parse-index-mdx.js';
import { pascalToKebab } from './name-mapping.js';

export type RouterEntry = {
  group: ComponentGroup;
  indexInfo: IndexMdxInfo | null;
  designSystemDir: string | undefined;
};

/**
 * skill-triggers を優先しつつ、未登録なら index.mdx description にフォールバックする。
 */
function resolveEntryDescription(entry: RouterEntry, skillTriggers: Record<string, string>): string {
  for (const name of entry.group.displayNames) {
    if (skillTriggers[name]) return skillTriggers[name];
  }
  const fromMdx = entry.indexInfo?.description?.replace(/\r?\n/g, ' ').trim();
  if (fromMdx) return fromMdx;
  return `${entry.group.dirName} コンポーネント`;
}

/**
 * router スキル description の代表シナリオ (M4-S8 結論: パターンC)。
 * 34件列挙はトークン圧迫のみで発火率に寄与しなかったため、典型 5 件のみを残す。
 */
const REPRESENTATIVE_SCENARIOS = ['Button', 'Input', 'Table', 'ActionDialog', 'TextLink'] as const;

/**
 * frontmatter の description を組み立てる (パターンC: head + 代表シナリオ5件、約220字)。
 */
function buildFrontmatterDescription(
  _entries: RouterEntry[],
  skillTriggers: Record<string, string>,
): string {
  const head =
    'smarthr-ui のどのコンポーネントを使うべきかの選定ガイド。フォームを作る、テーブルを表示する、ボタンを置く、ダイアログを開く、通知を出すなど、何らかの UI を実装しようとしているときに使う。具体的なコンポーネントの SKILL.md を呼ぶ前にまず読む。';

  const scenarios: string[] = [];
  for (const name of REPRESENTATIVE_SCENARIOS) {
    const trigger = skillTriggers[name];
    if (trigger) scenarios.push(`${name}（${trigger}）`);
  }

  if (scenarios.length === 0) return head;
  return `${head} 主なシナリオ: ${scenarios.join('、')}。`;
}

/**
 * component-selector ルータースキル。
 * 各コンポーネントの description（index.mdx の frontmatter）を集約して、
 * AI が「どのコンポーネントの SKILL.md を呼ぶべきか」を判断する一覧を生成する。
 */
export function renderRouterSkill(
  entries: RouterEntry[],
  skillTriggers: Record<string, string> = {},
): string {
  const sorted = [...entries].sort((a, b) => a.group.dirName.localeCompare(b.group.dirName));
  const description = buildFrontmatterDescription(sorted, skillTriggers);
  // frontmatter 内の " はエスケープ
  const escapedDescription = description.replace(/"/g, '\\"');

  const parts: string[] = [];
  parts.push('---');
  parts.push('name: component-selector');
  parts.push(`description: "${escapedDescription}"`);
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
    const rawDesc = resolveEntryDescription(entry, skillTriggers)
      .replace(/\r?\n/g, ' ')
      .replace(/\|/g, '\\|')
      .trim();
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
