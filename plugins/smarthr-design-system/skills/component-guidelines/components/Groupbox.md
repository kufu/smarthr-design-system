# Groupbox

PanelやDialogの内部に置き、矩形で視覚的に要素をグルーピングするコンポーネントです。Panel内やダイアログコンテンツ内でコンテンツを囲んで「ブロック」領域として示すときに使います。

## import

```ts
import { Groupbox } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v103.1.0** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| rounded | boolean \| "right" \| "left" \| "top" \| "bottom" \| "all" | - | - | 角丸を適用する範囲 |
| bgColor | "WHITE" \| "OVER_BACKGROUND" \| "BACKGROUND" \| "COLUMN" \| "BASE_GREY" \| ... 他8個 | - | - | 背景色 |
| fit | boolean | - | - | childrenの内容に併せてサイズを縮小させます |
| padding | Gap \| { block?: Gap; inline?: Gap; } | 1 | - | 境界とコンテンツの間の余白 |
| overflow | "auto" \| "hidden" \| "visible" \| "clip" \| "scroll" \| { x: "auto" \| "hidden" \| "visible" \| "clip" \| "scroll"; y: "auto" \| "hidden" \| "visible" \| "clip" \| "scroll"; } | - | - | コンテンツが要素内に収まらない場合の処理方法 |

## 実装ルール

Groupbox に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

> ℹ️ 各項目は SmartHR Design System の基準であり、守らなければならない規則ではありません。`[must]` は基本的に合わせる基準、`[should]` は状況に応じて判断する推奨、`[avoid]` は避けることを推奨する使い方です。`[must]` に合わせない場合や `[avoid]` の使い方を採用する場合は、理由を明示してください。

### デザインパターン > メッセージを表示するパターン
- [should] Panel や各種 Dialog（`contentBgColor` が `WHITE` の場合）の内側など、InformationPanel が配置できない場合に、見出しと内容のセットで注意事項や補足事項を表示するために使う
  - Panel の内側では InformationPanel の代わりに Groupbox で注意事項を表示する
