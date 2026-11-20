import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { getHeadingIds, parseArticle } from './headingId';

const ids = (source: string) => getHeadingIds(parseArticle(source)).map(({ id }) => id);

describe('getHeadingIds', () => {
  it('見出しの文字列から id を作る（英字は小文字、空白は -、記号は除去、日本語は残す）', () => {
    assert.deepEqual(ids(['## 使用上の注意', '', '### Primary Button', '', '### 無効（disabled）'].join('\n')), [
      '使用上の注意',
      'primary-button',
      '無効disabled',
    ]);
  });

  it('inlineCode・装飾・リンクの中の文字列も id に含める', () => {
    assert.deepEqual(ids('## `type="button"` と **強調** と [リンク](/foo/)'), ['typebutton-と-強調-と-リンク']);
  });

  it('同じ文字列の見出しには -1, -2 を付けて区別する', () => {
    assert.deepEqual(ids(['## 例', '', '### 例', '', '## 例'].join('\n')), ['例', '例-1', '例-2']);
  });

  it('文字列から id を作れない見出しは section を元にする', () => {
    assert.deepEqual(ids(['## ！？', '', '## ・'].join('\n')), ['section', 'section-1']);
  });

  it('frontmatter と import 文を見出しとして扱わない', () => {
    assert.deepEqual(ids(['---', "title: 'Button'", '---', '', "import Foo from './Foo.astro'", '', '## 種類'].join('\n')), [
      '種類',
    ]);
  });

  it('frontmatter を取り除いても行番号・文字オフセットを保つ', () => {
    const source = ['---', "title: 'Button'", '---', '', '## 種類'].join('\n');
    const [{ heading }] = getHeadingIds(parseArticle(source));
    assert.equal(heading.position?.start.line, 5);
    assert.equal(heading.position?.start.offset, source.indexOf('## 種類'));
  });
});
