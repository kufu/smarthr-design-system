# WarekiPicker

和暦で日付を入力させ西暦に変換する機能を備えた入力コンポーネントです。和暦の日付入力が必要なときに使います。

例えば、「令和4年12月3日」という日付を入力欄に貼り付けると「2022-12-03」に変換する機能を備えています。

## import

```ts
import { WarekiPicker } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v102.0.0** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| width | string \| number | - | - | コンポーネントの幅 |
| from | Date | new Date(1900, 0, 1) | - | 選択可能な期間の開始日 |
| to | Date | - | - | 選択可能な期間の終了日 |
| onChange | (e: ChangeEvent<HTMLInputElement>, other: { date: Date; formatValue: string; errors: string[]; }) => void | - | - | 選択された日付が変わった時に発火するコールバック関数 |
| defaultValue | string | - | - | 非制御コンポーネントとして使う場合の初期値。`value` を指定した場合は無視される |
| value | string | - | - | input 要素の `value` 属性の値 |
| placeholder | string | - | - | placeholder属性は非推奨です。別途ヒント用要素を設置するか、それらの領域を確保出来ない場合はTooltipコンポーネントの利用を検討してください。 |
| error | boolean | - | - | フォームにエラーがあるかどうか |
| parseInput | (input: string) => Date | - | - | 入力を独自にパースする場合に、パース処理を記述する関数 |
| formatDate | (date: Date) => string | - | - | 表示する日付を独自にフォーマットする場合に、フォーマット処理を記述する関数 |
| showAlternative | boolean \| ((date: Date) => ReactNode) | - | - | 入出力用文字列と併記する別表記を制御する。 - 省略 / `true`: 和暦を別表記として表示する(デフォルト) - `false`: 別表記を表示しない - 関数: その関数の結果を別表記として使う |
| onChangeDate | (date: Date, value: string, other: { errors: string[]; }) => void | - | - | @deprecated onChangeDate は非推奨です。onChange を使ってください。 |
| ref | Ref<HTMLInputElement> | - | - | - |

## 実装ルール

WarekiPicker に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

### 使用上の注意 > 和暦を西暦に変換できることを明示する
- [must] 和暦変換できることをラベルや説明文を使って明示する
