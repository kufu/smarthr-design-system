---
name: smarthr-ui-input
description: "Inputは、input[type='text']やinput[type='number']などの代替としてテキストや数値を1行で入力させるコンポーネントです。テキスト・数値を1行で入力させるとき、フォームに入力欄を追加するときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer2+layer3
---

input[type='text']やinput[type='number']などの代替としてテキストや数値を1行で入力させるコンポーネントです。テキスト・数値を1行で入力させるとき、フォームに入力欄を追加するときに使います。

`input[type="text"]`や`input[type="number"]`などの代替としてテキストや数値を1行で入力させるコンポーネントです。テキスト・数値を1行で入力させるとき、フォームに入力欄を追加するときに使います。

## import

```ts
import { Input } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| placeholder | string | - | - | @deprecated placeholder属性は非推奨です。別途ヒント用要素を設置するか、それらの領域を確保出来ない場合はTooltipコンポーネントの利用を検討してください。 |
| type | string | - | - | input 要素の `type` 値 |
| width | string \| number | - | - | コンポーネントの幅 |
| autoFocus | boolean | - | - | オートフォーカスを行うかどうか |
| prefix | ReactNode | - | - | コンポーネント内の先頭に表示する内容 |
| error | boolean | - | - | フォームにエラーがあるかどうか |
| suffix | ReactNode | - | - | コンポーネント内の末尾に表示する内容 |
| bgColor | "BACKGROUND" \| "COLUMN" \| "BASE_GREY" \| "OVER_BACKGROUND" \| "HEAD" \| "BORDER" \| "ACTION_BACKGROUND" | - | - | 背景色。readOnly を下地の上に載せる場合に使う |

## 実装ルール

### a11y-input-has-name-attribute
input, textarea, select など入力要素に name 属性を設定することを強制するルールです。

❌ NG:

```jsx
// name属性が存在しないためNG
<RadioButton />
<Input type="radio" />
<input type="text" />
<Textarea />
<Select />
```

✅ OK:

```jsx
<RadioButton name="hoge" />
<Input type="radio" name="fuga" />
<input type="text" name="any" />
<Textarea name="some" />
<Select name="piyo" />
```

### a11y-input-in-form-control
入力要素をsmarthr-ui/FormControl、もしくはsmarthr-ui/Fieldsetで囲むことを促すルールです

❌ NG:

```jsx
// FormControlで囲まれていないためNG
<Input />
```

```jsx
// FormControlが複数の入力要素を持ってしまっているのでNG
<FormControl title="any heading">
  <Input />
  <Combobox />
</FormControl>
```

✅ OK:

```jsx
<FormControl title="any heading">
  <Input />
</FormControl>
```

### a11y-prohibit-input-maxlength-attribute
input, textarea 要素に maxLength 属性を設定することを禁止するルールです。

### a11y-prohibit-input-placeholder
input や textarea などの入力要素に対してplaceholder属性を設定することを禁止するルールです

❌ NG:

```jsx
<Input placeholder="hoge" />
```

✅ OK:

```jsx
<>
  <Input />
  <Hint>hoge</Hint>
</>
```

詳細は eslint-plugin-smarthr の各ルール README を参照してください。

## 使い方チェックリスト

### 使用上の注意 > 適切な幅に調整して使用する
- [must] 入力する内容をあらかじめ精査し、適切な幅になるよう調整して使用する
  - Input は常に 1 行で表示されるため、十分な幅を確保する
  - 入力する内容の文字数の予測が付く場合、過剰に幅を確保しない
  - フォーム全体でレイアウトに統一性がなく感じられるときは、他の要素とのバランスを考慮して幅を調整する

### 使用上の注意 > ユースケースに応じてコンポーネントを使い分ける > 複数行のテキスト入力が想定される場合は使用しない
- [must] 改行を含めたテキストの入力を受け付ける場合は Textarea を使用する

### 使用上の注意 > ユースケースに応じてコンポーネントを使い分ける > データの編集や送信を伴わない画面では使用しない
- [must] データの編集や送信を伴わない画面でデータを表示する場合は DefinitionList を使用する

### 使用上の注意 > 入力項目の説明や例をプレースホルダで表示しない
- [must] 入力項目の説明や例を載せる場合は FormControl の `helpMessage` や `exampleMessage` を用い別途表示する

### Inputを使用したコンポーネント > CurrencyInput
- [must] 金額を入力するときは CurrencyInput を使用する

### Inputを使用したコンポーネント > SearchInput
- [should] SearchInput はよくあるテーブルのオブジェクトの検索などに使用する
- [must] SearchInput では `tooltipMessage` を使用して入力内容に対する説明を補足する
- [must] 検索ボタンのあるフォーム（インクリメンタル検索をしないフォーム）内の SearchInput では、入力内容のクリアボタンで検索まで実行せず入力内容の削除にとどめる

### レイアウト > プレフィックス・サフィックス > 要素の設置判断基準
- [should] プレフィックス（`prefix`）の要素は入力内容を想起させるために使用する
  - テキストの場合、一般的に内容に対して前方に置かれる単位（例: 米ドル）に用いる
- [should] サフィックス（`suffix`）のアイコンは操作を想起させるため、または操作を提供するために使用する
  - テキストの場合は入力内容を想起させるために使用し、一般的に内容に対して後方に置かれる単位（例: 日本円）に用いる
- [must] 入力内容を想起させるアイコンは基本的に明確に必要なときにのみつける

### 状態 > デフォルト
- [must] 何も入力されていない状態をデフォルトとする
  - ユーザーの入力作業が向上したり、ミスを減らせる場合にはデフォルト値の設定を検討する
  - 新規作成画面などで自動的にオブジェクト名を決められる場合は `yyyy/mm/dd + オブジェクト名` のようにデフォルト値を設定するのを推奨する

### 状態 > 読み取り専用（readOnly）
- [should] 当該画面では編集できないが、別の場所で入力済みの値をフォームの送信内容に含めて表示することが重要な場合は `readOnly` を使用する

### 状態 > 無効（disabled）
- [should] 通常は編集できるが一時的または権限の制約により編集できない場合に `disabled` を使用する
  - 送信内容に含めたい値はフォームには表示しないか `readOnly` の使用を検討する
  - そもそも無効ではなくフォーム自体を非表示にしたり、無効状態の理由を付近に表示することを検討する

### モバイル > フォントサイズはMを使用する
- [must] モバイルでの意図しない拡大を避けるため、Input のフォントサイズは `M` 以上を使用する

### アクセシビリティ > 開発時の考慮点 > FormControlと併用する
- [must] Input は必ず FormControl と併用して、ユーザーが何を入力すべきかを示すラベルを設定する

### アクセシビリティ > 開発時の考慮点 > アクセシブルネームの確認
- [must] 設定したラベルが Input のアクセシブルネームとして正しく関連付けられていることを確認する
