---
name: browser
description: "階層構造を持つデータを選択するためのコンポーネントです。カテゴリや組織、フォルダなどのツリー状のデータをドリルダウンで選択するときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

階層構造を持つデータを選択するためのコンポーネントです。カテゴリや組織、フォルダなどのツリー状のデータをドリルダウンで選択するときに使います。

## import

```ts
import { Browser } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| items | ItemNodeLike[] | - | ✓ | 表示する item の配列 |
| value | string | - | - | 選択中の item の値 |
| onSelectItem | (value: string) => void | - | - | 選択された際に呼び出されるコールバック。第一引数に item の value を取る。 |

## 実装ルール

Browser に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

使い方チェックリスト（Layer 3）は設定されていません。
