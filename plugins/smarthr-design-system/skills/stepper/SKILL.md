---
name: stepper
description: "複数ステップに分かれた操作の進行状況を示すコンポーネントです。手続きの現在位置や全体ステップ数を可視化するときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

複数ステップに分かれた操作の進行状況を示すコンポーネントです。手続きの現在位置や全体ステップ数を可視化するときに使います。

ステップの進行状況に応じて、現在地や完了のステータスを適切に表現してください。

## import

```ts
import { Stepper } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| type | "horizontal" \| "vertical" | - | ✓ | - |
| steps | Step[] \| VerticalStep[] | - | ✓ | type=vertical では子要素を持てる |
| activeIndex | number | - | - | 現在地。0始まり。 |

## 実装ルール

Stepper に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
