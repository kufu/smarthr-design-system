# Reel

要素を水平方向に並べ、はみ出した場合は水平方向にスクロールさせるレイアウトコンポーネントです。複数の要素を水平方向にスクロールさせて見せるときに使います。

Every Layout（https://every-layout.dev/）のReelを参考にしています。 要素を折り返して並べたいときはClusterを使います。

## import

```ts
import { Reel } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v97.0.0** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

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
