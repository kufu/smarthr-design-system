---
name: smarthr-ui-loader
description: "Loaderは、読み込み中や処理中であることを伝えるためのコンポーネントです。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer3
---

読み込み中や処理中であることを伝えるためのコンポーネントです。

## import

```ts
import { Loader } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| size | "S" \| "M" | - | - | ローダーの大きさ |
| alt | ReactNode | - | - | 代替テキスト |
| text | ReactNode | - | - | 表示するメッセージ |
| type | "primary" \| "light" | - | - | コンポーネントの色調 |

## 実装ルール

Loader に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

### 使用上の注意 > ローディングアイコンと背景のコントラスト比を確保する
- [must] ローディングアイコンは背景色とのコントラスト比を保つ
  - ウェブアクセシビリティ簡易チェックリストに基づき、3:1 以上のコントラスト比になるように調整する

### 使用上の注意 > 読み込みが1秒未満で終わる場合は使用しない
- [avoid] 読み込み時間が 1 秒未満の場合は Loader を使用しない
