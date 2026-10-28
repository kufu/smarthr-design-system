# Container

ページの主要コンテンツの横幅と外側のパディングを制御するレイアウトコンポーネントです。すべてのページで本文領域の最大幅と上下左右の余白を設定するときに使います。

## import

```ts
import { Container } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v99.9.0** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| size | "FULL" \| "NARROW" \| "DEFAULT" \| "WIDE" | DEFAULT | - | - |
| padding | Gap \| { block?: Gap; inline?: Gap; narrowModeBlock?: Gap; narrowModeInline?: Gap; } | {
  block: 2,
  inline: 2,
  narrowModeBlock: 1.5,
  narrowModeInline: 1,
} as const | - | - |

## 実装ルール

### best-practice-for-layouts
smarthr-ui/Layoutsに属するコンポーネント(Center,Cluster,Container,Reel,Stack,Sidebar)の利用方法をチェックするルールです。

詳細は eslint-plugin-smarthr の各ルール README を参照してください。

## 使い方チェックリスト

### レイアウト > コンテナの大きさ > `NARROW`
- [should] フォーム要素が中心で `DEFAULT` では余白が大きくなりすぎる画面の場合は `NARROW` を検討する

### レイアウト > コンテナの大きさ > `DEFAULT`
- [should] コレクションやシングルの標準的な画面や、特に理由がない場合は `DEFAULT` を使う

### レイアウト > コンテナの大きさ > `WIDE`
- [should] 複数カラムのレイアウトで 1 つのカラムに 1 ページ相当の情報を表示する場合は `WIDE` を検討する

### レイアウト > コンテナの大きさ > `FULL`
- [should] 横スクロールを必須とするような大量のデータを表示する場合は `FULL` を検討する
