# BaseColumn

> ⚠️ **非推奨**: BaseColumnはGroupboxに名称変更されたため非推奨です。Groupboxを使ってください。

BaseやDialogの内部で視覚的に要素をグルーピングするコンポーネントです。Base内やダイアログコンテンツ内でコンテンツを囲んで「ブロック」領域として示すときに使います。

## import

```ts
import { BaseColumn } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v99.9.0** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| overflow | "hidden" \| "auto" \| "clip" \| "visible" \| "scroll" \| { x: "hidden" \| "auto" \| "clip" \| "visible" \| "scroll"; y: "hidden" \| "auto" \| "clip" \| "visible" \| "scroll"; } | - | - | コンテンツが要素内に収まらない場合の処理方法 |
| padding | Gap \| { block?: Gap; inline?: Gap; narrowModeBlock?: Gap; narrowModeInline?: Gap; } | 1 | - | 境界とコンテンツの間の余白 |
| bgColor | "BACKGROUND" \| "COLUMN" \| "BASE_GREY" \| "OVER_BACKGROUND" \| "HEAD" \| ... 他8個 | - | - | 背景色 |
| rounded | boolean \| "right" \| "left" \| "top" \| "bottom" \| "all" | - | - | 角丸を適用する範囲 |

## 実装ルール

BaseColumn に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

使い方チェックリスト（Layer 3）は設定されていません。
