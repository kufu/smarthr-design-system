# Container

ページの主要コンテンツの横幅と外側のパディングを制御するレイアウトコンポーネントです。すべてのページで本文領域の最大幅と上下左右の余白を設定するときに使います。

## import

```ts
import { Container } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v96.0.1** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| size | "FULL" \| "NARROW" \| "DEFAULT" \| "WIDE" | DEFAULT | - | - |
| padding | Gap \| { block?: Gap; inline?: Gap; narrowModeBlock?: Gap; narrowModeInline?: Gap; } | { block: 2, inline: 2, narrowModeBlock: 1.5, narrowModeInline: 1 } | - | - |

## 実装ルール

### best-practice-for-layouts
smarthr-ui/Layoutsに属するコンポーネント(Center,Cluster,Container,Reel,Stack,Sidebar)の利用方法をチェックするルールです。

詳細は eslint-plugin-smarthr の各ルール README を参照してください。

## 使い方チェックリスト

### レイアウト > コンテナの大きさ
- [should] 大量のデータを表示する場合や 2 カラムレイアウトで 1 つのカラムに 1 ページ相当の情報を表示する場合は `WIDE` や `FULL` を検討する
- [should] ページに表示する情報が少ない場合や入力要素が中心の画面の場合は `NARROW` を検討する
