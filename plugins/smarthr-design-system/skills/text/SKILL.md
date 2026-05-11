---
name: text
description: "smarthr-ui の Text を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。テキストを表示するためのコンポーネントです。タイポグラフィのデザイントークンを使用しています。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer2
---

テキストを表示するためのコンポーネントです。タイポグラフィのデザイントークンを使用しています。

テキストを表示するためのコンポーネントです。[タイポグラフィのデザイントークン](/products/design-tokens/typography/)を使用しています。

## import

```ts
import { Text } from 'smarthr-ui'
```

## Props

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

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
