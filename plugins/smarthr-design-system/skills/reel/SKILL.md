---
name: reel
description: "smarthr-ui の Reel を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。Every LayoutのReelを参考にしたコンポーネントです。要素を横に均等に並べたいときに使います。幅に収まり切らなくなると水平方向のスクロールが生じます。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer2
---

Every LayoutのReelを参考にしたコンポーネントです。要素を横に均等に並べたいときに使います。幅に収まり切らなくなると水平方向のスクロールが生じます。

[Every Layout](https://every-layout.dev/)の`Reel`を参考にしたコンポーネントです。要素を水平方向に等間隔で並べたいときに使います。幅に収まり切らなくなると水平方向のスクロールが生じます。

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

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
