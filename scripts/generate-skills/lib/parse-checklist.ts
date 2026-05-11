import fs from 'node:fs';
import yaml from 'js-yaml';

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
 * feature/m2 で導入された _checklist.yaml のフォーマット。
 * - `# カテゴリ名` （Markdown 見出し風コメント）でセクション分割
 * - 各セクション内に YAML のリストアイテム（`- severity: ...`）が並ぶ
 */
export function parseChecklist(checklistPath: string): ChecklistSection[] | null {
  if (!fs.existsSync(checklistPath)) return null;
  return parseChecklistContent(fs.readFileSync(checklistPath, 'utf-8'));
}

export function parseChecklistContent(content: string): ChecklistSection[] {
  const sections: ChecklistSection[] = [];
  const lines = content.split('\n');

  let currentCategory = '';
  let currentSectionLines: string[] = [];

  const flushSection = () => {
    if (!currentCategory || currentSectionLines.length === 0) return;
    const items = parseYamlItems(currentSectionLines.join('\n'));
    if (items.length > 0) {
      sections.push({ category: currentCategory, items });
    }
  };

  for (const line of lines) {
    if (/^# /.test(line)) {
      flushSection();
      currentCategory = line.replace(/^# /, '').trim();
      currentSectionLines = [];
    } else {
      currentSectionLines.push(line);
    }
  }

  flushSection();
  return sections;
}

function parseYamlItems(text: string): ChecklistItem[] {
  const trimmed = text.trim();
  if (!trimmed) return [];

  try {
    const parsed = yaml.load(trimmed) as ChecklistItem[] | null;
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((item): item is ChecklistItem => !!item && !!item.severity && !!item.text)
      .map((item) => ({
        severity: item.severity,
        text: item.text,
        source_section: item.source_section,
        sub_items: item.sub_items,
        layer2_candidate: item.layer2_candidate,
        note: item.note,
      }));
  } catch {
    return [];
  }
}
