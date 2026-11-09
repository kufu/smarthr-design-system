import { remark } from 'remark';
import { visit } from 'unist-util-visit';

import type { Heading, PhrasingContent } from 'mdast';

/**
 * 見出しの祖先パス（' > ' 連結）から、本文に付与される id（例: 'h3-1'）への対応表を作る。
 *
 * id 採番は remark-index-id-header.ts と同一規則（レベルごとに 0 始まりの連番・出現順・depth>6 は除外）。
 * raw markdown から算出するため、レンダリング時の typographic 変換（smartypants による " → “” 等）の影響を受けず、
 * checklist.yaml の source_section（同じソース由来のテキスト）とそのまま突合できる。
 */
export const getSectionAnchorMap = (markdown: string): Map<string, string> => {
  const tree = remark().parse(markdown);
  const indexes: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
  const stack: Array<{ depth: number; text: string }> = [];
  const map = new Map<string, string>();

  visit(tree, 'heading', (node: Heading) => {
    const { depth } = node;
    if (depth > 6) return;

    const id = `h${depth}-${indexes[depth]}`;
    indexes[depth] += 1;

    const text = normalizeSectionText(extractText(node.children));
    // 祖先スタックを現在の深さまで巻き戻してから積む
    while (stack.length > 0 && stack[stack.length - 1].depth >= depth) stack.pop();
    stack.push({ depth, text });

    map.set(stack.map((s) => s.text).join(' > '), id);
  });

  return map;
};

/** source_section と突合するためのテキスト正規化（バッククォート除去・空白圧縮） */
export const normalizeSectionText = (value: string): string => value.replace(/`/g, '').replace(/\s+/g, ' ').trim();

/**
 * source_section 末尾の出典注記 ` (via xxx.mdx)` を除去する。
 * import される sub-mdx/tsx 由来項目に生成側が付ける出典メタで、人間向け表示・id 突合のどちらにも不要。
 */
export const stripSectionNote = (value: string): string => value.replace(/\s*\(via[^)]*\)\s*$/, '').trim();

// mdast の phrasing ノードからプレーンテキストを取り出す（inlineCode・装飾・リンク配下も連結）
const extractText = (nodes: PhrasingContent[]): string =>
  nodes
    .map((node) => {
      if (node.type === 'text' || node.type === 'inlineCode') return node.value;
      if ('children' in node) return extractText(node.children as PhrasingContent[]);
      return '';
    })
    .join('');
