import fs from 'node:fs';
import matter from 'gray-matter';

export type IndexMdxInfo = {
  description: string;
  leadParagraph: string;
};

export function parseIndexMdx(indexMdxPath: string): IndexMdxInfo | null {
  if (!fs.existsSync(indexMdxPath)) return null;

  const content = fs.readFileSync(indexMdxPath, 'utf-8');

  let frontmatterDescription = '';
  let bodyContent = content;

  try {
    const parsed = matter(content);
    frontmatterDescription = (parsed.data.description as string) ?? '';
    bodyContent = parsed.content;
  } catch {
    // Fallback: no frontmatter
  }

  const leadParagraph = extractLeadParagraph(bodyContent, frontmatterDescription);

  return { description: frontmatterDescription, leadParagraph };
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
