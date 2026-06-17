# PageHeading

画面全体の最上位見出しを表示するためのコンポーネントです。h1要素として画面タイトルを示すときに使います。

## import

```ts
import { PageHeading } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v96.0.1** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

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

### 使用上の注意 > 画面ごとに1度しか使わない
- [must] PageHeading は画面のタイトルとして画面ごとに 1 度しか使わない
