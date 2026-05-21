---
name: smarthr-ui-reel
description: "要素を水平方向に並べ、はみ出した場合は水平方向にスクロールさせるレイアウトコンポーネントです。複数の要素を水平方向にスクロールさせて見せるときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer2
---

要素を水平方向に並べ、はみ出した場合は水平方向にスクロールさせるレイアウトコンポーネントです。複数の要素を水平方向にスクロールさせて見せるときに使います。

[Every Layout](https://every-layout.dev/)の`Reel`を参考にしています。 要素を折り返して並べたいときは[Cluster](/products/components/layout/cluster/)を使います。

## import

```ts
import { Reel } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| gap | Gap | 0.5 | - | - |
| padding | Gap | 0 | - | - |

## 実装ルール

### best-practice-for-layouts
smarthr-ui/Layoutsに属するコンポーネント(Center,Cluster,Container,Reel,Stack,Sidebar)の利用方法をチェックするルールです。

詳細は eslint-plugin-smarthr の各ルール README を参照してください。

## 使い方チェックリスト

使い方チェックリスト（Layer 3）は設定されていません。
