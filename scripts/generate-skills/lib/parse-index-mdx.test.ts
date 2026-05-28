import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { isLeadSupersetOfDescription, isSubstantivelyDuplicate } from './parse-index-mdx.js';

const CHECKBOX_DESCRIPTION =
  "input[type='checkbox']要素の代替としてオン/オフや真偽の状態を入力させるコンポーネントです。5個以下の選択肢から複数の値を選択させるとき、即時反映ではなく送信ボタンで確定させるときに使います。";
const CHECKBOX_BODY =
  '`input[type="checkbox"]`要素の代替としてオン/オフや真偽の状態を入力させるコンポーネントです。5個以下の選択肢から複数の値を選択させるときに使います。';

const PAGINATION_DESCRIPTION =
  '「よくあるテーブル」などの一覧のページを切り替えるためのコンポーネントです。大量データを分割表示し、ページ単位で前後移動させるときに使います。';
const PAGINATION_BODY =
  '「[よくあるテーブル](/products/design-patterns/smarthr-table/)」などの一覧のページを切り替えるためのコンポーネントです。大量データを分割表示し、ページ単位で前後移動させるときに使います。使用する場所によって機能を落とせます。';

describe('isSubstantivelyDuplicate', () => {
  it('Checkbox のように本文が frontmatter の略称版の場合は重複とみなす', () => {
    assert.equal(isSubstantivelyDuplicate(CHECKBOX_DESCRIPTION, CHECKBOX_BODY), true);
  });

  it('Table の追記段落は重複とみなさない', () => {
    const description =
      'table要素の代替として表形式でデータを表示するためのコンポーネントです。データを行列で一覧表示するとき、レコードを並べて比較するビューを提示するときに使います。';
    const lead =
      '他のコンポーネントと組み合わせることが多いため、具体的な使用方法は[よくあるテーブル](/products/design-patterns/smarthr-table/)を参照してください。';
    assert.equal(isSubstantivelyDuplicate(description, lead), false);
  });
});

describe('isLeadSupersetOfDescription', () => {
  it('Pagination のように lead が description を包含する場合は true', () => {
    assert.equal(isLeadSupersetOfDescription(PAGINATION_DESCRIPTION, PAGINATION_BODY), true);
  });

  it('Checkbox の略称版は superset ではない', () => {
    assert.equal(isLeadSupersetOfDescription(CHECKBOX_DESCRIPTION, CHECKBOX_BODY), false);
  });
});

describe('isSubstantivelyDuplicate with superset', () => {
  it('Pagination の追記付き本文は重複とみなさない', () => {
    assert.equal(isSubstantivelyDuplicate(PAGINATION_DESCRIPTION, PAGINATION_BODY), false);
  });
});
