# ThCheckbox

Checkboxを内包する列見出しセル（Th）の派生コンポーネントです。「テーブル内の一括操作」パターンにおいて、テーブル全行の一括選択UIを列見出しに配置するときに使います。

他のコンポーネントと組み合わせることが多いため、具体的な使用方法はよくあるテーブル（https://smarthr.design/products/design-patterns/smarthr-table/）を参照してください。

## import

```ts
import { ThCheckbox } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v96.0.1** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| error | boolean | - | - | チェックボックスにエラーがあるかどうか |
| mixed | boolean | - | - | `true` のとき、チェック状態を `mixed` にする |
| vAlign | "bottom" \| "middle" \| "baseline" | - | - | - |
| fixed | "left" \| "right" | - | - | 横スクロール時、カラムを左右いずれかに固定 |

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
