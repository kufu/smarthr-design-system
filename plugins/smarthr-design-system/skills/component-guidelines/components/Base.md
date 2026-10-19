# Base

> ⚠️ **非推奨**: BaseはPanelに名称変更されたため非推奨です。Panelを使ってください。

矩形で視覚的に要素をグルーピングするコンポーネントです。ページ背景上でコンテンツを囲んで「セクション」領域として示すときに使います。

## import

```ts
import { Base } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v99.9.0** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| overflow | "hidden" \| "auto" \| "clip" \| "visible" \| "scroll" \| { x: "hidden" \| "auto" \| "clip" \| "visible" \| "scroll"; y: "hidden" \| "auto" \| "clip" \| "visible" \| "scroll"; } | - | - | コンテンツが要素内に収まらない場合の処理方法 |
| radius | "s" \| "m" | - | - | 角丸の大きさ |
| padding | Gap \| { block?: Gap; inline?: Gap; narrowModeBlock?: Gap; narrowModeInline?: Gap; } | - | - | 境界とコンテンツの間の余白 |
| layer | 0 \| 1 \| 2 \| 3 \| 4 | - | - | 影のレイヤー |

## 実装ルール

Base に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

使い方チェックリスト（Layer 3）は設定されていません。
