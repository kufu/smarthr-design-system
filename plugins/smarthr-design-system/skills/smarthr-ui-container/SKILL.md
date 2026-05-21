---
name: smarthr-ui-container
description: "ページの主要コンテンツの横幅と外側のパディングを制御するレイアウトコンポーネントです。すべてのページで本文領域の最大幅と上下左右の余白を設定するときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer2+layer3
---

ページの主要コンテンツの横幅と外側のパディングを制御するレイアウトコンポーネントです。すべてのページで本文領域の最大幅と上下左右の余白を設定するときに使います。

## import

```ts
import { Container } from 'smarthr-ui'
```

## Props

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
