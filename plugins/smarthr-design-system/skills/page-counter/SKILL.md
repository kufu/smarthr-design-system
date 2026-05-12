---
name: page-counter
description: "smarthr-ui の PageCounter を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。主に「よくあるテーブル」などコレクションの全件数と選択されている現在のページの件数を表示するためのコンポーネントです。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

主に「よくあるテーブル」などコレクションの全件数と選択されている現在のページの件数を表示するためのコンポーネントです。

主に[よくあるテーブル](/products/design-patterns/smarthr-table/)などコレクションの全件数と選択されている現在のページの件数を表示するためのコンポーネントです。

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
