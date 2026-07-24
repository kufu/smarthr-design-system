# Textarea

textarea要素の代替としてテキストを複数行で入力させるコンポーネントです。長文を入力させるとき、文字数カウンタが必要なときに使います。

入力によって自動で領域が広がる機能を備えています。

## import

```ts
import { Textarea } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v98.1.0** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| placeholder | string | - | - | placeholder属性は非推奨です。別途ヒント用要素の設置を検討してください。 |
| width | string \| number | - | - | コンポーネントの幅 |
| autoFocus | boolean | - | - | 自動でフォーカスされるかどうか |
| error | boolean | - | - | 入力値にエラーがあるかどうか |
| rows | number | 2 | - | 行数の初期値。省略した場合は2 |
| autoResize | boolean | false | - | 自動で広がるかどうか |
| maxRows | number | - | - | 最大行数。超えるとスクロールする。初期値は無限 |
| maxLetters | number | - | - | 入力可能な最大文字数。あと何文字入力できるかの表示が追加される。html的なvalidateは発生しない |

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

### a11y-prohibit-input-maxlength-attribute
input, textarea 要素に maxLength 属性を設定することを禁止するルールです。

### a11y-prohibit-input-placeholder
input や textarea などの入力要素に対してplaceholder属性を設定することを禁止するルールです

詳細は eslint-plugin-smarthr の各ルール README を参照してください。

## 使い方チェックリスト

### 使用上の注意 > 適切なサイズに調整して使用する
- [must] 入力する内容をあらかじめ精査し適切なサイズになるよう調整して使う
  - 幅は `width` props、高さは `rows` props で指定する。十分なサイズを確保する
  - 入力によって自動で高さが広がってよい場合は `autoResize` props を指定する
  - 高さを自動で広げつつ上限を設定する場合は `maxRows` props を指定する
  - 入力する内容の文字数の予測が付く場合、過剰に高さを確保しない
  - フォーム全体で見たときにレイアウトに統一性がなく感じられるときは、他の要素とのバランスを考慮してサイズを調整する

### 使用上の注意 > 入力できる文字数に上限がある場合は入力文字数を表示する
- [must] 入力できる文字数の上限が決まっている場合は `maxLetters` props を指定し、上限に応じた幅と高さに調整する

### 使用上の注意 > ユースケースに応じてコンポーネントを使い分ける > 一行のテキスト入力が想定される場合は使用しない
- [must] 氏名やメールアドレスなどの一行のテキスト入力には Input を使う

### 使用上の注意 > ユースケースに応じてコンポーネントを使い分ける > データの編集や送信を伴わない画面では使用しない
- [must] データの編集や送信を伴わない画面でデータを表示する場合は DefinitionList を使う

### 使用上の注意 > 入力項目の説明や例をプレースホルダで表示しない
- [avoid] 入力項目の説明や例をプレースホルダで表示しない
  - 説明や例を載せる場合は FormControl のヘルプメッセージ（`helpMessage`）や入力例（`exampleMessage`）などを用い別途表示する

### 状態 > 無効（disabled）
- [should] 無効状態の使用にあたっては、そもそも無効ではなくフォーム自体を非表示にしたり、無効状態の理由を付近に表示することを検討する

### モバイル
- [must] モバイル向けブラウザでの意図しない拡大を避けるため、Textarea のフォントサイズは `M` 以上を使う
- [should] モバイルでは `autoResize` props を指定し、`maxRows` props は指定しないことを推奨する
  - 一部のモバイル向けブラウザでは Textarea のリサイズに対応していないことがあり、Textarea 内でスクロールが発生すると操作しづらくなるため
