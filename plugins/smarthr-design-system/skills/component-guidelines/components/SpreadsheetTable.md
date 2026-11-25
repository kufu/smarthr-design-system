# SpreadsheetTable

表データを表計算ソフト風に表示するためのコンポーネントです。CSVインポート画面などで利用者にスプレッドシートを想像させるときに使います。

## import

```ts
import { SpreadsheetTableCorner, SpreadsheetTable } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v103.1.0** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

### SpreadsheetTableCorner
（固有 Props なし）

### SpreadsheetTable
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| data | ReactNode[][] | - | - | - |

## 実装ルール

SpreadsheetTable に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

> ℹ️ 各項目は SmartHR Design System の基準であり、守らなければならない規則ではありません。`[must]` は基本的に合わせる基準、`[should]` は状況に応じて判断する推奨、`[avoid]` は避けることを推奨する使い方です。`[must]` に合わせない場合や `[avoid]` の使い方を採用する場合は、理由を明示してください。

### レイアウト
- [should] セル内で改行数が多くなるなど可読性が下がる場合は、セル内のテキストを折り返さずに表示できるよう、Reel を使用して SpreadsheetTable を水平方向にスクロールさせる
