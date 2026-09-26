import { parse } from 'node-html-parser';

export type NestedHeading = {
  slug: string;
  text?: string;
  children: NestedHeading[];
};

/**
 * レンダリング済みの記事HTMLから見出し (h2, h3) を取得する
 *
 * article.render() の戻りに含まれる `headings` には Markdown 部分の見出ししか含まれていません
 * MDX内に埋め込めまれたコンポーネントによって作成された見出しも含めて取得するためにこの関数を使用します
 *
 * 記事本文は ArticleBody で `Astro.slots.render()` により一度だけレンダリングし、
 * その結果のHTMLをこの関数に渡します（レンダリング結果はそのまま本文としても出力します）
 *
 * @param options.contentHtml レンダリング済みの記事HTML
 * @param options.ignoreH3Nav h3を含めない
 * @returns depthでネストした見出し情報
 */
export function getNestedHeadings({
  contentHtml,
  ignoreH3Nav = false,
}: {
  contentHtml: string;
  ignoreH3Nav?: boolean;
}): NestedHeading[] {
  // HTML をパースしてh2, h3タグを取得
  const doc = parse(contentHtml);
  const headingTags = doc.querySelectorAll(ignoreH3Nav ? 'h2' : 'h2, h3');

  // ネストした形に整形
  const nestedHeadings: NestedHeading[] = [];

  headingTags.forEach((heading, index) => {
    const depth = heading.tagName === 'H2' ? 2 : 3;
    const slug = heading.getAttribute('id') ?? `${heading.tagName.toLowerCase()}-c${index}`;
    const text = heading.textContent;

    if (depth === 2) {
      nestedHeadings.push({
        slug,
        text,
        children: [],
      });
      return;
    }

    if (depth === 3 && !ignoreH3Nav) {
      // 親となる階層がない場合、仮の親となるアイテムをpushする
      if (!nestedHeadings[nestedHeadings.length - 1]) {
        nestedHeadings.push({ slug: '', children: [] });
      }

      nestedHeadings[nestedHeadings.length - 1].children.push({
        slug,
        text,
        children: [],
      });
    }
  });

  return nestedHeadings;
}
