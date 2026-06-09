# SpreadsheetTable

表データを表計算ソフト風に表示するためのコンポーネントです。CSVインポート画面などで利用者にスプレッドシートを想像させるときに使います。

## import

```ts
import { SpreadsheetTableCorner, SpreadsheetTable } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v95.0.0** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

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
