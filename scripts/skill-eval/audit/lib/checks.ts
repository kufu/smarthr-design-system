import {
  formatType,
  formatDefault,
  type ComponentMeta,
  type PropMeta,
} from '../../../generate-skills/lib/parse-metadata.ts';
import {
  isSubstantivelyDuplicate,
  isLeadSupersetOfDescription,
  type IndexMdxInfo,
} from '../../../generate-skills/lib/parse-index-mdx.ts';
import { formatSkillBodyText } from '../../../generate-skills/lib/format-skill-body-text.ts';
import type { Finding } from './finding.ts';
import type { GuideDoc, PropRow } from './guide-parser.ts';
import type { Sources } from './sources.ts';

const REQUIRED_SECTIONS = ['import', 'Props', '実装ルール', '使い方チェックリスト'];
const DEPRECATION_KEYWORD = /非推奨|deprecated/i;

/** 空白・改行を 1 スペースに正規化（生成側の改行と parser 側の空白結合の差を吸収） */
function normalizeWs(s: string): string {
  return s.replace(/\s+/g, ' ').trim();
}

/**
 * render-skill.ts の説明文生成ロジックを再現し、mdx から「ガイドに出るべき説明文」を組み立てる。
 * これと実際のガイド説明文を比較することで、生成器の出力どおりかを忠実に検査する。
 */
function expectedDescription(info: IndexMdxInfo): string {
  const { description, leadParagraph } = info;
  const parts: string[] = [];
  if (description && leadParagraph && isLeadSupersetOfDescription(description, leadParagraph)) {
    parts.push(formatSkillBodyText(leadParagraph));
  } else {
    if (description) parts.push(formatSkillBodyText(description));
    if (leadParagraph && !isSubstantivelyDuplicate(description, leadParagraph)) {
      parts.push(formatSkillBodyText(leadParagraph));
    }
  }
  return normalizeWs(parts.join(' '));
}

/** ガイドの Props テーブルから displayName の行を取得（単一コンポーネント時は dirName キーにフォールバック） */
function guideRowsFor(doc: GuideDoc, name: string): PropRow[] | undefined {
  if (doc.propsByComponent.has(name)) return doc.propsByComponent.get(name);
  // ### 見出しが無く dirName 単一キーで格納されているケース
  if (doc.importNames.length === 1 && doc.propsByComponent.has(doc.dirName)) {
    return doc.propsByComponent.get(doc.dirName);
  }
  return undefined;
}

// ---- Check 1: metadata.json 照合 ----
export function checkMetadata(doc: GuideDoc, src: Sources): Finding[] {
  const findings: Finding[] = [];
  for (const name of doc.importNames) {
    const meta: ComponentMeta | undefined = src.metaByDisplayName.get(name);
    if (!meta) {
      // 実在しない / 内部部品で metadata 非公開 → 検証不能
      if (!src.publicDisplayNames.has(name)) {
        findings.push({
          component: doc.dirName,
          check: 'metadata',
          severity: 'info',
          location: `import:${name}`,
          message: `import 名 ${name} が metadata.json の公開コンポーネントに見つからず props 照合をスキップ`,
        });
      }
      continue;
    }
    const expected = new Map<string, PropMeta>(meta.props.map((p) => [p.name, p]));
    const guideRows = guideRowsFor(doc, name);

    if (guideRows === undefined) {
      if (meta.props.length > 0) {
        findings.push({
          component: doc.dirName,
          check: 'metadata',
          severity: 'warning',
          location: `Props.${name}`,
          message: `${name} の Props テーブルがガイドに存在しない（metadata には ${meta.props.length} 件）`,
        });
      }
      continue;
    }

    const actual = new Map<string, PropRow>(guideRows.map((r) => [r.name, r]));

    // metadata に props があるのに「（固有 Props なし）」表記
    if (meta.props.length > 0 && doc.noOwnProps.has(name) && guideRows.length === 0) {
      findings.push({
        component: doc.dirName,
        check: 'metadata',
        severity: 'error',
        location: `Props.${name}`,
        message: `「（固有 Props なし）」と記載されているが metadata には ${meta.props.length} 件の props がある`,
      });
    }

    // ghost: ガイドにあるが metadata に無い
    for (const row of guideRows) {
      if (!expected.has(row.name)) {
        findings.push({
          component: doc.dirName,
          check: 'metadata',
          severity: 'error',
          location: `Props.${name}.${row.name}`,
          message: `metadata.json に存在しない props がガイドに記載されている`,
          actual: row.name,
        });
      }
    }

    // missing / mismatch
    for (const prop of meta.props) {
      const row = actual.get(prop.name);
      if (!row) {
        findings.push({
          component: doc.dirName,
          check: 'metadata',
          severity: 'warning',
          location: `Props.${name}.${prop.name}`,
          message: `metadata にある props がガイドの表に無い（取りこぼし / 陳腐化）`,
          expected: prop.name,
        });
        continue;
      }
      const expType = formatType(prop);
      if (row.type !== expType) {
        findings.push({
          component: doc.dirName,
          check: 'metadata',
          severity: 'error',
          location: `Props.${name}.${prop.name}.type`,
          message: `型がメタデータと不一致`,
          expected: expType,
          actual: row.type,
        });
      }
      const expDefault = formatDefault(prop);
      if (row.default !== expDefault) {
        findings.push({
          component: doc.dirName,
          check: 'metadata',
          severity: 'warning',
          location: `Props.${name}.${prop.name}.default`,
          message: `デフォルト値がメタデータと不一致`,
          expected: expDefault,
          actual: row.default,
        });
      }
      if (row.required !== prop.required) {
        findings.push({
          component: doc.dirName,
          check: 'metadata',
          severity: 'error',
          location: `Props.${name}.${prop.name}.required`,
          message: `必須/任意フラグがメタデータと不一致`,
          expected: prop.required ? '必須(✓)' : '任意(-)',
          actual: row.required ? '必須(✓)' : '任意(-)',
        });
      }
    }
  }
  return findings;
}

