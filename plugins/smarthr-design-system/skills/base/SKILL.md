---
name: base
description: "smarthr-ui の Base を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。矩形で視覚的に要素をグルーピングするコンポーネントです。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

矩形で視覚的に要素をグルーピングするコンポーネントです。

[矩形](/products/design-patterns/visual-grouping/#h3-3)で視覚的に要素をグルーピングするコンポーネントです。

## import

```ts
import { Base } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| overflow | "hidden" \| "auto" \| "clip" \| "scroll" \| "visible" \| { x: "hidden" \| "auto" \| "clip" \| "scroll" \| "visible"; y: "hidden" \| "auto" \| "clip" \| "scroll" \| "visible"; } | - | - | コンテンツが要素内に収まらない場合の処理方法 |
| radius | "s" \| "m" | - | - | - |
| padding | Gap \| { block?: Gap; inline?: Gap; narrowModeBlock?: Gap; narrowModeInline?: Gap; } | - | - | 境界とコンテンツの間の余白 |
| layer | 0 \| 1 \| 2 \| 3 \| 4 | - | - | - |

## 実装ルール

Base に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
