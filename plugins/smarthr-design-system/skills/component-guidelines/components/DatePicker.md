# DatePicker

> ⚠️ **非推奨**: DatePickerは非推奨です。Input[type=date] を使ってください。

ユーザーに日付を指定させる際に使用するコンポーネントです。フォーカスするとCalendarが開き、視覚的に日付を選択できます。

和暦による入力に対応するため独自で作成しています。例えば、「令和4年12月3日」という日付を入力欄に貼り付けると「2022-12-03」に変換する機能を備えています。

## import

```ts
import { DatePicker } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v97.0.0** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

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

使い方チェックリスト（Layer 3）は設定されていません。
