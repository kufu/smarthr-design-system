import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { parseMetadata, loadPublicExports, type ComponentGroup } from './lib/parse-metadata.js';
import { fetchEslintRules, buildComponentRuleMap, type EslintRuleWithContent } from './lib/fetch-eslint-rules.js';
import { parseChecklist } from './lib/parse-checklist.js';
import { parseIndexMdx, type IndexMdxInfo } from './lib/parse-index-mdx.js';
import { collectInheritedSkills } from './lib/inherited-by.js';
import { buildDirMapping, loadManualMappings, toSkillSlug } from './lib/name-mapping.js';
import { renderSkill } from './lib/render-skill.js';
import { renderRouterSkill, type RouterEntry } from './lib/render-router-skill.js';
import { validateCoverage, printCoverageReport } from './lib/validate-coverage.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '../..');

const DESIGN_SYSTEM_DIR = process.env.DESIGN_SYSTEM_DIR ?? path.join(REPO_ROOT, 'src/content/articles/products/components');
const OUTPUT_DIR = process.env.OUTPUT_DIR ?? path.join(REPO_ROOT, 'plugins/smarthr-design-system/skills');
const MANUAL_MAPPING_PATH = path.join(__dirname, 'mapping/component-dir-map.json');
const GROUP_SPLIT_PATH = path.join(__dirname, 'mapping/group-split.json');
const ESLINT_CACHE_PATH = path.join(__dirname, '.cache/eslint-rules.json');
const ESLINT_RULE_NAMES_PATH = path.join(REPO_ROOT, '.github/data/eslint-rule-names.txt');

function applyGroupSplit(
  groups: Map<string, ComponentGroup>,
  splitConfig: Record<string, string[]>,
): Map<string, ComponentGroup> {
  const result = new Map<string, ComponentGroup>();
  for (const [dirName, group] of groups) {
    const splitOrder = splitConfig[dirName];
    if (!splitOrder) {
      result.set(dirName, group);
      continue;
    }
    // Split group by displayName prefix matching split order
    for (const targetName of splitOrder) {
      const matched = group.components.filter((c) => c.displayName === targetName);
      if (matched.length === 0) continue;
      result.set(targetName, {
        dirName: targetName,
        displayNames: matched.map((c) => c.displayName),
        components: matched,
      });
    }
  }
  return result;
}

async function main() {
  console.log('📂 metadata.json を読み込み中…');
  const publicExports = loadPublicExports();
  console.log(`   ${publicExports.size} 個の public named exports を取得`);
  const rawGroups = parseMetadata(publicExports);

  const splitConfig: Record<string, string[]> = JSON.parse(fs.readFileSync(GROUP_SPLIT_PATH, 'utf-8'));
  const groups = applyGroupSplit(rawGroups, splitConfig);

  console.log(`   ${groups.size} コンポーネントグループを検出`);

  console.log('🌐 eslint-plugin-smarthr ルール README を取得中…（キャッシュ優先）');
  const rules = await fetchEslintRules(ESLINT_CACHE_PATH, ESLINT_RULE_NAMES_PATH);
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

  console.log('🧬 inheritedBy 宣言を集約中…');
  const inheritedSkills = collectInheritedSkills(DESIGN_SYSTEM_DIR);
  console.log(`   ${inheritedSkills.size} 件の inheritedBy 宣言を検出`);

  const coverageReport = validateCoverage({
    groups,
    dirMapping,
    designSystemDir: DESIGN_SYSTEM_DIR,
    inheritedNames: new Set(inheritedSkills.keys()),
  });
  printCoverageReport(coverageReport);

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // 生成予定の skill slug 一覧を先に計算し、出力先の古いディレクトリを削除する。
  // smarthr-ui からコンポーネントが削除/rename されたときの残骸を防ぐ。
  const expectedSlugs = new Set<string>(['component-selector']);
  for (const dirName of groups.keys()) expectedSlugs.add(toSkillSlug(dirName));

  for (const existing of fs.readdirSync(OUTPUT_DIR, { withFileTypes: true })) {
    if (!existing.isDirectory()) continue;
    if (!expectedSlugs.has(existing.name)) {
      console.log(`   🗑️  古い skill ディレクトリを削除: ${existing.name}`);
      fs.rmSync(path.join(OUTPUT_DIR, existing.name), { recursive: true, force: true });
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
    } else if (inheritedSkills.has(dirName)) {
      // 派生先コンポーネント: 親 mdx の本文を継承し、description のみ派生先固有に差し替える
      const inh = inheritedSkills.get(dirName)!;
      indexInfo = {
        ...inh.parentInfo,
        title: inh.name,
        description: inh.description,
        inheritedBy: [],
      };
      // 親コンポーネントの checklist も継承する
      const parentDesignDirName = dirMapping.get(inh.parentName);
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

    const content = renderSkill({ group, indexInfo, eslintRules, checklist });
    const skillSlug = toSkillSlug(dirName);
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
