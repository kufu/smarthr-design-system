---
name: page-heading
description: "ページ全体の見出しを表示するとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するときに使う。画面タイトル用の見出しコンポーネントです。`screenTitle`タイプと`h1`要素が自動的に設定されます。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

画面タイトル用の見出しコンポーネントです。`screenTitle`タイプと`h1`要素が自動的に設定されます。

画面タイトルとして使用する見出しコンポーネントです。 [Heading](/products/components/heading/)の派生コンポーネントとして、`screenTitle`タイプと`h1`要素が自動的に設定されたものです。

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

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
