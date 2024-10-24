import reactRenderer from '@astrojs/react/server.js';
import { experimental_AstroContainer } from 'astro/container';
import mdxRenderer from 'astro/jsx/server.js';
import { parse } from 'node-html-parser';

import type { MarkdownHeading } from 'astro';
import type { AstroComponentFactory } from 'astro/runtime/server/index.js';

/**
 * MDXファイル内の見出し (h2, h3) 情報を取得する
 *
 * article.render() の戻りに含まれる `headings` には Markdown 部分の見出し情報しか含まれていません
 * MDX内に埋め込めまれたコンポーネントによって作成された見出し情報も含めて取得するためにこの関数を使用します
 *
 * また、レンダリングに実験的な API である experimental_AstroContainer を使用しています
 * 今後の Astro のバージョンアップによる影響を受ける場合があるため、Astro のバージョンアップの際は確認してください
 * https://docs.astro.build/ja/reference/container-reference/
 *
 * @param content Astroコンポーネント
 * @param ignoreH3Nav h3タグを含めない)
 * @returns 見出し情報
 */
export async function getHeadings(content: AstroComponentFactory, ignoreH3Nav = false) {
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

  // データを整形
  const headings = headingTags.map((heading, index): MarkdownHeading => {
    const depth = heading.tagName === 'H2' ? 2 : 3;
    const slug = heading.getAttribute('id') ?? `${heading.tagName}-c${index}`;
    const text = heading.textContent;

    return { depth, slug, text };
  });

  return headings;
}
