import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { parseMetadata, loadPublicExports, type ComponentGroup } from './lib/parse-metadata.js';
import { fetchEslintRules, buildComponentRuleMap, type EslintRuleWithContent } from './lib/fetch-eslint-rules.js';
import { parseChecklist } from './lib/parse-checklist.js';
import { parseIndexMdx, type IndexMdxInfo } from './lib/parse-index-mdx.js';
import { collectRelatedComponents } from './lib/related-components.js';
import { buildDirMapping, loadManualMappings, toDocFileName } from './lib/name-mapping.js';
import { renderSkill } from './lib/render-skill.js';
import { renderRouterSkill, type RouterEntry } from './lib/render-router-skill.js';
import { validateCoverage, printCoverageReport } from './lib/validate-coverage.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '../..');

const DESIGN_SYSTEM_DIR = process.env.DESIGN_SYSTEM_DIR ?? path.join(REPO_ROOT, 'src/content/articles/products/components');
const OUTPUT_DIR = process.env.OUTPUT_DIR ?? path.join(REPO_ROOT, 'plugins/smarthr-design-system/skills');
const MANUAL_MAPPING_PATH = path.join(__dirname, 'mapping/component-dir-map.json');
const ESLINT_SNAPSHOT_PATH = path.join(__dirname, 'eslint-rules-snapshot.json');
const ESLINT_RULE_NAMES_PATH = path.join(REPO_ROOT, '.github/data/eslint-rule-names.txt');

/**
 * smarthr-ui の親ディレクトリ単位グループから、design-system 側の `relatedComponents` 宣言に
 * 含まれる displayName を個別グループとして分離する。残った displayName は元の親グループ名
 * で保持する。
 *
 * 例: smarthr-ui `Dialog/RemoteDialogTrigger/` 配下に `ActionDialog/FormDialog/MessageDialog/
 * StepFormDialog/RemoteDialogTrigger` がまとめられている場合、design-system `dialog/index.mdx`
 * の `relatedComponents` 宣言を起点に各 displayName を独立グループへ分離する。
 */
function autoSplitGroups(groups: Map<string, ComponentGroup>, relatedNames: Set<string>): Map<string, ComponentGroup> {
  const result = new Map<string, ComponentGroup>();
  for (const [dirName, group] of groups) {
    const splitTargets = group.components.filter((c) => relatedNames.has(c.displayName));
    // 分離トリガは「relatedComponents 宣言が 2 件以上 group 内に存在する」ときに発動する。
    // これにより、smarthr-ui の親ディレクトリに複数の displayName が同居しているグループ
    // (例: `Dialog/RemoteDialogTrigger/` 配下に 5 つの Dialog) のみが分離対象となる。
    // 1 件以下の場合は元グループをそのまま保持し、`ControlledStepFormDialog` グループの
    // `StepFormDialogItem` のような同居 named export を取りこぼさない。
    if (splitTargets.length < 2) {
      result.set(dirName, group);
      continue;
    }
    for (const target of splitTargets) {
      result.set(target.displayName, {
        dirName: target.displayName,
        displayNames: [target.displayName],
        components: [target],
      });
    }
    // 親グループ自体は、group 名と同名の displayName のみを含める。
    // group 名と一致しない displayName(例: smarthr-ui の Table 配下にある WakuWakuButton や
    // TableScrollContext 等の内部部品で `relatedComponents` 宣言もないもの) は SKILL 生成対象外とする。
    const primary = group.components.filter((c) => c.displayName === dirName);
    if (primary.length > 0) {
      result.set(dirName, {
        dirName,
        displayNames: primary.map((c) => c.displayName),
        components: primary,
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

  console.log('🧬 relatedComponents 宣言を集約中…');
  const relatedSkills = collectRelatedComponents(DESIGN_SYSTEM_DIR);
  console.log(`   ${relatedSkills.size} 件の relatedComponents 宣言を検出`);

  const groups = autoSplitGroups(rawGroups, new Set(relatedSkills.keys()));
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

  const coverageReport = validateCoverage({
    groups,
    dirMapping,
    designSystemDir: DESIGN_SYSTEM_DIR,
    inheritedNames: new Set(relatedSkills.keys()),
    relatedSkills,
    publicExports,
  });
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

    const content = renderSkill({ group, indexInfo, eslintRules, checklist });
    const docFileName = toDocFileName(dirName);
    fs.writeFileSync(path.join(COMPONENTS_DIR, docFileName), content, 'utf-8');
    generated++;

    routerEntries.push({ group, indexInfo, designSystemDir: designSystemDirName });
  }

  console.log(`✅ ${generated} 個のコンポーネントドキュメントを生成（うち Layer 3 あり: ${withLayer3}）`);

  console.log('🧭 component-selector ドキュメントを生成中…');
  const routerPath = path.join(COMPONENT_GUIDELINES_DIR, 'component-selector.md');
  fs.writeFileSync(routerPath, renderRouterSkill(routerEntries), 'utf-8');
  console.log(`   → ${path.relative(REPO_ROOT, routerPath)}`);

  console.log('🎉 完了');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
