# Browser

階層構造を持つデータを選択するためのコンポーネントです。カテゴリや組織、フォルダなどのツリー状のデータをドリルダウンで選択するときに使います。

## import

```ts
import { Browser } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v96.0.1** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| items | ItemNodeLike[] | - | ✓ | 表示する item の配列 |
| value | string | - | - | 選択中の item の値 |
| onSelectItem | (value: string) => void | - | - | 選択された際に呼び出されるコールバック。第一引数に item の value を取る。 |

## 実装ルール

Browser に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

使い方チェックリスト（Layer 3）は設定されていません。
