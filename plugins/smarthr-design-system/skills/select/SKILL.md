---
name: select
description: "smarthr-ui の Select を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。select要素の代わりに使用するコンポーネントです。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer2
---

select要素の代わりに使用するコンポーネントです。

`select`の代わりに使用するコンポーネントです。[Input](/products/components/input/)と見た目を揃えるために存在します。

## import

```ts
import { Select } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| options | (Option<T> \| Optgroup<T>)[] | - | ✓ | 選択肢のデータの配列 |
| onChangeValue | (value: T) => void | - | - | フォームの値が変わったときに発火するコールバック関数 |
| error | boolean | - | - | フォームの値にエラーがあるかどうか |
| width | string \| number | - | - | コンポーネントの幅 |
| size | "S" \| "M" | - | - | コンポーネントの大きさ |
| hasBlank | boolean | - | - | 空の選択肢を表示するかどうか |
| blankLabel | string | - | - | 空の選択肢のラベル |

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

詳細は eslint-plugin-smarthr の各ルール README を参照してください。

## 使い方チェックリスト

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
