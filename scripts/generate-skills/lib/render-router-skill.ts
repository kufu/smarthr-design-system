import type { ComponentGroup } from './parse-metadata.js';
import type { IndexMdxInfo } from './parse-index-mdx.js';
import { pascalToKebab } from './name-mapping.js';

export type RouterEntry = {
  group: ComponentGroup;
  indexInfo: IndexMdxInfo | null;
  designSystemDir: string | undefined;
};

/**
 * component-selector ルータースキル。
 * 各コンポーネントの description（index.mdx の frontmatter）を集約して、
 * AI が「どのコンポーネントの SKILL.md を呼ぶべきか」を判断する一覧を生成する。
 */
export function renderRouterSkill(entries: RouterEntry[]): string {
  const parts: string[] = [];
  parts.push('---');
  parts.push('name: component-selector');
  parts.push(
    'description: "smarthr-ui のどのコンポーネントを使うべきかの選定ガイド。フォームを作る、テーブルを表示する、ボタンを置く、ダイアログを開く、通知を出すなど、何らかの UI を実装しようとしているときに使う。具体的なコンポーネントの SKILL.md を呼ぶ前にまず読む。"',
  );
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
  parts.push('| コンポーネント | 用途（description） | 対応スキル |');
  parts.push('|---|---|---|');

  const sorted = [...entries].sort((a, b) => a.group.dirName.localeCompare(b.group.dirName));
  for (const entry of sorted) {
    const name = entry.group.dirName;
    const skillName = pascalToKebab(name);
    const desc =
      entry.indexInfo?.description?.replace(/\r?\n/g, ' ').replace(/\|/g, '\\|').trim() ||
      `${name} コンポーネント`;
    parts.push(`| ${name} | ${desc} | \`smarthr-design-system:${skillName}\` |`);
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
