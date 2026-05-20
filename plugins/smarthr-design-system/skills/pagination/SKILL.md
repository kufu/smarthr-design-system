---
name: pagination
description: "「よくあるテーブル」などの一覧のページを切り替えるためのコンポーネントです。大量データを分割表示し、ページ単位で前後移動させるときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

「よくあるテーブル」などの一覧のページを切り替えるためのコンポーネントです。大量データを分割表示し、ページ単位で前後移動させるときに使います。

「[よくあるテーブル](/products/design-patterns/smarthr-table/)」などの一覧のページを切り替えるためのコンポーネントです。大量データを分割表示し、ページ単位で前後移動させるときに使います。使用する場所によって機能を落とせます。

## import

```ts
import { Pagination } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| total | number | - | ✓ | 全ページ数 |
| current | number | - | ✓ | 現在のページ |
| padding | number | - | - | 現在のページの前後に表示するページ番号のボタンの数 |
| withoutNumbers | boolean | - | - | `true` のとき、ページ番号のボタンを表示しない |
| onClick | ((pageNumber: number, e: MouseEvent<HTMLElement, MouseEvent>) => void) \| ((href: string, e: MouseEvent<HTMLElement, MouseEvent>) => void) | - | - | ボタンを押下したときに発火するコールバック関数 リンクを押下したときに発火するコールバック関数 |
| hrefTemplate | (pageNumber: number) => string | - | - | href属性生成用関数。設定した場合、番号やarrowがbuttonからa要素に置き換わります |
| linkAs | ElementType | - | - | next/linkなどのカスタムコンポーネントを指定します。指定がない場合はデフォルトで `a` タグが使用されます。 |

## 実装ルール

Pagination に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
