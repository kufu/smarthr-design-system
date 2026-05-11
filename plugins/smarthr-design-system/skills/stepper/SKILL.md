---
name: stepper
description: "smarthr-ui の Stepper を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。連続する操作を、操作のステップごとにグルーピングするコンポーネントです。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

連続する操作を、操作のステップごとにグルーピングするコンポーネントです。

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

_checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
