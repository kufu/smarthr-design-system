---
name: smarthr-ui-th
description: "Thは、th要素の代替としてテーブルの列見出しセルを表すコンポーネントです。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer2+layer3
---

th要素の代替としてテーブルの列見出しセルを表すコンポーネントです。

`table`要素の代替として表形式でデータを表示するためのコンポーネントです。データを行列で一覧表示するとき、レコードを並べて比較するビューを提示するときに使います。

## import

```ts
import { Th } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| sort | "desc" \| "none" \| "asc" | - | - | 並び替え状態 |
| onSort | () => void | - | - | 並び替えをクリックした時に発火するコールバック関数 |
| fixed | "left" \| "right" | - | - | 横スクロール時、カラムを左右いずれかに固定 |
| decorators | { sortDirectionIconAlt: (text: string, { sort }: { sort: sortTypes; }) => ReactNode; } | - | - | 文言を変更するための関数 |
| contentWidth | CellContentWidth | - | - | - |
| align | "left" \| "right" | - | - | - |
| vAlign | "bottom" \| "middle" \| "baseline" | - | - | - |

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
