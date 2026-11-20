import { visit } from 'unist-util-visit';

import { createHeadingIdGenerator } from '../lib/headingId';

import type { Heading, Root } from 'mdast';

/**
 * Markdown の見出しに、見出しの文字列から作った id を付ける（採番ルールは src/lib/headingId.ts）。
 *
 * 以前の `h3-2` 形式（レベルごとの出現順）の id も `dataLegacyId` として渡す。
 * FragmentTitle.astro が見出しの中に同じ id の空要素を置くので、Slack などに貼られた古いリンクでも飛べる。
 */
const remarkIndexIdHeader = () => (tree: Root) => {
  const generateId = createHeadingIdGenerator();
  const legacyIndexes: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };

  visit(tree, 'heading', (node: Heading, index, parent) => {
    if (!parent || index === undefined) return;

    const { depth } = node;
    const tag = `h${depth}`;
    const id = generateId(node);
    const legacyId = `${tag}-${legacyIndexes[depth]}`;
    legacyIndexes[depth]++;

    node.data = {
      ...node.data,
      id,
      hProperties: {
        id,
        tag,
        dataLegacyId: legacyId,
      },
    };
  });
};

export default remarkIndexIdHeader;
