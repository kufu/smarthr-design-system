---
name: loader
description: "smarthr-ui の Loader を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。読み込み中や操作中など何らかの操作が仕掛り中であることを伝えるためのコンポーネントです。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

読み込み中や操作中など何らかの操作が仕掛り中であることを伝えるためのコンポーネントです。

## import

```ts
import { Loader } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| size | "S" \| "M" | - | - | ローダーの大きさ |
| alt | ReactNode | - | - | 代替テキスト |
| text | ReactNode | - | - | 表示するメッセージ |
| type | "primary" \| "light" | - | - | コンポーネントの色調 |

## 実装ルール

Loader に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

_checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
