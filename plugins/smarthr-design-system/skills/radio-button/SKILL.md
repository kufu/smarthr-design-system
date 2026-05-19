---
name: radio-button
description: "複数の選択肢から1つだけ選ばせるとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するときに使う。input[type='radio']要素の代替として選択肢から1つだけ選ばせる選択コンポーネントです。5個以下の選択肢をラベル短く一覧で見せるときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer2+layer3
---

input[type='radio']要素の代替として選択肢から1つだけ選ばせる選択コンポーネントです。5個以下の選択肢をラベル短く一覧で見せるときに使います。

`input[type="radio"]`要素の代替として選択肢から1つだけ選ばせる選択コンポーネントです。5個以下の選択肢をラベル短く一覧で見せるときに使います。

## import

```ts
import { RadioButton } from 'smarthr-ui'
```

## Props

（固有 Props なし）

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

### アクセシビリティ > セル内にチェックボックスやラジオボタンをそのまま配置しない
- [avoid] セルの内部に Checkbox や RadioButton をそのまま配置せず、TdCheckbox / ThCheckbox / TdRadioButton を利用する

### アクセシビリティ > TdCheckboxおよびTdRadioButtonでは行を特定できる要素をIDで参照する
- [must] TdCheckbox および TdRadioButton を利用する場合は `aria-labelledby` 属性を必ず指定し、それだけで行を一意に判別できる要素への ID 参照を指定する
- [must] オブジェクト名だけで一意に判別できないオブジェクトでは、複数の要素の ID 参照をスペース区切りで指定する
