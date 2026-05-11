---
name: currency-input
description: "smarthr-ui の CurrencyInput を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。smarthr-ui の CurrencyInput コンポーネントの使い方ガイド。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

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
