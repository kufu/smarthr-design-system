---
name: checkbox
description: "選択肢の中から複数の値を選択させるとき、オン/オフを切り替えさせるとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するときに使う。ユーザーに「true/false」といった正反対の状態を入力させるコンポーネントです。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer2
---

ユーザーに「true/false」といった正反対の状態を入力させるコンポーネントです。

`input[type='checkbox']`の代わりとして使用します。

## import

```ts
import { Checkbox } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| error | boolean | - | - | チェックボックスにエラーがあるかどうか |
| mixed | boolean | - | - | `true` のとき、チェック状態を `mixed` にする |

## 実装ルール

### a11y-prohibit-checkbox-or-radio-in-table-cell
テーブルセル（Th, Td）内に直接 Checkbox, RadioButton を配置することを禁止するルールです。<br /> SmartHR UI には、デフォルトでアクセシブルネームを設定する TdCheckbox, ThCheckbox, TdRadioButton といったより適切なコンポーネントが用意されています。

❌ NG:

```jsx
// Td, Th内にCheckbox, RadioButtonを配置しているためNG
<Td>
  <Checkbox />
</Td>
<Td>
  <RadioButton />
</Td>
<Th>
  <Checkbox />
</Th>
```

```jsx
// Td, Thに適切にaria-labelledby, aria-label属性を設定していても置き換え推奨のためNG
<Td>
  <Checkbox aria-labelledby="id1" />
</Td>
<Td>
  <RadioButton aria-labelledby="id2" />
</Td>
<Th>
  <Checkbox aria-label="any text" />
</Th>
```

詳細は eslint-plugin-smarthr の各ルール README を参照してください。

## 使い方チェックリスト

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
