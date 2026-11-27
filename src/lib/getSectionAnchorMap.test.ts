import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { getSectionAnchorMap } from './getSectionAnchorMap';

describe('getSectionAnchorMap', () => {
  it('frontmatter を見出しとして数えず、見出しの文字列から id を作る', () => {
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

    assert.equal(map.get('使用上の注意'), '使用上の注意');
    assert.equal(map.get('使用上の注意 > type="button" について'), 'typebutton-について');
    assert.equal(map.get('種類'), '種類');
    assert.equal(map.get('種類 > Primary'), 'primary');
    assert.equal(map.get('ライティング'), 'ライティング');
    assert.equal(map.size, 5);
  });

  it('frontmatter がない場合もそのまま id を作る', () => {
    const map = getSectionAnchorMap(['## A', '', '### B', '', '## C'].join('\n'));

    assert.deepEqual(
      [...map.entries()],
      [
        ['A', 'a'],
        ['A > B', 'b'],
        ['C', 'c'],
      ],
    );
  });
});
