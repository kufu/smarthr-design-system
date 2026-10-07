import fs from 'node:fs';
import path from 'node:path';

import type { ComponentGroup } from './parse-metadata.js';

export type PropsTablePage = {
  /** design-system 相対パス (例: `dropdown/dropdown-menu-button`) */
  dir: string;
  /** `<ComponentPropsTable name="..." />` に指定された displayName (記述順) */
  names: string[];
};

const PROPS_TABLE_PATTERN = /<ComponentPropsTable\b[^>]*\bname="([^"]+)"/g;

/**
 * design-system 配下の各 index.mdx から `<ComponentPropsTable name="..." />` の宣言を集める。
 * 1 ページ目に書かれた displayName をそのページの主コンポーネントとみなす。
 */
export function collectPropsTablePages(designSystemDir: string): PropsTablePage[] {
  const pages: PropsTablePage[] = [];
  walk(designSystemDir, designSystemDir, pages);
  return pages;
}

function walk(rootDir: string, currentDir: string, acc: PropsTablePage[]): void {
  if (!fs.existsSync(currentDir)) return;
  for (const entry of fs.readdirSync(currentDir, { withFileTypes: true })) {
    const full = path.join(currentDir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.startsWith('_')) continue;
      walk(rootDir, full, acc);
      continue;
    }
    if (entry.name !== 'index.mdx') continue;
    const content = fs.readFileSync(full, 'utf-8');
    const names = [...content.matchAll(PROPS_TABLE_PATTERN)].map((m) => m[1]);
    if (names.length === 0) continue;
    acc.push({ dir: path.relative(rootDir, path.dirname(full)), names });
  }
}

/**
 * smarthr-ui のディレクトリ構成から作ったグループを、design-system のページ構成に合わせて組み替える。
 *
 * smarthr-ui はディレクトリ構成を変えることがある (例: v99.7 で `client/` 配下へ移動、
 * `DropdownMenuGroup` が `Dropdown/DropdownMenuButton/` から `Dropdown/DropdownMenuGroup/` へ移動)。
 * ディレクトリだけで束ねると、そのたびにガイドの構成が変わってしまうため、
 * サイトの Props テーブル (`<ComponentPropsTable />`) をどのページに載せているかを優先する。
 *
 * 1. ページの主コンポーネント以外として載っている displayName は、主コンポーネントのグループへ移す
 *    (例: dropdown-menu-button ページの `DropdownMenuGroup` → `DropdownMenuButton` グループ)
 * 2. 自分のページを持つ主コンポーネントが、別ページの主コンポーネント名のグループに入っている場合は独立させる
 *    (例: upward-link ページの `UpwardLink` が `TextLink` グループに入っている → `UpwardLink` グループ)
 *
 * 複数ページに載っている displayName は帰属を決められないため、ディレクトリ由来のグループのままにする。
 * `relatedComponents` で宣言された displayName (例: `ControlledStepFormDialog`) は
 * `autoSplitGroups` で独立ドキュメントにするため、ここでは動かさない。
 */
export function regroupByPropsTable(
  groups: Map<string, ComponentGroup>,
  pages: PropsTablePage[],
  relatedNames: Set<string>,
): Map<string, ComponentGroup> {
  const groupKeyOf = new Map<string, string>();
  for (const [key, group] of groups) {
    for (const name of group.displayNames) groupKeyOf.set(name, key);
  }

  const primaries = new Set(pages.map((p) => p.names[0]));

  // displayName → 載っているページの主コンポーネント (主コンポーネント自身は除く)
  const ownerCandidates = new Map<string, Set<string>>();
  for (const page of pages) {
    const [primary, ...members] = page.names;
    for (const name of members) {
      if (name === primary || primaries.has(name) || relatedNames.has(name)) continue;
      if (!ownerCandidates.has(name)) ownerCandidates.set(name, new Set());
      ownerCandidates.get(name)!.add(primary);
    }
  }

  const moves = new Map<string, string>();
  for (const [name, owners] of ownerCandidates) {
    if (owners.size !== 1) continue;
    const ownerKey = groupKeyOf.get([...owners][0]);
    const currentKey = groupKeyOf.get(name);
    if (ownerKey && currentKey && ownerKey !== currentKey) moves.set(name, ownerKey);
  }
  for (const name of primaries) {
    if (relatedNames.has(name)) continue;
    const currentKey = groupKeyOf.get(name);
    if (currentKey && currentKey !== name && primaries.has(currentKey)) moves.set(name, name);
  }

  if (moves.size === 0) return groups;

  const result = new Map<string, ComponentGroup>();
  const ensure = (key: string) => {
    if (!result.has(key)) result.set(key, { dirName: key, displayNames: [], components: [] });
    return result.get(key)!;
  };
  for (const [key, group] of groups) {
    group.components.forEach((component, i) => {
      const target = ensure(moves.get(component.displayName) ?? key);
      target.displayNames.push(group.displayNames[i]);
      target.components.push(component);
    });
  }
  for (const [key, group] of result) {
    if (group.components.length === 0) result.delete(key);
  }
  return result;
}
