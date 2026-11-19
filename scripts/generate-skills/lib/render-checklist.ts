import type { ChecklistSection } from './parse-checklist.js';

/**
 * checklist.yaml のカテゴリごとに `### <カテゴリ>` + `- [severity] text` の行を出力する。
 * コンポーネントドキュメントとデザインパターンのチェックリストドキュメントで共有する。
 */
export function renderChecklistSections(checklist: ChecklistSection[]): string[] {
  const parts: string[] = [];
  for (const section of checklist) {
    parts.push(`### ${section.category}`);
    for (const item of section.items) {
      parts.push(`- [${item.severity}] ${item.text}`);
      if (item.sub_items && item.sub_items.length > 0) {
        for (const sub of item.sub_items) {
          parts.push(`  - ${sub}`);
        }
      }
    }
    parts.push('');
  }
  return parts;
}
