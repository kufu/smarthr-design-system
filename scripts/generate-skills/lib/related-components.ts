import fs from 'node:fs';
import path from 'node:path';

import { parseIndexMdx, type IndexMdxInfo } from './parse-index-mdx.js';

export type RelatedComponentSkill = {
  /** サブコンポーネント名(例: ControlledActionDialog, Th, ActionDialog) */
  name: string;
  /** サブコンポーネント固有の description (子 mdx の description を上書きしたい場合のみ) */
  description?: string;
  /** 親 mdx の IndexMdxInfo(本文継承元) */
  parentInfo: IndexMdxInfo;
  /** 親コンポーネント名(例: ActionDialog, Table, Dialog) */
  parentName: string;
  /** 親 mdx の所在(設計システム相対パス、ログ用) */
  parentDir: string;
};

/**
 * 設計システム配下の全 mdx を走査し、frontmatter `relatedComponents` 宣言を集約する。
 * key: サブコンポーネント名、value: 親情報
 *
 * `relatedComponents` は派生継承（Controlled*）、内部部品（Th/Td 等）、
 * カテゴリメンバー（Dialog 配下の ActionDialog 等）を包括的に扱う。
 */
export function collectRelatedComponents(designSystemDir: string): Map<string, RelatedComponentSkill> {
  const result = new Map<string, RelatedComponentSkill>();
  walkMdx(designSystemDir, designSystemDir, result);
  return result;
}

function walkMdx(rootDir: string, currentDir: string, acc: Map<string, RelatedComponentSkill>): void {
  if (!fs.existsSync(currentDir)) return;
  for (const entry of fs.readdirSync(currentDir, { withFileTypes: true })) {
    const full = path.join(currentDir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.startsWith('_')) continue;
      walkMdx(rootDir, full, acc);
      continue;
    }
    if (entry.name !== 'index.mdx') continue;

    const info = parseIndexMdx(full);
    if (!info || info.relatedComponents.length === 0) continue;

    const relDir = path.relative(rootDir, path.dirname(full));
    const parentName = inferParentName(relDir);

    for (const child of info.relatedComponents) {
      if (acc.has(child.name)) continue;
      acc.set(child.name, {
        name: child.name,
        ...(child.description !== undefined ? { description: child.description } : {}),
        parentInfo: info,
        parentName,
        parentDir: relDir,
      });
    }
  }
}

/**
 * 設計システム相対ディレクトリから親コンポーネント名(PascalCase)を推測する。
 * 例: "dialog/action-dialog" → "ActionDialog"、 "table" → "Table"
 */
function inferParentName(relDir: string): string {
  const last = relDir.split('/').filter(Boolean).pop() ?? '';
  return last
    .split('-')
    .map((s) => (s.length === 0 ? '' : s[0].toUpperCase() + s.slice(1)))
    .join('');
}
