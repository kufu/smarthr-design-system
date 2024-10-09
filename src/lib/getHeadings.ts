import reactRenderer from '@astrojs/react/server.js';
import type { MarkdownHeading } from 'astro';
import { experimental_AstroContainer } from 'astro/container';
import mdxRenderer from 'astro/jsx/server.js';
import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
import { parse } from 'node-html-parser';

/**
 * コンポーネント内の h2, h3 タグの情報を取得する
 *
 * 主にMDXファイル内の見出し情報を取得するために使用します
 * article.render() の戻りに含まれる `headings` には Markdown 部分の見出し情報しか含まれていないため、
 * コンポーネント部分も含めて取得するためにこの関数を使用します
 *
 * また、コンポーネントのレンダリングに experimental_AstroContainer を使用しているため、
 * 今後の Astro のバージョンアップによる影響を受ける場合があります
 * バージョンアップの際は影響を受けないか確認してください
 *
 * @param content Astroコンポーネント
 * @returns 見出し情報
 */
export async function getHeadings(content: AstroComponentFactory) {
  const container = await experimental_AstroContainer.create();

  // NOTE:
  // loadRenderers が import できないため、手動で renderer を追加しています
  // https://github.com/withastro/astro/issues/11697
  container.addServerRenderer({ renderer: reactRenderer, name: '@astrojs/react' });
  container.addServerRenderer({ renderer: mdxRenderer, name: '@astrojs/mdx' });

  // client:onlyを処理するために必要
  container.addClientRenderer({
    name: '@astrojs/react',
    entrypoint: '@astrojs/react/client.js',
  });

  const contentHtml = await container.renderToString(content);

  const doc = parse(contentHtml);
  const headingTags = doc.querySelectorAll('h2, h3');

  const headings = headingTags.map((heading, index): MarkdownHeading => {
    const depth = heading.tagName === 'H2' ? 2 : 3;
    const slug = heading.getAttribute('id') ?? `${heading.tagName}-c${index}`;
    const text = heading.textContent;

    return { depth, slug, text };
  });

  return headings;
}
