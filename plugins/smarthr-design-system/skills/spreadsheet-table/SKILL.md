---
name: spreadsheet-table
description: "表データを表計算ソフト風に表示するためのコンポーネントです。CSVインポート画面などで利用者にスプレッドシートを想像させるときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer3
---

表データを表計算ソフト風に表示するためのコンポーネントです。CSVインポート画面などで利用者にスプレッドシートを想像させるときに使います。

## import

```ts
import { SpreadsheetTableCorner, SpreadsheetTable } from 'smarthr-ui'
```

## Props

### SpreadsheetTableCorner
（固有 Props なし）

### SpreadsheetTable
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| data | ReactNode[][] | - | - | - |

## 実装ルール

SpreadsheetTable に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

### レイアウト
- [should] セル内で改行数が多くなるなど可読性が下がる場合は、セル内のテキストを折り返さずに表示できるよう、Reel を使用して SpreadsheetTable を水平方向にスクロールさせる
