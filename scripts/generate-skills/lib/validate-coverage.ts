import fs from 'node:fs';
import path from 'node:path';

import type { ComponentGroup } from './parse-metadata.js';
import type { RelatedComponentSkill } from './related-components.js';

export type CoverageReport = {
  /** metadata.json には存在するが index.mdx が未対応 */
  newComponents: string[];
  /** index.mdx は存在するが metadata.json の対応 displayName が消えた（rename / 削除） */
  orphanDirs: string[];
  /** design-system dir 未割当（参考情報。relatedComponents で親に紐付けられていないものは newComponents 側で警告） */
  unmappedGroups: string[];
  /**
   * 子 dir なし & relatedComponents.description 未指定の組み合わせ。
   * Th/Td 系のように子に独立 index.mdx を持たないコンポーネントでは、親 mdx の
   * relatedComponents 宣言で description を提供する必要があるためチェックする。
   * 形式: `"<name> (parent: <parentName>)"`
   */
  missingDescriptions: string[];
};

/**
 * smarthr-ui のコンポーネントに対応しない design-system ディレクトリ。
 * design-system 独自の親カテゴリページや intl 配下コンポーネントなど。
 * orphan として警告対象から除外する。
 */
const ORPHAN_IGNORE = new Set([
  'icon', // design-system 独自の親カテゴリページ
  'layout', // 同上（Stack/Cluster/Center 等の親）
  'date-formatter', // smarthr-ui の intl 配下、src/components/ 外
  'combobox', // 親カテゴリページ（SingleCombobox / MultiCombobox が配下に独立）
  'picker', // 親カテゴリページ（TimePicker / MonthPicker / DatetimeLocalPicker が配下に独立）
]);

/**
 * smarthr-ui の metadata.json と design-system の index.mdx / mapping の整合性を検証する。
 * smarthr-ui バージョン更新時の追従漏れを検出するための機構。
 */
export function validateCoverage(args: {
  groups: Map<string, ComponentGroup>;
  dirMapping: Map<string, string>;
  designSystemDir: string;
  inheritedNames?: Set<string>;
  relatedSkills?: Map<string, RelatedComponentSkill>;
}): CoverageReport {
  const { groups, dirMapping, designSystemDir, inheritedNames, relatedSkills } = args;

  // newComponents: dir mapping なし、relatedComponents 経由でもない
  const newComponents: string[] = [];
  const unmappedGroups: string[] = [];
  for (const [dir] of groups) {
    if (!dirMapping.has(dir)) {
      unmappedGroups.push(dir);
      const isRelated = inheritedNames?.has(dir) ?? false;
      if (!isRelated) newComponents.push(dir);
    }
  }

  // missingDescriptions: 子 dir なし & description 未指定
  // 子 dir があれば dirMapping 経由で子 mdx の description が採用されるため description 不要。
  // 子 dir がないケース (Th/Td 等) は relatedComponents 宣言で description を提供すべき。
  const missingDescriptions: string[] = [];
  if (relatedSkills) {
    for (const [name, rel] of relatedSkills) {
      const hasChildDir = dirMapping.has(name);
      if (!hasChildDir && rel.description === undefined) {
        missingDescriptions.push(`${name} (parent: ${rel.parentName})`);
      }
    }
  }

  // orphanDirs: design-system に index.mdx あるが mapping の参照先になっていない
  const mappedPaths = new Set([...dirMapping.values()]);
  const designDirsWithIndex: string[] = [];
  if (fs.existsSync(designSystemDir)) {
    const topDirs = fs
      .readdirSync(designSystemDir, { withFileTypes: true })
      .filter((d) => d.isDirectory() && !d.name.startsWith('_'))
      .map((d) => d.name);
    for (const top of topDirs) {
      if (fs.existsSync(path.join(designSystemDir, top, 'index.mdx'))) {
        designDirsWithIndex.push(top);
      }
      const subPath = path.join(designSystemDir, top);
      const subDirs = fs
        .readdirSync(subPath, { withFileTypes: true })
        .filter((d) => d.isDirectory() && !d.name.startsWith('_'))
        .map((d) => d.name);
      for (const sub of subDirs) {
        if (fs.existsSync(path.join(subPath, sub, 'index.mdx'))) {
          designDirsWithIndex.push(`${top}/${sub}`);
        }
      }
    }
  }
  const orphanDirs = designDirsWithIndex.filter((d) => !mappedPaths.has(d) && !ORPHAN_IGNORE.has(d));

  return { newComponents, orphanDirs, unmappedGroups, missingDescriptions };
}

/**
 * レポートを stdout に出力。問題があれば true を返す。
 * CI 環境（process.env.CI が truthy）では問題ありで exit 1。
 */
export function printCoverageReport(report: CoverageReport): boolean {
  console.log('🔍 整合性チェック…');
  let hasIssue = false;

  if (report.newComponents.length > 0) {
    hasIssue = true;
    console.log(
      `   ⚠️  smarthr-ui 新規/未対応コンポーネント (${report.newComponents.length}): ${report.newComponents.join(', ')}`,
    );
    console.log(
      `       → src/content/articles/products/components/<name>/index.mdx を作成するか、親 index.mdx の relatedComponents で紐付けてください`,
    );
  }

  if (report.orphanDirs.length > 0) {
    hasIssue = true;
    console.log(
      `   ⚠️  smarthr-ui に対応がなくなった design-system ディレクトリ (${report.orphanDirs.length}): ${report.orphanDirs.join(', ')}`,
    );
    console.log(
      `       → smarthr-ui から削除/rename された可能性。mapping/component-dir-map.json で再マッピングするか、index.mdx を削除してください`,
    );
  }

  if (report.missingDescriptions.length > 0) {
    hasIssue = true;
    console.log(
      `   ⚠️  relatedComponents の description 未指定 & 子 dir なし (${report.missingDescriptions.length}): ${report.missingDescriptions.join(', ')}`,
    );
    console.log(
      `       → 親 mdx の relatedComponents 宣言で description を追加するか、子 dir 配下に index.mdx を作成してください`,
    );
  }

  if (!hasIssue) {
    console.log(`   ✅ すべて整合`);
  } else if (process.env.CI) {
    console.error('❌ CI 環境のため整合性違反で exit 1');
    process.exit(1);
  }

  return hasIssue;
}
