import type { Heading, ParagraphData } from 'mdast';
import type { Node } from 'unist';
import { type Visitor, visit } from 'unist-util-visit';

const rematkIndexIdHeader = () => {
  return (tree: Node) => {
    const indexes = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
    };

    const visitor: Visitor<Heading> = (node, index, parent) => {
      if (!parent || index === undefined) {
        return;
      }

      const { depth } = node;
      if (depth > 6) return;

      const tag = `h${depth}`;

      // ex) `h2-0`,`h2-1`...
      const id = `${tag}-${indexes[depth]}`;

      node.data = {
        ...node.data,
        id,
        htmlAttributes: {
          id,
        },
        hProperties: {
          id,
          tag,
        },
      } as ParagraphData;

      indexes[depth]++;
    };

    visit(tree, 'heading', visitor);
  };
};

export default rematkIndexIdHeader;
