---
name: smarthr-ui-td-radio-button
description: "TdRadioButtonは、RadioButtonを内包するデータセル（Td）の派生コンポーネントです。テーブル各行から1行だけ選ばせるときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer2+layer3
---

RadioButtonを内包するデータセル（Td）の派生コンポーネントです。テーブル各行から1行だけ選ばせるときに使います。

`table`要素の代替として表形式でデータを表示するためのコンポーネントです。データを行列で一覧表示するとき、レコードを並べて比較するビューを提示するときに使います。

## import

```ts
import { TdRadioButton } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| aria-labelledby | string | - | - | RadioButtonのaccessible nameとして設定するテキストを参照するためのid属性値。同じ親Tr配下のTdかTh、もしくはその子孫要素のidを指定する。複数要素のテキストを指定する場合は空白区切りでidをつなぐ Identifies the element (or elements) that labels the current element. @see aria-describedby. |
| vAlign | "middle" \| "baseline" | - | - | - |

## 実装ルール

### a11y-prohibit-checkbox-or-radio-in-table-cell
テーブルセル（Th, Td）内に直接 Checkbox, RadioButton を配置することを禁止するルールです。<br /> SmartHR UI には、デフォルトでアクセシブルネームを設定する TdCheckbox, ThCheckbox, TdRadioButton といったより適切なコンポーネントが用意されています。

✅ OK:

```jsx
<TdCheckbox aria-labelledby="id1" />
<TdRadioButton aria-labelledby="id2" />
<ThCheckbox />
```

詳細は eslint-plugin-smarthr の各ルール README を参照してください。

## 使い方チェックリスト

### アクセシビリティ > セル内にチェックボックスやラジオボタンをそのまま配置しない
- [avoid] セルの内部に Checkbox や RadioButton をそのまま配置せず、TdCheckbox / ThCheckbox / TdRadioButton を利用する

### アクセシビリティ > TdCheckboxおよびTdRadioButtonでは行を特定できる要素をIDで参照する
- [must] TdCheckbox および TdRadioButton を利用する場合は `aria-labelledby` 属性を必ず指定し、それだけで行を一意に判別できる要素への ID 参照を指定する
- [must] オブジェクト名だけで一意に判別できないオブジェクトでは、複数の要素の ID 参照をスペース区切りで指定する
