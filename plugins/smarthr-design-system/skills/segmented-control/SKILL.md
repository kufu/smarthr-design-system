---
name: segmented-control
description: "smarthr-ui の SegmentedControl を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。特定のオブジェクトの異なる状態を切り替えて表示するためのコンポーネントです。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

特定のオブジェクトの異なる状態を切り替えて表示するためのコンポーネントです。

特定のオブジェクトの異なる状態を切り替えて表示するためのコンポーネントです。オブジェクトの持つ情報を別の見方へ変更するときに使います。

## import

```ts
import { SegmentedControl } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| options | Option[] | - | ✓ | 選択肢の配列 |
| value | string | - | - | 選択中の値 |
| onClickOption | (value: string) => void | - | - | 選択肢を押下したときに発火するコールバック関数 |
| size | "S" \| "M" | M | - | 各ボタンの大きさ |

## 実装ルール

SegmentedControl に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