// ---- Check 2: 非推奨参照検出 ----
export function checkDeprecation(doc: GuideDoc, src: Sources): Finding[] {
  const findings: Finding[] = [];
  const info = src.indexInfoByDir.get(doc.dirName) ?? null;
  const mdxDeprecated = Boolean(info?.deprecated);
  const metaDeprecated = src.metadataDeprecated.has(doc.dirName);

  // 自身の非推奨ステータスとバナーの整合
  if (mdxDeprecated && !doc.hasDeprecationBanner) {
    findings.push({
      component: doc.dirName,
      check: 'deprecation',
      severity: 'error',
      location: 'banner',
      message: 'index.mdx が非推奨だがガイドに ⚠️ 非推奨バナーが無い（陳腐化）',
    });
  }
  if (doc.hasDeprecationBanner && !mdxDeprecated && !metaDeprecated) {
    findings.push({
      component: doc.dirName,
      check: 'deprecation',
      severity: 'warning',
      location: 'banner',
      message: 'ガイドに非推奨バナーがあるが mdx/metadata のどちらも非推奨と宣言していない',
    });
  }
  // ソース間の不一致（取得元の食い違いを報告）
  if (mdxDeprecated !== metaDeprecated) {
    findings.push({
      component: doc.dirName,
      check: 'deprecation',
      severity: 'warning',
      location: 'source-discrepancy',
      message: '非推奨ステータスが mdx と metadata で食い違っている',
      expected: `mdx=${mdxDeprecated}`,
      actual: `metadata=${metaDeprecated}`,
    });
  }

  // 他の非推奨コンポーネントを推奨していないか（説明・チェックリスト本文を走査）
  const deprecatedNames = new Set<string>([
    ...src.metadataDeprecated.keys(),
  ]);
  for (const [dir, i] of src.indexInfoByDir) if (i?.deprecated) deprecatedNames.add(dir);
  deprecatedNames.delete(doc.dirName); // 自身は除外

  const recommendationText = `${doc.description}\n${doc.checklistContent}`;
  for (const dep of deprecatedNames) {
    const re = new RegExp(`\\b${dep}\\b`);
    if (re.test(recommendationText)) {
      findings.push({
        component: doc.dirName,
        check: 'deprecation',
        severity: 'warning',
        location: 'recommend-deprecated',
        message: `非推奨コンポーネント ${dep} が説明/チェックリストで言及されている（推奨でないか要確認）`,
        actual: dep,
      });
    }
  }

  // prop 説明文中の非推奨ヒント（metadata に機械可読な prop 非推奨フラグが無いため description ベース）
  for (const [name, rows] of doc.propsByComponent) {
    for (const row of rows) {
      if (DEPRECATION_KEYWORD.test(row.description)) {
        findings.push({
          component: doc.dirName,
          check: 'deprecation',
          severity: 'info',
          location: `Props.${name}.${row.name}`,
          message: `props 説明文に非推奨の記述（推奨していないか要確認）`,
          actual: row.name,
        });
      }
    }
  }
  return findings;
}

