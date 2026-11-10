import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { getSectionAnchorMap } from './getSectionAnchorMap';

describe('getSectionAnchorMap', () => {
  it('frontmatter を見出しとして数えず、本文の最初の h2 を h2-0 にする', () => {
    const markdown = [
      '---',
      "title: 'Button'",
      "description: '説明'",
      '---',
      '',
      "import Foo from './Foo.astro'",
      '',
      '## 使用上の注意',
      '',
      '### type="button" について',
      '',
      '## 種類',
      '',
      '### Primary',
      '',
      '## ライティング',
    ].join('\n');

    const map = getSectionAnchorMap(markdown);

    assert.equal(map.get('使用上の注意'), 'h2-0');
    assert.equal(map.get('使用上の注意 > type="button" について'), 'h3-0');
    assert.equal(map.get('種類'), 'h2-1');
    assert.equal(map.get('種類 > Primary'), 'h3-1');
    assert.equal(map.get('ライティング'), 'h2-2');
    assert.equal(map.size, 5);
  });

  it('frontmatter がない場合もそのまま採番する', () => {
    const map = getSectionAnchorMap(['## A', '', '### B', '', '## C'].join('\n'));

    assert.deepEqual(
      [...map.entries()],
      [
        ['A', 'h2-0'],
        ['A > B', 'h3-0'],
        ['C', 'h2-1'],
      ],
    );
  });
});
