import type { ComponentGroup } from './parse-metadata.js';
import type { IndexMdxInfo } from './parse-index-mdx.js';
import { toDocFileName } from './name-mapping.js';

export type RouterEntry = {
  group: ComponentGroup;
  indexInfo: IndexMdxInfo | null;
  designSystemDir: string | undefined;
};

function resolveEntryDescription(entry: RouterEntry): string {
  const fromMdx = entry.indexInfo?.description?.replace(/\r?\n/g, ' ').trim();
  if (fromMdx) return fromMdx;
  return `${entry.group.dirName} コンポーネント`;
}

export function renderRouterSkill(entries: RouterEntry[]): string {
  const sorted = [...entries].sort((a, b) => a.group.dirName.localeCompare(b.group.dirName));

  const parts: string[] = [];
  parts.push('# smarthr-ui コンポーネント選定ガイド');
  parts.push('');
  parts.push(
    'UI 要件から該当するコンポーネントを特定するためのインデックスです。コンポーネントの詳細な使い方は、対応するガイドファイルを参照してください。',
  );
  parts.push('');
  parts.push('## コンポーネント一覧');
  parts.push('');
  parts.push('| コンポーネント | 説明・利用シーン | ガイド |');
  parts.push('|---|---|---|');

  for (const entry of sorted) {
    const name = entry.group.dirName;
    const docFile = `components/${toDocFileName(name)}`;
    const isDeprecated = entry.indexInfo?.deprecated ?? false;
    const displayName = isDeprecated ? `⚠️ ${name}（非推奨）` : name;
    const rawDesc = resolveEntryDescription(entry).replace(/\r?\n/g, ' ').replace(/\|/g, '\\|').trim();
    const desc = isDeprecated ? `【非推奨】${rawDesc}` : rawDesc;
    parts.push(`| ${displayName} | ${desc} | [${docFile}](${docFile}) |`);
  }
  parts.push('');
  parts.push('## 利用フロー');
  parts.push('');
  parts.push('1. 実装したい UI 要件を整理する（例: 「フォームを作る」「テーブルを表示する」）');
  parts.push('2. 上記の表から該当しそうなコンポーネントを特定する');
  parts.push('3. そのコンポーネントのガイドファイルを読み、Props・実装ルール・使い方チェックリストに従って実装する');
  parts.push('');
  return parts.join('\n');
}
