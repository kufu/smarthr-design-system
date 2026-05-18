import fs from 'node:fs';
import path from 'node:path';

import type { ComponentGroup } from './parse-metadata.js';

export type CoverageReport = {
  /** metadata.json には存在するが index.mdx も skill-triggers.json も未対応 */
  newComponents: string[];
  /** index.mdx は存在するが metadata.json の対応 displayName が消えた（rename / 削除） */
  orphanDirs: string[];
  /** skill-triggers.json のキーが metadata.json の displayName に存在しない */
  staleTriggers: string[];
  /** design-system dir 未割当（参考情報。新規未対応かつ trigger 未登録のものは newComponents 側で警告） */
  unmappedGroups: string[];
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
]);

/**
 * smarthr-ui の metadata.json と design-system の index.mdx / mapping の整合性を検証する。
 * smarthr-ui バージョン更新時の追従漏れを検出するための機構。
 */
export function validateCoverage(args: {
  groups: Map<string, ComponentGroup>;
  dirMapping: Map<string, string>;
  skillTriggers: Record<string, string>;
  designSystemDir: string;
  inheritedNames?: Set<string>;
}): CoverageReport {
  const { groups, dirMapping, skillTriggers, designSystemDir, inheritedNames } = args;

  const allDisplayNames = new Set<string>();
  for (const g of groups.values()) {
    for (const n of g.displayNames) allDisplayNames.add(n);
  }

  // newComponents: dir mapping なし、skill-triggers にも未登録、inheritedBy 派生先でもない
  const newComponents: string[] = [];
  const unmappedGroups: string[] = [];
  for (const [dir, g] of groups) {
    if (!dirMapping.has(dir)) {
      unmappedGroups.push(dir);
      const hasTrigger = g.displayNames.some((n) => skillTriggers[n]);
      const isInherited = inheritedNames?.has(dir) ?? false;
      if (!hasTrigger && !isInherited) newComponents.push(dir);
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
  const orphanDirs = designDirsWithIndex.filter(
    (d) => !mappedPaths.has(d) && !ORPHAN_IGNORE.has(d),
  );

  // staleTriggers: skill-triggers のキーが metadata.json の displayName に不在
  const staleTriggers = Object.keys(skillTriggers).filter((name) => !allDisplayNames.has(name));

  return { newComponents, orphanDirs, staleTriggers, unmappedGroups };
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
      `       → src/content/articles/products/components/<name>/index.mdx を作成するか、mapping/skill-triggers.json に追加してください`,
    );
  }

  if (report.orphanDirs.length > 0) {
    hasIssue = true;
    console.log(
      `   ⚠️  smarthr-ui に対応がなくなった design-system ディレクトリ (${report.orphanDirs.length}): ${report.orphanDirs.join(', ')}`,
    );
    console.log(`       → smarthr-ui から削除/rename された可能性。mapping/component-dir-map.json で再マッピングするか、index.mdx を削除してください`);
  }

  if (report.staleTriggers.length > 0) {
    hasIssue = true;
    console.log(
      `   ⚠️  skill-triggers.json の古いエントリ (${report.staleTriggers.length}): ${report.staleTriggers.join(', ')}`,
    );
    console.log(`       → smarthr-ui から消えた displayName。mapping/skill-triggers.json を更新してください`);
  }

  if (!hasIssue) {
    console.log(`   ✅ すべて整合`);
  } else if (process.env.CI) {
    console.error('❌ CI 環境のため整合性違反で exit 1');
    process.exit(1);
  }

  return hasIssue;
}
