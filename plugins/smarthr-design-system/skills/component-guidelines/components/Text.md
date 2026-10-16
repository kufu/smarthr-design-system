# Text

タイポグラフィのデザイントークンを使ってテキストを表示するためのコンポーネントです。本文や説明文、ラベルテキストにデザイントークン準拠のフォントサイズ・ウェイト・色・行送り・見出しスタイルなどを適用するときに使います。

## import

```ts
import { Text } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v99.9.0** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| emphasis | boolean | - | - | 強調するかどうかの真偽値。指定すると em 要素になる |
| styleType | "screenTitle" \| "sectionTitle" \| "blockTitle" \| "subBlockTitle" \| "subSubBlockTitle" | - | - | 見た目の種類 |
| icon | ReactNode \| { prefix?: ReactNode; suffix?: ReactNode; gap?: any; } | - | - | 設置するアイコン |
| size | "XXS" \| "XS" \| "S" \| "M" \| "L" \| "XL" \| "XXL" | - | - | - |
| weight | "normal" \| "bold" | emphasis ? 'bold' : undefined | - | - |
| italic | boolean | - | - | - |
| color | "inherit" \| "TEXT_BLACK" \| "TEXT_WHITE" \| "TEXT_GREY" \| "TEXT_DISABLED" \| "TEXT_LINK" | - | - | - |
| leading | "NONE" \| "TIGHT" \| "NORMAL" \| "LOOSE" | - | - | - |
| whiteSpace | "pre" \| "normal" \| "nowrap" \| "pre-line" \| "pre-wrap" | - | - | - |
| maxLines | 1 \| 2 \| MaxLinesObject \| 3 \| 4 \| 5 \| 6 | - | - | 最大表示行数。オブジェクト形式で指定すると、省略時に Tooltip で全文を表示するかどうかも指定できる |

## 実装ルール

### a11y-clickable-element-has-text
ButtonやAnchor,Link コンポーネントなどクリック可能（クリッカブル）な要素にテキストを設定することを促すルールです。

### a11y-numbered-text-within-ol
"1. hoge", "2. fuga" ... のように連番のテキストはol要素でマークアップすることを促すルールです

### best-practice-for-text-component
Textコンポーネントの適切な使用を促進するルールです。以下の3つのチェックを行います：

詳細は eslint-plugin-smarthr の各ルール README を参照してください。

## 使い方チェックリスト

### 使用上の注意 > 入れ子にしたときの出力要素に注意する
- [must] Text を入れ子にする場合は Valid な HTML になるよう出力要素に注意する

### 使用上の注意 > 省略表示したテキストは隠れたままになることに注意する > 省略表示を推奨するケース
- [should] ユーザーの操作過程で「確認が必須ではない」程度の情報を表示する場合は maxLines での省略表示を検討してよい
- [should] テーブルのセル内やリスト形式の UI で視認性を確保する場合は maxLines での省略表示を検討してよい

### 使用上の注意 > 省略表示したテキストは隠れたままになることに注意する > 省略表示を避けるケース
- [avoid] 単に情報を省略する目的では maxLines での省略表示を使用しない
- [avoid] ユーザーが把握しておかないと操作が進められないような重要な情報は maxLines で省略せず、常に表示することを検討する
  - パスワードに使用できる文字や、エラーになる入力値などの入力要件
  - 入力エラーとなった際のエラーメッセージ
  - 操作補助になる情報（ショートカットなど）
  - ボタンなどの操作 UI のラベル

### モバイル
- [must] タッチデバイスでは hover 表示を前提とした Tooltip は使用せず、Disclosure を使用する

### 種類 > 見出しスタイル
- [must] 見出しとして使う場合は Text ではなく Heading を使う
