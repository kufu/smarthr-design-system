import fs from 'node:fs';
import path from 'node:path';

import { parseIndexMdx, type IndexMdxInfo } from './parse-index-mdx.js';

export type InheritedSkill = {
  /** 派生先コンポーネント名(例: ControlledActionDialog) */
  name: string;
  /** 派生先コンポーネント固有の description */
  description: string;
  /** 派生元 mdx の IndexMdxInfo(本文継承元) */
  parentInfo: IndexMdxInfo;
  /** 派生元コンポーネント名(例: ActionDialog) */
  parentName: string;
  /** 派生元 mdx の所在(設計システム相対パス、ログ用) */
  parentDir: string;
};

/**
 * 設計システム配下の全 mdx を走査し、frontmatter `inheritedBy` 宣言を集約する。
 * key: 派生先コンポーネント名、value: 派生情報
 */
export function collectInheritedSkills(designSystemDir: string): Map<string, InheritedSkill> {
  const result = new Map<string, InheritedSkill>();
  walkMdx(designSystemDir, designSystemDir, result);
  return result;
}

function walkMdx(rootDir: string, currentDir: string, acc: Map<string, InheritedSkill>): void {
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
    if (!info || info.inheritedBy.length === 0) continue;

    const relDir = path.relative(rootDir, path.dirname(full));
    const parentName = inferParentName(relDir);

    for (const child of info.inheritedBy) {
      if (acc.has(child.name)) continue;
      acc.set(child.name, {
        name: child.name,
        description: child.description,
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
