---
name: page-heading
description: "smarthr-ui の PageHeading を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。smarthr-ui の PageHeading コンポーネントの使い方ガイド。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

## import

```ts
import { PageHeading } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| size | "L" \| "XL" \| "XXL" | 'XL' | - | テキストのサイズ |
| visuallyHidden | boolean | - | - | 視覚的に非表示にするフラグ |
| autoPageTitle | boolean | - | - | title要素の自動生成フラグ  Next.js 環境ではこの値にかかわらずtitleは自動生成されません。metadataなどの方法を利用してください。 |
| pageTitle | string | - | - | title要素のprefix |
| pageTitleSuffix | string | - | - | title要素のsuffix |

## 実装ルール

PageHeading に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

_checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
