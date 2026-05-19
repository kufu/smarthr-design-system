---
name: center
description: "smarthr-ui の Center を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。要素を上下左右中央に配置するためのレイアウトコンポーネントです。コンテンツを画面中央に置くとき、ボックス内に中央寄せをするときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer2
---

要素を上下左右中央に配置するためのレイアウトコンポーネントです。コンテンツを画面中央に置くとき、ボックス内に中央寄せをするときに使います。

[Every Layout](https://every-layout.dev/)の`Center`を参考にしています。

## import

```ts
import { Center } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| padding | Gap | - | - | 境界とコンテンツの間の余白 |
| minHeight | string \| number | - | - | コンテンツの最小高さ |
| maxWidth | string \| number | - | - | コンテンツの最大幅 |
| verticalCentering | boolean | - | - | 天地中央揃えも有効化するかどうか |

## 実装ルール

### best-practice-for-layouts
smarthr-ui/Layoutsに属するコンポーネント(Center,Cluster,Container,Reel,Stack,Sidebar)の利用方法をチェックするルールです。

詳細は eslint-plugin-smarthr の各ルール README を参照してください。

## 使い方チェックリスト

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
