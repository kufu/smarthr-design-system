---
name: textarea
description: "textarea要素の代替としてテキストを複数行で入力させるコンポーネントです。長文を入力させるとき、文字数カウンタが必要なときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer2
---

textarea要素の代替としてテキストを複数行で入力させるコンポーネントです。長文を入力させるとき、文字数カウンタが必要なときに使います。

`textarea`要素の代替としてテキストを複数行で入力させるコンポーネントです。長文を入力させるとき、文字数カウンタが必要なときに使います。 入力によって自動で領域が広がる機能を備えています。

## import

```ts
import { Textarea } from 'smarthr-ui'
```

## Props

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

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
