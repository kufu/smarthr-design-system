---
name: container
description: "smarthr-ui の Container を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。ページの主要コンテンツの横幅と外側のパディングを制御するレイアウトコンポーネントです。すべてのページで本文領域の最大幅と上下左右の余白を設定するときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer2
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

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
