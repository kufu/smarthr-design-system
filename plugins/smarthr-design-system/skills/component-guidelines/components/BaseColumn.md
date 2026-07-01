# BaseColumn

BaseやDialogの内部で視覚的に要素をグルーピングするコンポーネントです。Base内やダイアログコンテンツ内でコンテンツを囲んで「ブロック」領域として示すときに使います。

## import

```ts
import { BaseColumn } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v96.1.0** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| overflow | "hidden" \| "auto" \| "clip" \| "scroll" \| "visible" \| { x: "hidden" \| "auto" \| "clip" \| "scroll" \| "visible"; y: "hidden" \| "auto" \| "clip" \| "scroll" \| "visible"; } | - | - | コンテンツが要素内に収まらない場合の処理方法 |
| padding | Gap \| { block?: Gap; inline?: Gap; narrowModeBlock?: Gap; narrowModeInline?: Gap; } | 1 | - | 境界とコンテンツの間の余白 |
| rounded | boolean \| "all" \| "top" \| "bottom" \| "left" \| "right" | - | - | - |
| bgColor | "BACKGROUND" \| "COLUMN" \| "BASE_GREY" \| "OVER_BACKGROUND" \| "HEAD" \| ... 他8個 | - | - | - |

## 実装ルール

BaseColumn に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

### デザインパターン > メッセージを表示するパターン
- [should] Base や各種 Dialog（`contentBgColor` が `WHITE` の場合）の内側など、InformationPanel が配置できない場合に、見出しと内容のセットで注意事項や補足事項を表示するために使う
  - Base の内側では InformationPanel の代わりに BaseColumn で注意事項を表示する
