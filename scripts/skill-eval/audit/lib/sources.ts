import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

import {
  parseMetadata,
  loadPublicExports,
  type ComponentMeta,
} from '../../../generate-skills/lib/parse-metadata.ts';
import { parseIndexMdx, type IndexMdxInfo } from '../../../generate-skills/lib/parse-index-mdx.ts';
import {
  buildDirMapping,
  loadManualMappings,
} from '../../../generate-skills/lib/name-mapping.ts';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..', '..', '..', '..');

export const DESIGN_SYSTEM_DIR = path.join(REPO_ROOT, 'src/content/articles/products/components');
export const COMPONENTS_DOC_DIR = path.join(
  REPO_ROOT,
  'plugins/smarthr-design-system/skills/component-guidelines/components',
);
const MANUAL_MAPPING_PATH = path.join(
  REPO_ROOT,
  'scripts/generate-skills/mapping/component-dir-map.json',
);

type RawComponent = {
  displayName: string;
  tags?: { deprecated?: string | boolean };
  props?: Array<{ name: string; description?: string; tags?: Record<string, unknown> }>;
};

export type Sources = {
  /** displayName → 公開コンポーネントの metadata（生成と同じフィルタ後） */
  metaByDisplayName: Map<string, ComponentMeta>;
  /** metadata.json の tags.deprecated を持つ displayName と理由 */
  metadataDeprecated: Map<string, string>;
  /** 全 public displayName（実在判定用） */
  publicDisplayNames: Set<string>;
  /** dirName(PascalCase) → design-system 相対 dir（kebab, ネスト含む） */
  dirMapping: Map<string, string>;
  /** dirName → index.mdx 情報（mdx 整合・非推奨の取得元） */
  indexInfoByDir: Map<string, IndexMdxInfo | null>;
  /** dirName → checklist.yaml が存在するか */
  hasChecklist: Map<string, boolean>;
};

/** 監査に必要な単一ソース群を一括ロードする */
export function loadSources(dirNames: string[]): Sources {
  const publicExports = loadPublicExports();
  const groups = parseMetadata(publicExports);

  const metaByDisplayName = new Map<string, ComponentMeta>();
  for (const group of groups.values()) {
    for (const c of group.components) metaByDisplayName.set(c.displayName, c);
  }

  // 生メタデータから tags.deprecated を拾う
  const rawMeta = require('smarthr-ui/metadata.json') as RawComponent[];
  const metadataDeprecated = new Map<string, string>();
  for (const c of rawMeta) {
    const dep = c.tags?.deprecated;
    if (dep) metadataDeprecated.set(c.displayName, typeof dep === 'string' ? dep : '');
  }

  const manualMappings = loadManualMappings(MANUAL_MAPPING_PATH);
  const dirMapping = buildDirMapping(dirNames, DESIGN_SYSTEM_DIR, manualMappings);

  const indexInfoByDir = new Map<string, IndexMdxInfo | null>();
  const hasChecklist = new Map<string, boolean>();
  for (const dirName of dirNames) {
    const rel = dirMapping.get(dirName);
    if (!rel) {
      indexInfoByDir.set(dirName, null);
      hasChecklist.set(dirName, false);
      continue;
    }
    const compDir = path.join(DESIGN_SYSTEM_DIR, rel);
    indexInfoByDir.set(dirName, parseIndexMdx(path.join(compDir, 'index.mdx')));
    hasChecklist.set(dirName, fs.existsSync(path.join(compDir, 'checklist.yaml')));
  }

  return {
    metaByDisplayName,
    metadataDeprecated,
    publicDisplayNames: new Set(metaByDisplayName.keys()),
    dirMapping,
    indexInfoByDir,
    hasChecklist,
  };
}

/** ガイド doc 名（PascalCase）一覧を返す */
export function listGuideDirNames(): string[] {
  return fs
    .readdirSync(COMPONENTS_DOC_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
    .sort();
}
