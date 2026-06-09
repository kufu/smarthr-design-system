import fs from 'node:fs';
import path from 'node:path';

import { kebabToPascal } from './name-mapping.js';
import { parseIndexMdx } from './parse-index-mdx.js';
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
  /**
   * relatedComponents で宣言された name が smarthr-ui の公開 export 集合に存在しない。
   * typo / 削除済み displayName を参照しているケースを検出する。
   * 形式: `"<name> (parent: <parentName>)"`
   */
  unknownRelatedNames: string[];
  /**
   * metadata.json で非推奨 (tags.deprecated) なのに、対応する index.mdx frontmatter が
   * deprecated を立てていない部品（= smarthr-ui の非推奨化に design-system が未追従）。
   * 粒度は部品単位のみ（prop 単位は対象外）。形式: dirName（PascalCase）。
   */
  deprecatedNotFollowed: string[];
};

/**
 * 自動判定で拾えない事情から明示的に orphan 警告を除外する dir 一覧。
 *
 * - `icon`: smarthr-ui の `export * from './components/Icon'` 形式は `loadPublicExports` の
 *   `export { X } from` パターンに合致しないため拾えない
 */
const ORPHAN_IGNORE_EXPLICIT = new Set(['icon']);

/**
 * orphan 警告から除外すべき dir かを自動判定する。
 *
 * ルール 1 (親カテゴリページ): 配下に index.mdx を持つ子 dir が 1 つでもあれば、親カテゴリ
 * ページとみなして除外する。`layout`/`combobox`/`picker`/`formatter` 等が該当。
 * `dirMapping` ではなく `designDirsWithIndex` を見ることで、smarthr-ui の `src/intl/` 配下に
 * ある DateFormatter のように parseMetadata の `src/components/` フィルタから漏れて dirMapping
 * に入らないケースでも親 dir を正しく ignore できる。
 *
 * ルール 2 (公開 export 一致): dir 名 (kebab-case) を PascalCase に戻して smarthr-ui の公開
 * named export 集合に含まれていれば除外する。`date-formatter` (= `DateFormatter`) のように
 * smarthr-ui で公開はされているが `src/components/` 外 (例: `src/intl/`) にあり parseMetadata
 * のフィルタから漏れるケースをカバーする。
 */
