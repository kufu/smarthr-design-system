---
name: select
description: "select要素の代替として選択肢から1つの値を選ばせるドロップダウンコンポーネントです。6個以上の選択肢を検索不要で効率よくレイアウトするときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer2
---

select要素の代替として選択肢から1つの値を選ばせるドロップダウンコンポーネントです。6個以上の選択肢を検索不要で効率よくレイアウトするときに使います。

`select`要素の代替として選択肢から1つの値を選ばせるドロップダウンコンポーネントです。6個以上の選択肢から1つを選択するときに使います。 [Input](/products/components/input/)と見た目を揃えるために存在します。

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
