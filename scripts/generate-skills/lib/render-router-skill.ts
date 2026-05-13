import type { ComponentGroup } from './parse-metadata.js';
import type { IndexMdxInfo } from './parse-index-mdx.js';
import { pascalToKebab } from './name-mapping.js';

export type RouterEntry = {
  group: ComponentGroup;
  indexInfo: IndexMdxInfo | null;
  designSystemDir: string | undefined;
};

const DESCRIPTION_MAX = 1500; // Claude Code は 1536 文字でカット

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
 * frontmatter の description を組み立てる。skill-triggers を意図ベースのトリガー語句として詰め込む。
 * Claude Code の 1536 文字制限に収まる範囲で。
 */
function buildFrontmatterDescription(
  entries: RouterEntry[],
  skillTriggers: Record<string, string>,
): string {
  const head =
    'smarthr-ui のどのコンポーネントを使うべきかの選定ガイド。フォームを作る、テーブルを表示する、ボタンを置く、ダイアログを開く、通知を出すなど、何らかの UI を実装しようとしているときに使う。具体的なコンポーネントの SKILL.md を呼ぶ前にまず読む。';

  const scenarios: string[] = [];
  for (const entry of entries) {
    // 非推奨コンポーネントは frontmatter のトリガーから除外（AI に推奨させない）
    if (entry.indexInfo?.deprecated) continue;
    for (const name of entry.group.displayNames) {
      const trigger = skillTriggers[name];
      if (trigger) scenarios.push(`${name}（${trigger}）`);
    }
  }

  if (scenarios.length === 0) return head;

  // head + " 主なシナリオ: " + scenarios を最大長以内に
  const prefix = `${head} 主なシナリオ: `;
  let remaining = DESCRIPTION_MAX - prefix.length;
  const chosen: string[] = [];
  for (const s of scenarios) {
    const cost = (chosen.length === 0 ? 0 : 2) + s.length; // 区切り "、"
    if (cost > remaining) break;
    chosen.push(s);
    remaining -= cost;
  }
  return prefix + chosen.join('、') + '。';
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
