# CurrencyInput

金額を入力させるためのコンポーネントです。給与・税額など金額値を入力させるときに使います。入力値が整数であった場合、入力欄からフォーカスを外したときに3桁ごとにカンマが入った値で表示されます。

## import

```ts
import { CurrencyInput } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v96.0.1** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

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

### 使用上の注意 > 金額入力にはCurrencyInputを使用する
- [must] 金額入力には `<Input type="number">` の代わりに CurrencyInput を使う

### 使用上の注意 > プレフィックス・サフィックスで単位を補足する
- [must] 通貨記号や単位は `prefix` または `suffix` で補足する
  - 一般的に内容に対して前方に置かれる単位（例: 米ドル）には `prefix` を用いる
  - 後方に置かれる単位（例: 日本円）には `suffix` を用いる
