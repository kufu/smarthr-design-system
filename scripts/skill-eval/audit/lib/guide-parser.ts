import fs from 'node:fs';

/** ガイド doc の Props テーブル 1 行 */
export type PropRow = {
  name: string;
  type: string;
  default: string;
  required: boolean;
  description: string;
};

export type GuideDoc = {
  dirName: string; // ファイル名（.md 除く）
  filePath: string;
  title: string | null; // `# <title>`
  hasDeprecationBanner: boolean;
  deprecationBannerMessage: string;
  description: string; // タイトル/バナー〜`## import` の本文
  importNames: string[]; // import { ... } from 'smarthr-ui'
  /** ### 見出し（複数コンポーネント時）または dirName 単一キー → Props 行 */
  propsByComponent: Map<string, PropRow[]>;
  /** 「（固有 Props なし）」と記載されたコンポーネント */
  noOwnProps: Set<string>;
  sectionTitles: string[]; // `## X` の並び
  checklistContent: string; // `## 使い方チェックリスト` 直下のテキスト
  rawLines: string[];
};

/** escapeTableCell の逆（`\|` → `|`） */
function unescapeCell(s: string): string {
  return s.replace(/\\\|/g, '|').trim();
}

function splitTableRow(line: string): string[] {
  // 先頭末尾の | を除いて、エスケープされていない | で分割
  const inner = line.trim().replace(/^\|/, '').replace(/\|$/, '');
  const cells: string[] = [];
  let buf = '';
  for (let i = 0; i < inner.length; i++) {
    const ch = inner[i];
    if (ch === '\\' && inner[i + 1] === '|') {
      buf += '\\|';
      i++;
      continue;
    }
    if (ch === '|') {
      cells.push(buf);
      buf = '';
      continue;
    }
    buf += ch;
  }
  cells.push(buf);
  return cells.map((c) => c.trim());
}

export function parseGuide(filePath: string): GuideDoc {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const lines = raw.split('\n');
  const dirName = filePath.replace(/.*\//, '').replace(/\.md$/, '');

  const doc: GuideDoc = {
    dirName,
    filePath,
    title: null,
    hasDeprecationBanner: false,
    deprecationBannerMessage: '',
    description: '',
    importNames: [],
    propsByComponent: new Map(),
    noOwnProps: new Set(),
    sectionTitles: [],
    checklistContent: '',
    rawLines: lines,
  };

  // タイトル
  const titleLine = lines.find((l) => l.startsWith('# '));
  if (titleLine) doc.title = titleLine.slice(2).trim();

  // 非推奨バナー
  const bannerLine = lines.find((l) => l.startsWith('> ⚠️'));
  if (bannerLine) {
    doc.hasDeprecationBanner = true;
    doc.deprecationBannerMessage = bannerLine.replace(/^>\s*⚠️\s*\*\*非推奨\*\*:?\s*/, '').trim();
  }

  // セクション境界のインデックスを収集
  const sectionIdx: Array<{ title: string; line: number }> = [];
  lines.forEach((l, i) => {
    if (l.startsWith('## ')) sectionIdx.push({ title: l.slice(3).trim(), line: i });
  });
  doc.sectionTitles = sectionIdx.map((s) => s.title);

  const sectionRange = (title: string): [number, number] | null => {
    const idx = sectionIdx.findIndex((s) => s.title === title);
    if (idx === -1) return null;
    const start = sectionIdx[idx].line;
    const end = idx + 1 < sectionIdx.length ? sectionIdx[idx + 1].line : lines.length;
    return [start, end];
  };

  // description: タイトル行の次 〜 最初の `## ` まで（バナー行は除外）
  const titleIdx = lines.findIndex((l) => l.startsWith('# '));
  const firstSection = sectionIdx.length ? sectionIdx[0].line : lines.length;
  if (titleIdx !== -1) {
    const descLines = lines
      .slice(titleIdx + 1, firstSection)
      .filter((l) => !l.startsWith('> ⚠️'))
      .map((l) => l.trim())
      .filter((l) => l.length > 0);
    doc.description = descLines.join(' ').trim();
  }

  // import
  const importRange = sectionRange('import');
  if (importRange) {
    const block = lines.slice(importRange[0], importRange[1]).join('\n');
    const m = block.match(/import\s*\{([^}]*)\}\s*from\s*['"]smarthr-ui['"]/);
    if (m) {
      doc.importNames = m[1]
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    }
  }

  // Props
  const propsRange = sectionRange('Props');
  if (propsRange) {
    const [start, end] = propsRange;
    let currentKey = dirName; // ### が無ければ dirName 単一
    let i = start + 1;
    while (i < end) {
      const line = lines[i];
      const trimmed = line.trim();
      if (trimmed.startsWith('### ')) {
        currentKey = trimmed.slice(4).trim();
        i++;
        continue;
      }
      if (trimmed.startsWith('（固有 Props なし')) {
        doc.noOwnProps.add(currentKey);
        if (!doc.propsByComponent.has(currentKey)) doc.propsByComponent.set(currentKey, []);
        i++;
        continue;
      }
      // テーブルヘッダ検出
      if (trimmed.startsWith('| Props 名')) {
        i += 2; // ヘッダ + 区切り行をスキップ
        const rows: PropRow[] = [];
        while (i < end && lines[i].trim().startsWith('|')) {
          const cells = splitTableRow(lines[i]);
          if (cells.length >= 5) {
            rows.push({
              name: unescapeCell(cells[0]),
              type: unescapeCell(cells[1]),
              default: unescapeCell(cells[2]),
              required: unescapeCell(cells[3]) === '✓',
              description: unescapeCell(cells[4]),
            });
          }
          i++;
        }
        const existing = doc.propsByComponent.get(currentKey) ?? [];
        doc.propsByComponent.set(currentKey, existing.concat(rows));
        continue;
      }
      i++;
    }
  }

  // 使い方チェックリスト
  const checklistRange = sectionRange('使い方チェックリスト');
  if (checklistRange) {
    doc.checklistContent = lines
      .slice(checklistRange[0] + 1, checklistRange[1])
      .join('\n')
      .trim();
  }

  return doc;
}
