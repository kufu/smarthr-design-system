import GithubSlugger, { slug } from 'github-slugger';
import { toString } from 'mdast-util-to-string';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';
import { visit } from 'unist-util-visit';

import type { Heading, Root } from 'mdast';

/**
 * 見出しの id 採番ルール。remark-index-id-header（記事のレンダリング）・Checklist・アンカーリンクのチェックで共有する。
 *
 * 見出しの文字列から GitHub と同じ規則（github-slugger）で id を作る。
 * - 英字は小文字になり、空白は `-` になる。日本語の文字はそのまま残る
 * - 記号（括弧・句読点・かぎ括弧など）は取り除かれる（例: 「無効（disabled）」→ `無効disabled`）
 * - 同じページに同じ文字列の見出しがあれば、2 つ目以降に `-1`, `-2`... が付く
 * - 記号だけの見出しなど、文字列から id を作れない場合は `section` を元にする
 *
 * 以前は `h3-2` のような「レベルごとの出現順」で採番していたため、見出しを足したり消したりすると
 * 別ページからのアンカーリンクが黙って別の見出しを指すようになっていた。
 */
export const createHeadingIdGenerator = () => {
  const slugger = new GithubSlugger();
  return (heading: Heading): string => {
    const text = getHeadingText(heading);
    return slugger.slug(slug(text) === '' ? 'section' : text);
  };
};

/** 見出しのプレーンテキスト（inlineCode・装飾・リンク配下も連結。画像の alt は含めない） */
export const getHeadingText = (heading: Heading): string => toString(heading, { includeImageAlt: false });

/**
 * MDX ソースを記事のレンダリング時と同じ構文（MDX + GFM）で mdast にする。
 *
 * frontmatter は Astro が MDX のコンパイル前に取り除くので、ここでも取り除く。
 * 行番号・文字オフセットがずれないよう、frontmatter は同じ長さの空白（空行）に置き換える。
 */
export const parseArticle = (source: string, { mdx = true }: { mdx?: boolean } = {}): Root => {
  const content = source.replace(/^---\r?\n[\s\S]*?\r?\n---(?=\r?\n|$)/, (frontmatter) => frontmatter.replace(/[^\n]/g, ' '));
  const processor = mdx ? remark().use(remarkMdx).use(remarkGfm) : remark().use(remarkGfm);
  return processor.runSync(processor.parse(content)) as Root;
};

/** MDX ソース中の Markdown 見出しに付く id を、出現順に返す */
export const getHeadingIds = (tree: Root): Array<{ id: string; heading: Heading }> => {
  const generateId = createHeadingIdGenerator();
  const result: Array<{ id: string; heading: Heading }> = [];
  visit(tree, 'heading', (heading: Heading) => {
    result.push({ id: generateId(heading), heading });
  });
  return result;
};
