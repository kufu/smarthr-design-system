---
name: smarthr-ui-base-column
description: "BaseColumnは、BaseやDialogの内部で視覚的に要素をグルーピングするコンポーネントです。Base内やダイアログコンテンツ内でコンテンツを囲んで「ブロック」領域として示すときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

BaseやDialogの内部で視覚的に要素をグルーピングするコンポーネントです。Base内やダイアログコンテンツ内でコンテンツを囲んで「ブロック」領域として示すときに使います。

## import

```ts
import { BaseColumn } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| overflow | "hidden" \| "auto" \| "clip" \| "scroll" \| "visible" \| { x: "hidden" \| "auto" \| "clip" \| "scroll" \| "visible"; y: "hidden" \| "auto" \| "clip" \| "scroll" \| "visible"; } | - | - | コンテンツが要素内に収まらない場合の処理方法 |
| padding | Gap \| { block?: Gap; inline?: Gap; narrowModeBlock?: Gap; narrowModeInline?: Gap; } | 1 | - | 境界とコンテンツの間の余白 |
| rounded | boolean \| "all" \| "top" \| "bottom" \| "left" \| "right" | - | - | - |
| bgColor | "BACKGROUND" \| "COLUMN" \| "BASE_GREY" \| "OVER_BACKGROUND" \| "HEAD" \| ... 他8個 | - | - | - |

## 実装ルール

BaseColumn に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

使い方チェックリスト（Layer 3）は設定されていません。
