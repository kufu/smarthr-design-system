import mdxRenderer from '@astrojs/mdx/server.js';
import reactRenderer from '@astrojs/react/server.js';
import { experimental_AstroContainer } from 'astro/container';
import { parse } from 'node-html-parser';

import type { AstroComponentFactory } from 'astro/runtime/server/index.js';

export type NestedHeading = {
  slug: string;
  text?: string;
  children: NestedHeading[];
};

/**
 * MDXファイル内の見出し (h2, h3) を取得する
 *
 * article.render() の戻りに含まれる `headings` には Markdown 部分の見出ししか含まれていません
 * MDX内に埋め込めまれたコンポーネントによって作成された見出しも含めて取得するためにこの関数を使用します
 *
 * また、レンダリングに実験的な API である experimental_AstroContainer を使用しています
 * 今後の Astro のバージョンアップによる影響を受ける場合があるため、Astro のバージョンアップの際は確認してください
 * https://docs.astro.build/ja/reference/container-reference/
 *
 * @param content Astroコンポーネント
 * @param ignoreH3Nav h3を含めない)
 * @returns depthでネストした見出し情報
 */
export async function getNestedHeadings(content: AstroComponentFactory, ignoreH3Nav = false): Promise<NestedHeading[]> {
  const container = await experimental_AstroContainer.create();

  // NOTE:
  // loadRenderers が import できないため、手動で renderer を追加しています
  // https://github.com/withastro/astro/issues/11697
  container.addServerRenderer({ renderer: reactRenderer, name: '@astrojs/react' });
  container.addServerRenderer({ renderer: mdxRenderer, name: '@astrojs/mdx' });

  // アイランドコンポーネントを処理するために必要
  container.addClientRenderer({
    name: '@astrojs/react',
    entrypoint: '@astrojs/react/client.js',
  });

  const contentHtml = await container.renderToString(content);

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
