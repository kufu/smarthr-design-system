import fs from 'node:fs';
import { load } from 'js-yaml';

export type Severity = 'must' | 'should' | 'avoid';

export type ChecklistItem = {
  severity: Severity;
  text: string;
  source_section?: string;
  sub_items?: string[];
  layer2_candidate?: string | null;
  note?: string;
};

export type ChecklistSection = {
  category: string;
  items: ChecklistItem[];
};

/**
 * checklist.yaml のフォーマット（Astro Content Layer の checklists collection と整合）:
 *
 *   items:
 *     # カテゴリ名
 *     - severity: ...
 *       text: ...
 *     - severity: ...
 *       text: ...
 *
 *     # 別のカテゴリ名
 *     - severity: ...
 *       text: ...
 *
 * - 構造データは `items:` 配列に集約（top-level array では Content Layer entry に乗らないため）
 * - カテゴリ区切りは YAML コメント。YAML 構文上は無視されるため、行ベースで別途スキャンしてグルーピングする
 */
export function parseChecklist(checklistPath: string): ChecklistSection[] | null {
  if (!fs.existsSync(checklistPath)) return null;
  return parseChecklistContent(fs.readFileSync(checklistPath, 'utf-8'));
}

export function parseChecklistContent(content: string): ChecklistSection[] {
  let allItems: ChecklistItem[] = [];
  try {
    const parsed = (load(content) ?? {}) as { items?: unknown };
    if (Array.isArray(parsed.items)) {
      allItems = parsed.items as ChecklistItem[];
    }
  } catch {
    return [];
  }
  if (allItems.length === 0) return [];

  // 行ベースでカテゴリ（`# カテゴリ名` コメント）と「次の - severity: 行」を紐付ける。
  // YAML パース結果ではコメントが失われるため、配列内の順序とこのスキャン順序が一致することを利用する。
  const lines = content.split('\n');
  let currentCategory = '';
  const itemCategories: string[] = [];
  let inItemsBlock = false;
  for (const line of lines) {
    if (/^\s*items\s*:/.test(line)) {
      inItemsBlock = true;
      continue;
    }
    if (!inItemsBlock) continue;
    const commentMatch = line.match(/^\s*#\s*(.+?)\s*$/);
    if (commentMatch) {
      currentCategory = commentMatch[1];
      continue;
    }
    if (/^\s*-\s*severity\s*:/.test(line)) {
      itemCategories.push(currentCategory);
    }
  }

  const sectionMap = new Map<string, ChecklistItem[]>();
  const sectionOrder: string[] = [];
  for (let i = 0; i < allItems.length; i++) {
    const item = allItems[i];
    if (!item || !item.severity || !item.text) continue;
    const category = itemCategories[i] ?? '';
    if (!category) continue; // カテゴリなしのアイテムは生成対象外（旧仕様と整合）
    if (!sectionMap.has(category)) {
      sectionMap.set(category, []);
      sectionOrder.push(category);
    }
    sectionMap.get(category)!.push({
      severity: item.severity,
      text: item.text,
      source_section: item.source_section,
      sub_items: item.sub_items,
      layer2_candidate: item.layer2_candidate,
      note: item.note,
    });
  }

  return sectionOrder.map((category) => ({
    category,
    items: sectionMap.get(category)!,
  }));
}
