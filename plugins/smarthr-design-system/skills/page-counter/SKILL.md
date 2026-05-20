---
name: page-counter
description: "「よくあるテーブル」などの一覧の総件数と現在ページの件数を表示するためのコンポーネントです。Paginationと併用し件数を提示するときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

「よくあるテーブル」などの一覧の総件数と現在ページの件数を表示するためのコンポーネントです。Paginationと併用し件数を提示するときに使います。

「[よくあるテーブル](/products/design-patterns/smarthr-table/)」などの一覧の総件数と現在ページの件数を表示するためのコンポーネントです。[Pagination](/products/components/pagination/)と併用し件数を提示するときに使います。

## import

```ts
import { PageCounter } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| start | number | - | ✓ | - |
| end | number | - | ✓ | - |
| total | number | - | - | - |

## 実装ルール

PageCounter に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
