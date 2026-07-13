# Text

タイポグラフィのデザイントークンを使ってテキストを表示するためのコンポーネントです。本文や説明文、ラベルテキストにデザイントークン準拠のフォントサイズ・ウェイト・色・行送り・見出しスタイルなどを適用するときに使います。

## import

```ts
import { Text } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v97.0.0** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| size | "XXS" \| "XS" \| "S" \| "M" \| "L" \| "XL" \| "XXL" | - | - | - |
| color | "inherit" \| "TEXT_BLACK" \| "TEXT_WHITE" \| "TEXT_GREY" \| "TEXT_DISABLED" \| "TEXT_LINK" | - | - | - |
| weight | "bold" \| "normal" | emphasis ? 'bold' : undefined | - | - |
| italic | boolean | - | - | - |
| leading | "NONE" \| "TIGHT" \| "NORMAL" \| "LOOSE" | - | - | - |
| whiteSpace | "pre" \| "normal" \| "nowrap" \| "pre-line" \| "pre-wrap" | - | - | - |
| maxLines | 1 \| 2 \| 3 \| 4 \| 5 \| 6 | - | - | - |
| emphasis | boolean | - | - | 強調するかどうかの真偽値。指定すると em 要素になる |
| styleType | "screenTitle" \| "sectionTitle" \| "blockTitle" \| "subBlockTitle" \| "subSubBlockTitle" | - | - | 見た目の種類 |
| icon | any | - | - | 設置するアイコン |

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

### 種類 > 見出しスタイル
- [must] 見出しとして使う場合は Text ではなく Heading を使う
