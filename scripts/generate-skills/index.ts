import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { parseMetadata, type ComponentGroup } from './lib/parse-metadata.js';
import {
  fetchEslintRules,
  buildComponentRuleMap,
  type EslintRuleWithContent,
} from './lib/fetch-eslint-rules.js';
import { parseChecklist } from './lib/parse-checklist.js';
import { parseIndexMdx, type IndexMdxInfo } from './lib/parse-index-mdx.js';
import { buildDirMapping, loadManualMappings, pascalToKebab } from './lib/name-mapping.js';
import { renderSkill } from './lib/render-skill.js';
import { renderRouterSkill, type RouterEntry } from './lib/render-router-skill.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '../..');

const DESIGN_SYSTEM_DIR =
  process.env.DESIGN_SYSTEM_DIR ??
  path.join(REPO_ROOT, 'src/content/articles/products/components');
const OUTPUT_DIR =
  process.env.OUTPUT_DIR ?? path.join(REPO_ROOT, 'plugins/smarthr-design-system/skills');
const MANUAL_MAPPING_PATH = path.join(__dirname, 'mapping/component-dir-map.json');
const ESLINT_CACHE_PATH = path.join(__dirname, '.cache/eslint-rules.json');

async function main() {
  console.log('📂 metadata.json を読み込み中…');
  const groups = parseMetadata();
  console.log(`   ${groups.size} コンポーネントグループを検出`);

  console.log('🌐 eslint-plugin-smarthr ルール README を取得中…（キャッシュ優先）');
  const rules = await fetchEslintRules(ESLINT_CACHE_PATH);
  console.log(`   ${rules.length} ルールを取得`);

  const allDisplayNames = new Set<string>();
  for (const group of groups.values()) {
    for (const name of group.displayNames) allDisplayNames.add(name);
  }
  const componentRuleMap = buildComponentRuleMap(rules, allDisplayNames);
  console.log(`   ${componentRuleMap.size} コンポーネントを eslint ルールに紐付け`);

  console.log('🗺️  デザインシステムディレクトリのマッピング構築中…');
  const manualMappings = loadManualMappings(MANUAL_MAPPING_PATH);
  const dirMapping = buildDirMapping([...groups.keys()], DESIGN_SYSTEM_DIR, manualMappings);
  console.log(`   ${dirMapping.size}/${groups.size} を design-system dir に対応付け`);

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const routerEntries: RouterEntry[] = [];
  let generated = 0;
  let withLayer3 = 0;

  for (const [dirName, group] of groups) {
    const designSystemDirName = dirMapping.get(dirName);
    let indexInfo: IndexMdxInfo | null = null;
    let checklist = null;

    if (designSystemDirName) {
      const compDir = path.join(DESIGN_SYSTEM_DIR, designSystemDirName);
      indexInfo = parseIndexMdx(path.join(compDir, 'index.mdx'));
      checklist = parseChecklist(path.join(compDir, '__checklist.yaml'));
      if (checklist !== null) withLayer3++;
    }

    const eslintRulesSet = new Map<string, EslintRuleWithContent>();
    for (const displayName of group.displayNames) {
      const rules = componentRuleMap.get(displayName) ?? [];
      for (const rule of rules) {
        if (!eslintRulesSet.has(rule.name)) eslintRulesSet.set(rule.name, rule);
      }
    }
    const eslintRules = [...eslintRulesSet.values()];

    const content = renderSkill({ group, indexInfo, eslintRules, checklist });
    const skillSlug = pascalToKebab(dirName);
    const outDir = path.join(OUTPUT_DIR, skillSlug);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'SKILL.md'), content, 'utf-8');
    generated++;

    routerEntries.push({ group, indexInfo, designSystemDir: designSystemDirName });
  }

  console.log(`✅ ${generated} 個のコンポーネント SKILL.md を生成（うち Layer 3 あり: ${withLayer3}）`);

  console.log('🧭 ルータースキル component-selector を生成中…');
  const routerDir = path.join(OUTPUT_DIR, 'component-selector');
  fs.mkdirSync(routerDir, { recursive: true });
  fs.writeFileSync(path.join(routerDir, 'SKILL.md'), renderRouterSkill(routerEntries), 'utf-8');
  console.log(`   → ${path.relative(REPO_ROOT, path.join(routerDir, 'SKILL.md'))}`);

  console.log('🎉 完了');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
