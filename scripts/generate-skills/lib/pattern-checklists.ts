import fs from 'node:fs';
import path from 'node:path';

import { formatSkillBodyText } from './format-skill-body-text.js';
import { parseChecklist, type ChecklistSection } from './parse-checklist.js';
import { parseIndexMdx } from './parse-index-mdx.js';
import { renderChecklistSections } from './render-checklist.js';

export type PatternChecklist = {
  /** パターンのディレクトリ名。`patterns/<slug>.mdx`（シンボリックリンク）と `checklists/<slug>.md` のファイル名に対応する */
  slug: string;
  /** index.mdx frontmatter の title（例: "ページレイアウト"） */
  title: string;
  description: string;
  checklist: ChecklistSection[];
};

/**
 * デザインパターン直下の `<slug>/checklist.yaml` を列挙して読み込む。
 *
 * checklist.yaml は同じディレクトリの index.mdx を出典とするため、1 ファイル構成のパターン（`<slug>.mdx`）は対象外。
 * カテゴリ付きの項目が 1 件もない checklist.yaml は形式エラーとみなしてスキップする（詳細は validate で検出する）。
 */
export function collectPatternChecklists(designPatternsDir: string): PatternChecklist[] {
  const result: PatternChecklist[] = [];
  for (const entry of fs.readdirSync(designPatternsDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const patternDir = path.join(designPatternsDir, entry.name);
    const checklist = parseChecklist(path.join(patternDir, 'checklist.yaml'));
    if (checklist === null) continue;
    if (checklist.length === 0) {
      console.warn(`   ⚠️  ${entry.name}/checklist.yaml に有効な項目がないためスキップ（validate で形式を確認してください）`);
      continue;
    }
    const indexInfo = parseIndexMdx(path.join(patternDir, 'index.mdx'));
    result.push({
      slug: entry.name,
      title: indexInfo?.title || entry.name,
      description: indexInfo?.description ?? '',
      checklist,
    });
  }
  return result.sort((a, b) => a.slug.localeCompare(b.slug));
}

export function renderPatternChecklist({ slug, title, description, checklist }: PatternChecklist): string {
  const parts: string[] = [];
  parts.push(`# ${title}`);
  parts.push('');
  if (description) {
    parts.push(formatSkillBodyText(description));
    parts.push('');
  }
  parts.push(
    `[patterns/${slug}.mdx](../patterns/${slug}.mdx) から、実装時に守るルールを抜き出したチェックリスト。実装例・図解・DoAndDont の詳細は元の mdx を参照すること。`,
  );
  parts.push('');
  parts.push('## チェックリスト');
  parts.push('');
  parts.push(...renderChecklistSections(checklist));
  return parts.join('\n');
}
