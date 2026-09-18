/**
 * relatedComponents / smarthr-ui 追従漏れ専用の整合性チェック。
 *
 * `pnpm generate` のフル実行に比べてネットワーク fetch (eslint ルール README) と
 * ファイル書き出しを省略し、PR チェック用に高速化したもの。
 *
 * 検出対象:
 * - newComponents: smarthr-ui に新規 / rename された displayName で index.mdx 未対応
 * - orphanDirs: index.mdx あるが smarthr-ui 側 displayName が消えた
 * - missingDescriptions: 子 dir なし & relatedComponents.description 未指定
 * - unknownRelatedNames: relatedComponents.name が公開 export に存在しない (typo / 削除)
 * - deprecatedNotFollowed: metadata.json=非推奨 だが index.mdx が deprecated 未設定 (部品単位)
 *
 * CI=true で違反検知時 exit 1。
 */
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

import { parseMetadata, loadPublicExports } from './lib/parse-metadata.js';
import { autoSplitGroups } from './lib/auto-split-groups.js';
import { collectRelatedComponents } from './lib/related-components.js';
import { buildDirMapping, loadManualMappings } from './lib/name-mapping.js';
import {
  validateCoverage,
  printCoverageReport,
  loadCoverageBaseline,
  applyCoverageBaseline,
  findStaleBaselineEntries,
} from './lib/validate-coverage.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '../..');

const DESIGN_SYSTEM_DIR = process.env.DESIGN_SYSTEM_DIR ?? path.join(REPO_ROOT, 'src/content/articles/products/components');
const MANUAL_MAPPING_PATH = path.join(__dirname, 'mapping/component-dir-map.json');
const COVERAGE_BASELINE_PATH = path.join(__dirname, 'coverage-baseline.json');

function main() {
  console.log('📂 metadata.json を読み込み中…');
  const publicExports = loadPublicExports();
  const rawGroups = parseMetadata(publicExports);

  console.log('🧬 relatedComponents 宣言を集約中…');
  const relatedSkills = collectRelatedComponents(DESIGN_SYSTEM_DIR);

  const groups = autoSplitGroups(rawGroups, new Set(relatedSkills.keys()), DESIGN_SYSTEM_DIR);

  console.log('🗺️  デザインシステムディレクトリのマッピング構築中…');
  const manualMappings = loadManualMappings(MANUAL_MAPPING_PATH);
  const dirMapping = buildDirMapping([...groups.keys()], DESIGN_SYSTEM_DIR, manualMappings);

  // metadata.json の非推奨フラグ (tags.deprecated) を持つ displayName 集合
  const require = createRequire(import.meta.url);
  const rawMetadata = require('smarthr-ui/metadata.json') as Array<{
    displayName: string;
    tags?: { deprecated?: unknown };
  }>;
  const metadataDeprecated = new Set(rawMetadata.filter((c) => c.tags?.deprecated).map((c) => c.displayName));

  const rawReport = validateCoverage({
    groups,
    dirMapping,
    designSystemDir: DESIGN_SYSTEM_DIR,
    inheritedNames: new Set(relatedSkills.keys()),
    relatedSkills,
    publicExports,
    metadataDeprecated,
  });

  const baseline = loadCoverageBaseline(COVERAGE_BASELINE_PATH);
  const stale = findStaleBaselineEntries(rawReport, baseline);
  const report = applyCoverageBaseline(rawReport, baseline);

  printCoverageReport(report);

  if (stale.length > 0) {
    console.log('');
    console.log(`ℹ️  baseline に列挙されているが既に解消済みのエントリ (${stale.length}):`);
    for (const entry of stale) console.log(`   - ${entry}`);
    console.log(`   → scripts/generate-skills/coverage-baseline.json からこれらを削除してください`);
  }
}

main();