function shouldIgnoreOrphan(dir: string, designDirsWithIndex: Set<string>, publicExports: Set<string>): boolean {
  if (ORPHAN_IGNORE_EXPLICIT.has(dir)) return true;

  // ルール 1: 配下に index.mdx を持つ子 dir があるか
  const prefix = `${dir}/`;
  for (const p of designDirsWithIndex) {
    if (p.startsWith(prefix)) return true;
  }

  // ルール 2: 末尾セグメントを PascalCase 化して公開 export と一致するか
  const lastSegment = dir.split('/').filter(Boolean).pop() ?? dir;
  const pascalName = kebabToPascal(lastSegment);
  if (publicExports.has(pascalName)) return true;

  return false;
}

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
  publicExports?: Set<string>;
  /** metadata.json で tags.deprecated を持つ displayName 集合（部品単位の非推奨追従チェック用） */
  metadataDeprecated?: Set<string>;
}): CoverageReport {
  const { groups, dirMapping, designSystemDir, inheritedNames, relatedSkills, publicExports, metadataDeprecated } =
    args;

  // deprecatedNotFollowed: metadata=非推奨 だが index.mdx が deprecated 未設定の部品。
  // dir 名 = 公開コンポーネントの displayName（doc 名と一致）。独自 dir を持たない内部部品は対象外。
  const deprecatedNotFollowed: string[] = [];
  if (metadataDeprecated) {
    for (const dir of groups.keys()) {
      if (!metadataDeprecated.has(dir)) continue;
      const rel = dirMapping.get(dir);
      if (!rel) continue; // 独自 index.mdx を持たない（内部部品など）→ 検証対象外
      const info = parseIndexMdx(path.join(designSystemDir, rel, 'index.mdx'));
      if (!info?.deprecated) deprecatedNotFollowed.push(dir);
    }
  }

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
  // unknownRelatedNames: relatedComponents の name が smarthr-ui の公開 export に存在しない
  const unknownRelatedNames: string[] = [];
  if (relatedSkills) {
    for (const [name, rel] of relatedSkills) {
      const hasChildDir = dirMapping.has(name);
      if (!hasChildDir && rel.description === undefined) {
        missingDescriptions.push(`${name} (parent: ${rel.parentName})`);
      }
      // 公開 export 集合に存在しない name は typo or 削除済みコンポーネント参照の疑い
      if (publicExports && !publicExports.has(name)) {
        unknownRelatedNames.push(`${name} (parent: ${rel.parentName})`);
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
  const designDirsWithIndexSet = new Set(designDirsWithIndex);
  const orphanDirs = designDirsWithIndex.filter((d) => {
    if (mappedPaths.has(d)) return false;
    return !shouldIgnoreOrphan(d, designDirsWithIndexSet, publicExports ?? new Set());
  });

  return { newComponents, orphanDirs, unmappedGroups, missingDescriptions, unknownRelatedNames, deprecatedNotFollowed };
}

export type CoverageBaseline = Partial<Record<keyof CoverageReport, string[]>>;

/**
 * baseline ファイルを読み込む。存在しない場合は空 baseline を返す。
 * baseline は coverage チェックの既知違反を明示するためのリスト。
 * 該当エントリは違反として扱われず、CI でも exit 1 しない。
 */
export function loadCoverageBaseline(baselinePath: string): CoverageBaseline {
  if (!fs.existsSync(baselinePath)) return {};
  const raw = JSON.parse(fs.readFileSync(baselinePath, 'utf-8')) as Record<string, unknown>;
  const baseline: CoverageBaseline = {};
  for (const key of [
    'newComponents',
    'orphanDirs',
    'missingDescriptions',
    'unknownRelatedNames',
    'deprecatedNotFollowed',
  ] as const) {
    const val = raw[key];
    if (Array.isArray(val) && val.every((v) => typeof v === 'string')) {
      baseline[key] = val as string[];
    }
  }
  return baseline;
}

/**
 * report から baseline 内エントリを除外した新しい report を返す。
 * baseline 内の既知違反は表示・exit 判定の対象外になる。
 */
export function applyCoverageBaseline(report: CoverageReport, baseline: CoverageBaseline): CoverageReport {
  const exclude = (list: string[], baselineList: string[] | undefined): string[] => {
    if (!baselineList || baselineList.length === 0) return list;
    const ignore = new Set(baselineList);
    return list.filter((item) => !ignore.has(item));
  };
  return {
    newComponents: exclude(report.newComponents, baseline.newComponents),
    orphanDirs: exclude(report.orphanDirs, baseline.orphanDirs),
    unmappedGroups: report.unmappedGroups,
    missingDescriptions: exclude(report.missingDescriptions, baseline.missingDescriptions),
    unknownRelatedNames: exclude(report.unknownRelatedNames, baseline.unknownRelatedNames),
    deprecatedNotFollowed: exclude(report.deprecatedNotFollowed, baseline.deprecatedNotFollowed),
  };
}

/**
 * baseline に列挙されているがレポートに含まれていない (= 解消済み) エントリを抽出。
 * baseline メンテナンス用の情報として返す。
 */
export function findStaleBaselineEntries(report: CoverageReport, baseline: CoverageBaseline): string[] {
  const stale: string[] = [];
  for (const key of [
    'newComponents',
    'orphanDirs',
    'missingDescriptions',
    'unknownRelatedNames',
    'deprecatedNotFollowed',
  ] as const) {
    const baselineList = baseline[key];
    if (!baselineList) continue;
    const reportSet = new Set(report[key]);
    for (const entry of baselineList) {
      if (!reportSet.has(entry)) stale.push(`${key}: ${entry}`);
    }
  }
  return stale;
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

  if (report.unknownRelatedNames.length > 0) {
    hasIssue = true;
    console.log(
      `   ⚠️  relatedComponents の name が smarthr-ui の公開 export に存在しません (${report.unknownRelatedNames.length}): ${report.unknownRelatedNames.join(', ')}`,
    );
    console.log(
      `       → typo または smarthr-ui で削除/rename された name の可能性。親 mdx の relatedComponents を修正してください`,
    );
  }

  if (report.deprecatedNotFollowed.length > 0) {
    hasIssue = true;
    console.log(
      `   ⚠️  metadata.json で非推奨だが index.mdx が未追従 (${report.deprecatedNotFollowed.length}): ${report.deprecatedNotFollowed.join(', ')}`,
    );
    console.log(
      `       → 該当コンポーネントの index.mdx frontmatter に deprecated: true と deprecatedMessage を追加してください`,
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
