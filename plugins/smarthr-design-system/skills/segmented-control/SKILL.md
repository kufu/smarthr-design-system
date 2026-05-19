---
name: segmented-control
description: "smarthr-ui の SegmentedControl を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。同一オブジェクトの異なる状態や視点を切り替えるためのコンポーネントです。リスト表示とカード表示の切替など、選択と同時に即座に表示を変えるときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

同一オブジェクトの異なる状態や視点を切り替えるためのコンポーネントです。リスト表示とカード表示の切替など、選択と同時に即座に表示を変えるときに使います。

特定のオブジェクトに対して異なる状態を切り替える具体例としては、以下が挙げられます。

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
