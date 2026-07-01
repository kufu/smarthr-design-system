# Center

要素を上下左右中央に配置するためのレイアウトコンポーネントです。コンテンツを画面中央に置くとき、ボックス内に中央寄せをするときに使います。

Every Layout（https://every-layout.dev/）のCenterを参考にしています。

## import

```ts
import { Center } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v96.1.0** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

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

使い方チェックリスト（Layer 3）は設定されていません。
