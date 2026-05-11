---
name: date-picker
description: "smarthr-ui の DatePicker を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。ユーザーに日付を指定させる際に使用するコンポーネントです。フォーカスするとCalendarが開き、視覚的に日付を選択できます。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

ユーザーに日付を指定させる際に使用するコンポーネントです。フォーカスするとCalendarが開き、視覚的に日付を選択できます。

ユーザーに日付を指定させる際に使用するコンポーネントです。フォーカスすると[Calendar](/products/components/calendar/)が開き、視覚的に日付を選択できます。

## import

```ts
import { DatePicker } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| disabled | boolean | - | - | フォームを無効にするかどうか |
| name | string | - | - | input 要素の `name` 属性の値 |
| placeholder | string | - | - | placeholder属性は非推奨です。別途ヒント用要素を設置するか、それらの領域を確保出来ない場合はTooltipコンポーネントの利用を検討してください。 |
| value | string | - | - | input 要素の `value` 属性の値 |
| width | string \| number | - | - | コンポーネントの幅 |
| onChange | (e: ChangeEvent<HTMLInputElement>, other: { date: Date; formatValue: string; errors: string[]; }) => void | - | - | 選択された日付が変わった時に発火するコールバック関数 |
| from | Date | new Date(1900, 0, 1) | - | 選択可能な期間の開始日 |
| to | Date | - | - | 選択可能な期間の終了日 |
| error | boolean | - | - | フォームにエラーがあるかどうか |
| parseInput | (input: string) => Date | - | - | 入力を独自にパースする場合に、パース処理を記述する関数 |
| formatDate | (date: Date) => string | - | - | 表示する日付を独自にフォーマットする場合に、フォーマット処理を記述する関数 |
| showAlternative | (date: Date) => ReactNode | - | - | 入出力用文字列と併記する別フォーマット処理を記述する関数 |
| onChangeDate | (date: Date, value: string, other: { errors: string[]; }) => void | - | - | @deprecated onChangeDate は非推奨です。onChange を使ってください。 |

## 実装ルール

DatePicker に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

_checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