// ---- Check 3: mdx 整合 ----
export function checkMdx(doc: GuideDoc, src: Sources): Finding[] {
  const findings: Finding[] = [];
  const info = src.indexInfoByDir.get(doc.dirName) ?? null;
  if (!info) {
    findings.push({
      component: doc.dirName,
      check: 'mdx',
      severity: 'info',
      location: 'index.mdx',
      message: '対応する index.mdx が見つからず mdx 整合を検査できない',
    });
    return findings;
  }

  // タイトル整合（metadata 由来の dirName と mdx frontmatter title）
  if (info.title && doc.title && info.title !== doc.title) {
    findings.push({
      component: doc.dirName,
      check: 'mdx',
      severity: 'warning',
      location: 'title',
      message: 'ガイドのタイトルと mdx frontmatter title が不一致',
      expected: info.title,
      actual: doc.title,
    });
  }

  // 説明文整合: 生成器が mdx から出力するはずの説明文と実際のガイド説明文を比較
  if (info.description || info.leadParagraph) {
    const expected = expectedDescription(info);
    const actual = normalizeWs(doc.description);

    if (!actual && expected) {
      findings.push({
        component: doc.dirName,
        check: 'mdx',
        severity: 'error',
        location: 'description',
        message: 'ガイドに説明文が無い（mdx には説明がある）',
        expected: expected.slice(0, 60),
      });
    } else if (expected && actual !== expected) {
      findings.push({
        component: doc.dirName,
        check: 'mdx',
        severity: 'warning',
        location: 'description',
        message: 'ガイド説明文が mdx 単一ソースの生成結果と不一致（要再生成）',
        expected: expected.slice(0, 100),
        actual: actual.slice(0, 100),
      });
    }
  }
  return findings;
}

// ---- Check 4: 構造 lint ----
export function checkStructure(doc: GuideDoc, src: Sources): Finding[] {
  const findings: Finding[] = [];

  if (!doc.title) {
    findings.push({
      component: doc.dirName,
      check: 'structure',
      severity: 'error',
      location: 'title',
      message: 'タイトル（# 見出し）が無い',
    });
  }

  for (const sec of REQUIRED_SECTIONS) {
    if (!doc.sectionTitles.includes(sec)) {
      findings.push({
        component: doc.dirName,
        check: 'structure',
        severity: 'error',
        location: `section:## ${sec}`,
        message: `必須セクション「## ${sec}」が無い`,
      });
    }
  }

  // セクション順序
  const presentRequired = doc.sectionTitles.filter((t) => REQUIRED_SECTIONS.includes(t));
  const expectedOrder = REQUIRED_SECTIONS.filter((t) => presentRequired.includes(t));
  if (presentRequired.join(',') !== expectedOrder.join(',')) {
    findings.push({
      component: doc.dirName,
      check: 'structure',
      severity: 'warning',
      location: 'section-order',
      message: '必須セクションの並び順がテンプレと異なる',
      expected: expectedOrder.join(' → '),
      actual: presentRequired.join(' → '),
    });
  }

  // import セクションがあるのに有効な smarthr-ui import が取れない
  if (doc.sectionTitles.includes('import') && doc.importNames.length === 0) {
    findings.push({
      component: doc.dirName,
      check: 'structure',
      severity: 'error',
      location: 'section:## import',
      message: "import セクションに `from 'smarthr-ui'` の有効な import が無い",
    });
  }

  // checklist.yaml とガイドの 使い方チェックリスト の同期
  const hasChecklist = src.hasChecklist.get(doc.dirName) ?? false;
  const placeholder = doc.checklistContent.includes('設定されていません');
  if (hasChecklist && placeholder) {
    findings.push({
      component: doc.dirName,
      check: 'structure',
      severity: 'warning',
      location: 'checklist',
      message: 'checklist.yaml が存在するのにガイドの使い方チェックリストが未反映（要再生成）',
    });
  }
  if (!hasChecklist && !placeholder && doc.checklistContent.length > 0) {
    findings.push({
      component: doc.dirName,
      check: 'structure',
      severity: 'info',
      location: 'checklist',
      message: 'checklist.yaml が無いがガイドにチェックリスト本文がある（要確認）',
    });
  }

  return findings;
}

export function runAllChecks(doc: GuideDoc, src: Sources): Finding[] {
  return [
    ...checkMetadata(doc, src),
    ...checkDeprecation(doc, src),
    ...checkMdx(doc, src),
    ...checkStructure(doc, src),
  ];
}
