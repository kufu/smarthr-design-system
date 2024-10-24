import { type Visitor, visit } from 'unist-util-visit';

import type { Code, Paragraph } from 'mdast';
import type { Node } from 'unist';

/**
 * ```tsx editable のようなコードブロックから、コードと言語・メタ情報を取り出すプラグイン
 * 参考: https://blog.mono0x.net/2023/07/10/astro-syntax-highlight-with-title/
 */
const remarkCodeBlock = () => (tree: Node) => {
  const visitor: Visitor<Code> = (node, index, parent) => {
    if (!parent || index === undefined) {
      return;
    }

    const { lang, meta, value } = node;

    parent.children.splice(index, 1, {
      type: 'paragraph',
      data: {
        hName: 'code-block',
        hProperties: {
          code: value,
          ...(lang ? { language: lang } : {}),
          ...(meta ? { meta } : {}),
        },
      },
      children: [],
    } as Paragraph);
  };

  visit(tree, 'code', visitor);
};

export default remarkCodeBlock;
