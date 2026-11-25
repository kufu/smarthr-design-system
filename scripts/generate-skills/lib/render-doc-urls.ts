import fs from 'node:fs';
import path from 'node:path';

const SITE_ORIGIN = 'https://smarthr.design';

export type DocUrlEntry = {
  /** スキル内のガイドのパス（例: components/Button.md, patterns/smarthr-table.mdx） */
  guide: string;
  /** smarthr.design の URL */
  url: string;
};

/**
 * `src/content/articles/` からの相対パス（ディレクトリかファイル）をサイトの URL にする。
 * サイトの URL は記事のパスと 1 対 1 に対応する（`[...slug].astro` が記事の id をそのままパスにする）。
 * 例: "products/components/layout/stack" → "https://smarthr.design/products/components/layout/stack/"
 *     "products/design-patterns/smarthr-table/index.mdx" → "https://smarthr.design/products/design-patterns/smarthr-table/"
 */
export function articlePathToUrl(articlePath: string): string {
  const slug = articlePath
    .split(path.sep)
    .join('/')
    .replace(/\/index\.mdx?$/, '')
    .replace(/\.mdx?$/, '')
    .replace(/^\/+|\/+$/g, '');
  return `${SITE_ORIGIN}/${slug}/`;
}

/**
 * design-pattern-guidelines の patterns/*.mdx（記事へのシンボリックリンク）から URL の対応を集める。
 * リンクでないファイルや、記事の外を指すリンクは対象にしない。
 */
export function collectPatternDocUrls(patternsDir: string, articlesDir: string): DocUrlEntry[] {
  if (!fs.existsSync(patternsDir)) return [];
  const entries: DocUrlEntry[] = [];
  for (const entry of fs.readdirSync(patternsDir, { withFileTypes: true })) {
    if (!entry.isSymbolicLink() || !entry.name.endsWith('.mdx')) continue;
    const linkPath = path.join(patternsDir, entry.name);
    const target = path.resolve(patternsDir, fs.readlinkSync(linkPath));
    const rel = path.relative(articlesDir, target);
    if (rel.startsWith('..') || path.isAbsolute(rel)) continue;
    entries.push({ guide: `patterns/${entry.name}`, url: articlePathToUrl(rel) });
  }
  return entries;
}

/**
 * design-review スキルが指摘の根拠に公式ドキュメントの URL を付けるための対応表を描く。
 * 人間に見せる URL なので、ガイド本体（AI が読むもの）には入れず、この表にだけ持つ。
 */
export function renderDocUrls(entries: DocUrlEntry[]): string {
  const sorted = [...entries].sort((a, b) => a.guide.localeCompare(b.guide));
  const parts: string[] = [];
  parts.push('# ガイド → 公式ドキュメントの URL');
  parts.push('');
  parts.push(
    'design-review の一覧で、指摘の根拠（`source`）に公式ドキュメントの URL を付けるための対応表です。`scripts/generate-skills` が生成するので、直接編集しないでください。',
  );
  parts.push('');
  parts.push('- URL は人間（レビュー結果を読むエンジニア）向けです。内容はガイドと同じなので、URL を開いて読まないでください。');
  parts.push('- 表全体を読まず、`source` のパスで grep して該当の行だけを引いてください。');
  parts.push('- 表に無いガイドは URL を付けません（推測で URL を組み立てないでください）。');
  parts.push('');
  parts.push('| ガイド | URL |');
  parts.push('|---|---|');
  for (const { guide, url } of sorted) parts.push(`| ${guide} | ${url} |`);
  parts.push('');
  return parts.join('\n');
}
