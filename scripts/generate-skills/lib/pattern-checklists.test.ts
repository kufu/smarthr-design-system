import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { after, describe, it } from 'node:test';
import { collectPatternChecklists, renderPatternChecklist } from './pattern-checklists.js';

const CHECKLIST_YAML = `items:
  # 基本的な考え方 > リード文を適切に設定する
  - severity: must
    text: "リード文を見出し領域に表示する"
    source_section: "基本的な考え方 > リード文を適切に設定する"
    sub_items:
      - "ユーザーが作成したオブジェクトの詳細画面ではリード文は不要"
`;

describe('collectPatternChecklists', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'pattern-checklists-'));
  after(() => fs.rmSync(dir, { recursive: true, force: true }));

  fs.mkdirSync(path.join(dir, 'page-layout'));
  fs.writeFileSync(
    path.join(dir, 'page-layout/index.mdx'),
    "---\ntitle: 'ページレイアウト'\ndescription: 'ページレイアウトのパターン。'\n---\n\n本文\n",
  );
  fs.writeFileSync(path.join(dir, 'page-layout/checklist.yaml'), CHECKLIST_YAML);
  // checklist.yaml のないパターン・1 ファイル構成のパターンは対象外
  fs.mkdirSync(path.join(dir, 'wizard'));
  fs.writeFileSync(path.join(dir, 'wizard/index.mdx'), "---\ntitle: 'ウィザード'\n---\n");
  fs.writeFileSync(path.join(dir, 'empty-data.mdx'), "---\ntitle: '値がない'\n---\n");

  it('checklist.yaml を持つディレクトリ構成のパターンだけを読み込む', () => {
    const result = collectPatternChecklists(dir);
    assert.equal(result.length, 1);
    assert.equal(result[0].slug, 'page-layout');
    assert.equal(result[0].title, 'ページレイアウト');
    assert.equal(result[0].description, 'ページレイアウトのパターン。');
    assert.equal(result[0].checklist[0].category, '基本的な考え方 > リード文を適切に設定する');
  });
});

describe('renderPatternChecklist', () => {
  it('元 mdx へのリンクとカテゴリごとの項目を出力する', () => {
    const output = renderPatternChecklist({
      slug: 'page-layout',
      title: 'ページレイアウト',
      description: '[よくあるテーブル](/products/design-patterns/smarthr-table/)を使うパターン。',
      checklist: [
        {
          category: '基本的な考え方 > リード文を適切に設定する',
          items: [
            {
              severity: 'must',
              text: 'リード文を見出し領域に表示する',
              sub_items: ['ユーザーが作成したオブジェクトの詳細画面ではリード文は不要'],
            },
          ],
        },
      ],
    });
    assert.equal(
      output,
      [
        '# ページレイアウト',
        '',
        'よくあるテーブル（https://smarthr.design/products/design-patterns/smarthr-table/）を使うパターン。',
        '',
        '[patterns/page-layout.mdx](../patterns/page-layout.mdx) から、実装時に守るルールを抜き出したチェックリスト。実装例・図解・DoAndDont の詳細は元の mdx を参照すること。',
        '',
        '## チェックリスト',
        '',
        '### 基本的な考え方 > リード文を適切に設定する',
        '- [must] リード文を見出し領域に表示する',
        '  - ユーザーが作成したオブジェクトの詳細画面ではリード文は不要',
        '',
      ].join('\n'),
    );
  });
});
