import type { ChecklistSection } from './parse-checklist.js';

/** チェックリストの冒頭に出す [must] / [should] / [avoid] の凡例。ガイドラインは規則ではなく基準であることを伝える */
export const CHECKLIST_LEGEND =
  '> ℹ️ 各項目は SmartHR Design System の基準であり、守らなければならない規則ではありません。`[must]` は基本的に合わせる基準、`[should]` は状況に応じて判断する推奨、`[avoid]` は避けることを推奨する使い方です。`[must]` に合わせない場合や `[avoid]` の使い方を採用する場合は、理由を明示してください。';

/**
 * 凡例に続けて、checklist.yaml のカテゴリごとに `### <カテゴリ>` + `- [severity] text` の行を出力する。
 * コンポーネントドキュメントとデザインパターンのチェックリストドキュメントで共有する。
 */
export function renderChecklistSections(checklist: ChecklistSection[]): string[] {
  const parts: string[] = [CHECKLIST_LEGEND, ''];
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
