import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { formatSkillBodyText } from './format-skill-body-text.js';

describe('formatSkillBodyText', () => {
  it('インラインコードを除去する', () => {
    assert.equal(formatSkillBodyText('`table`要素の代替'), 'table要素の代替');
  });

  it('コンポーネントリンクはラベルのみにする', () => {
    assert.equal(formatSkillBodyText('[Table](/products/components/table/)'), 'Table');
  });

  it('デザインパターン等の相対リンクはラベル + 絶対URLにする', () => {
    assert.equal(
      formatSkillBodyText('[よくあるテーブル](/products/design-patterns/smarthr-table/)'),
      'よくあるテーブル（https://smarthr.design/products/design-patterns/smarthr-table/）',
    );
  });

  it('絶対URLのリンクはラベル + URLにする', () => {
    assert.equal(
      formatSkillBodyText('[ガイド](https://smarthr.design/accessibility/alternative-text/)'),
      'ガイド（https://smarthr.design/accessibility/alternative-text/）',
    );
  });

  it('文中のリンクを変換する', () => {
    assert.equal(
      formatSkillBodyText('具体的な使用方法は[よくあるテーブル](/products/design-patterns/smarthr-table/)を参照してください。'),
      '具体的な使用方法はよくあるテーブル（https://smarthr.design/products/design-patterns/smarthr-table/）を参照してください。',
    );
  });

  it('属性値や type セレクタの引用符は保持する', () => {
    assert.equal(
      formatSkillBodyText('input[type="text"]や`input[type=\'number\']`の代替'),
      'input[type="text"]やinput[type=\'number\']の代替',
    );
    assert.equal(
      formatSkillBodyText('alt="FaMagnifyingGlassIcon 虫眼鏡のアイコン"'),
      'alt="FaMagnifyingGlassIcon 虫眼鏡のアイコン"',
    );
  });
});
