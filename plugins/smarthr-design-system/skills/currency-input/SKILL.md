---
name: currency-input
description: "金額・通貨を入力させるとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するときに使う。金額を入力するためのコンポーネントです。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

金額を入力するためのコンポーネントです。

金額を入力するためのコンポーネントです。入力値が整数であった場合、入力欄からフォーカスを外したときに3桁ごとにカンマが入った値で表示されます。

## import

```ts
import { CurrencyInput } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| placeholder | string | - | - | @deprecated placeholder属性は非推奨です。別途ヒント用要素を設置するか、それらの領域を確保出来ない場合はTooltipコンポーネントの利用を検討してください。 |
| value | string | - | - | 通貨の値 |
| width | string \| number | - | - | コンポーネントの幅 |
| defaultValue | string | - | - | デフォルトで表示する通貨の値 |
| autoFocus | boolean | - | - | オートフォーカスを行うかどうか |
| prefix | ReactNode | - | - | コンポーネント内の先頭に表示する内容 |
| error | boolean | - | - | フォームにエラーがあるかどうか |
| suffix | ReactNode | - | - | コンポーネント内の末尾に表示する内容 |
| bgColor | "BACKGROUND" \| "COLUMN" \| "BASE_GREY" \| "OVER_BACKGROUND" \| "HEAD" \| "BORDER" \| "ACTION_BACKGROUND" | - | - | 背景色。readOnly を下地の上に載せる場合に使う |
| onFormatValue | (value: string) => void | - | - | 入力値がフォーマットされたときに発火するコールバック関数 |

## 実装ルール

CurrencyInput に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
