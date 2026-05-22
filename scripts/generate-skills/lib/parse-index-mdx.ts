import fs from 'node:fs';
import matter from 'gray-matter';

export type RelatedComponentEntry = {
  name: string;
  /**
   * 子 mdx の description を上書きしたい場合に指定する。
   * 子に独立 index.mdx があるケース (例: ActionDialog) では子 mdx の description が
   * 優先採用されるため省略可。子 dir がないケース (例: Th, Td) では必須。
   */
  description?: string;
};

export type IndexMdxInfo = {
  /** mdx frontmatter `title` (PascalCase コンポーネント名。例: "ActionDialog") */
  title: string;
  description: string;
  leadParagraph: string;
  deprecated: boolean;
  deprecatedMessage: string;
  /**
   * 親 mdx に紐づくサブコンポーネント（派生継承・内部部品・カテゴリメンバーを含む）。
   * 派生継承の例: `ControlledActionDialog`（`ActionDialog` を継承）
   * 内部部品の例: `Th`、`Td`（`Table` の構成要素）
   * カテゴリメンバーの例: `ActionDialog`、`FormDialog`（`Dialog` 配下）
   */
  relatedComponents: RelatedComponentEntry[];
};

export function parseIndexMdx(indexMdxPath: string): IndexMdxInfo | null {
  if (!fs.existsSync(indexMdxPath)) return null;

  const content = fs.readFileSync(indexMdxPath, 'utf-8');

  let frontmatterTitle = '';
  let frontmatterDescription = '';
  let deprecated = false;
  let deprecatedMessage = '';
  let relatedComponents: RelatedComponentEntry[] = [];
  let bodyContent = content;

  try {
    const parsed = matter(content);
    frontmatterTitle = (parsed.data.title as string) ?? '';
    frontmatterDescription = (parsed.data.description as string) ?? '';
    deprecated = (parsed.data.deprecated as boolean) ?? false;
    deprecatedMessage = (parsed.data.deprecatedMessage as string) ?? '';
    relatedComponents = normalizeRelatedComponents(parsed.data.relatedComponents);
    bodyContent = parsed.content;
  } catch {
    // Fallback: no frontmatter
  }

  const leadParagraph = extractLeadParagraph(bodyContent, frontmatterDescription);

  return {
    title: frontmatterTitle,
    description: frontmatterDescription,
    leadParagraph,
    deprecated,
    deprecatedMessage,
    relatedComponents,
  };
}

function normalizeRelatedComponents(value: unknown): RelatedComponentEntry[] {
  if (!Array.isArray(value)) return [];
  const result: RelatedComponentEntry[] = [];
  for (const entry of value) {
    if (!entry || typeof entry !== 'object') continue;
    const name = (entry as { name?: unknown }).name;
    const description = (entry as { description?: unknown }).description;
    if (typeof name !== 'string') continue;
    result.push({
      name,
      ...(typeof description === 'string' && description.length > 0 ? { description } : {}),
    });
  }
  return result;
}

function extractLeadParagraph(body: string, description: string): string {
  const lines = body.split('\n');
  const paragraphLines: string[] = [];
  let started = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith('import ')) continue;
    if (trimmed.startsWith('<') && !trimmed.startsWith('<!--')) continue;
    if (trimmed.startsWith('```')) continue;
    if (trimmed.startsWith('##')) break;
    if (trimmed.startsWith('# ')) continue;

    if (trimmed === '') {
      if (started && paragraphLines.length > 0) break;
      continue;
    }

    if (trimmed === description) {
      started = true;
      continue;
    }

    started = true;
    paragraphLines.push(trimmed);
  }

  return paragraphLines.join(' ');
}
