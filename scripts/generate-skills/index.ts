import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { parseMetadata, loadPublicExports } from './lib/parse-metadata.js';
import { autoSplitGroups } from './lib/auto-split-groups.js';
import { fetchEslintRules, buildComponentRuleMap, type EslintRuleWithContent } from './lib/fetch-eslint-rules.js';
import { parseChecklist } from './lib/parse-checklist.js';
import { parseIndexMdx, type IndexMdxInfo } from './lib/parse-index-mdx.js';
import { collectRelatedComponents } from './lib/related-components.js';
import { buildDirMapping, loadManualMappings, toDocFileName } from './lib/name-mapping.js';
import { renderSkill } from './lib/render-skill.js';
import { renderRouterSkill, type RouterEntry } from './lib/render-router-skill.js';
import { validateCoverage, printCoverageReport, loadCoverageBaseline, applyCoverageBaseline } from './lib/validate-coverage.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '../..');

const SMARTHR_UI_VERSION: string = JSON.parse(
  fs.readFileSync(createRequire(import.meta.url).resolve('smarthr-ui/package.json'), 'utf-8'),
).version;

const DESIGN_SYSTEM_DIR = process.env.DESIGN_SYSTEM_DIR ?? path.join(REPO_ROOT, 'src/content/articles/products/components');
const OUTPUT_DIR = process.env.OUTPUT_DIR ?? path.join(REPO_ROOT, 'plugins/smarthr-design-system/skills');
const MANUAL_MAPPING_PATH = path.join(__dirname, 'mapping/component-dir-map.json');
const COVERAGE_BASELINE_PATH = path.join(__dirname, 'coverage-baseline.json');
const ESLINT_SNAPSHOT_PATH = path.join(__dirname, 'eslint-rules-snapshot.json');
const ESLINT_RULE_NAMES_PATH = path.join(REPO_ROOT, '.github/data/eslint-rule-names.txt');

async function main() {
  console.log('📂 metadata.json を読み込み中…');
  const publicExports = loadPublicExports();
  console.log(`   ${publicExports.size} 個の public named exports を取得`);
  const rawGroups = parseMetadata(publicExports);

  console.log('🧬 relatedComponents 宣言を集約中…');
  const relatedSkills = collectRelatedComponents(DESIGN_SYSTEM_DIR);
  console.log(`   ${relatedSkills.size} 件の relatedComponents 宣言を検出`);

  const groups = autoSplitGroups(rawGroups, new Set(relatedSkills.keys()), DESIGN_SYSTEM_DIR);
  console.log(`   ${groups.size} コンポーネントグループを検出`);

  console.log('🌐 eslint-plugin-smarthr ルール README を読み込み中…（コミット済みスナップショット優先）');
  const rules = await fetchEslintRules(ESLINT_SNAPSHOT_PATH, ESLINT_RULE_NAMES_PATH);
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

  const rawCoverageReport = validateCoverage({
    groups,
    dirMapping,
    designSystemDir: DESIGN_SYSTEM_DIR,
    inheritedNames: new Set(relatedSkills.keys()),
    relatedSkills,
    publicExports,
  });
  const coverageBaseline = loadCoverageBaseline(COVERAGE_BASELINE_PATH);
  const coverageReport = applyCoverageBaseline(rawCoverageReport, coverageBaseline);
  printCoverageReport(coverageReport);

  const COMPONENT_GUIDELINES_DIR = path.join(OUTPUT_DIR, 'component-guidelines');
  const COMPONENTS_DIR = path.join(COMPONENT_GUIDELINES_DIR, 'components');
  fs.mkdirSync(COMPONENTS_DIR, { recursive: true });

  // 生成予定のドキュメントファイル名を先に計算し、古いファイルを削除する。
  const expectedDocFiles = new Set<string>();
  for (const dirName of groups.keys()) expectedDocFiles.add(toDocFileName(dirName));

  for (const existing of fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true })) {
    if (!existing.isFile() || !existing.name.endsWith('.md')) continue;
    if (!expectedDocFiles.has(existing.name)) {
      console.log(`   🗑️  古いドキュメントファイルを削除: ${existing.name}`);
      fs.rmSync(path.join(COMPONENTS_DIR, existing.name), { force: true });
    }
  }

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
      checklist = parseChecklist(path.join(compDir, 'checklist.yaml'));
      if (checklist !== null) withLayer3++;
    } else if (relatedSkills.has(dirName)) {
      const rel = relatedSkills.get(dirName)!;
      indexInfo = {
        ...rel.parentInfo,
        title: rel.name,
        description: rel.description ?? rel.parentInfo.description,
        relatedComponents: [],
      };
      const parentDesignDirName = dirMapping.get(rel.parentName);
      if (parentDesignDirName) {
        const parentCompDir = path.join(DESIGN_SYSTEM_DIR, parentDesignDirName);
        checklist = parseChecklist(path.join(parentCompDir, 'checklist.yaml'));
        if (checklist !== null) withLayer3++;
      }
    }

    const eslintRulesSet = new Map<string, EslintRuleWithContent>();
    for (const displayName of group.displayNames) {
      const rules = componentRuleMap.get(displayName) ?? [];
      for (const rule of rules) {
        if (!eslintRulesSet.has(rule.name)) eslintRulesSet.set(rule.name, rule);
      }
    }
    const eslintRules = [...eslintRulesSet.values()];

    const content = renderSkill({ group, indexInfo, eslintRules, checklist, smarthrUiVersion: SMARTHR_UI_VERSION });
    const docFileName = toDocFileName(dirName);
    fs.writeFileSync(path.join(COMPONENTS_DIR, docFileName), content, 'utf-8');
    generated++;

    routerEntries.push({ group, indexInfo, designSystemDir: designSystemDirName });
  }

  console.log(`✅ ${generated} 個のコンポーネントドキュメントを生成（うち Layer 3 あり: ${withLayer3}）`);

  console.log('🧭 component-selector ドキュメントを生成中…');
  const routerPath = path.join(COMPONENT_GUIDELINES_DIR, 'component-selector.md');
  fs.writeFileSync(routerPath, renderRouterSkill(routerEntries, SMARTHR_UI_VERSION), 'utf-8');
  console.log(`   → ${path.relative(REPO_ROOT, routerPath)}`);

  console.log('🎉 完了');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
