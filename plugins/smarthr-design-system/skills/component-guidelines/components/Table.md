# Table

table要素の代替として表形式でデータを表示するためのコンポーネントです。データを行列で一覧表示するとき、レコードを並べて比較するビューを提示するときに使います。

他のコンポーネントと組み合わせることが多いため、具体的な使用方法はよくあるテーブル（https://smarthr.design/products/design-patterns/smarthr-table/）を参照してください。

## import

```ts
import { Table } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v103.1.0** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| reel | boolean | true | - | - |
| fixedHead | boolean | - | - | ヘッダーを固定するかどうか |
| borderType | "horizontal" \| "vertical" \| "both" \| "all" \| "outer" | - | - | 罫線の種類 |
| borderStyle | "solid" \| "dotted" \| "dashed" | - | - | 罫線のスタイル |
| rounded | boolean \| "right" \| "left" \| "top" \| "bottom" \| "all" | - | - | 角丸を適用する範囲 |
| layout | "auto" \| "fixed" | - | - | テーブルのレイアウト |

## 実装ルール

### a11y-prohibit-checkbox-or-radio-in-table-cell
テーブルセル（Th, Td）内に直接 Checkbox, RadioButton を配置することを禁止するルールです。<br /> SmartHR UI には、デフォルトでアクセシブルネームを設定する TdCheckbox, ThCheckbox, TdRadioButton といったより適切なコンポーネントが用意されています。

詳細は eslint-plugin-smarthr の各ルール README を参照してください。

## 使い方チェックリスト

> ℹ️ 各項目は SmartHR Design System の基準であり、守らなければならない規則ではありません。`[must]` は基本的に合わせる基準、`[should]` は状況に応じて判断する推奨、`[avoid]` は避けることを推奨する使い方です。`[must]` に合わせない場合や `[avoid]` の使い方を採用する場合は、理由を明示してください。

### アクセシビリティ > 開発時の考慮点 > セル内にチェックボックスやラジオボタンをそのまま配置しない
- [avoid] セルの内部に Checkbox や RadioButton をそのまま配置せず、TdCheckbox / ThCheckbox / TdRadioButton を利用する

### アクセシビリティ > 開発時の考慮点 > TdCheckboxおよびTdRadioButtonでは行を特定できる要素をIDで参照する
- [must] TdCheckbox および TdRadioButton を利用する場合は `aria-labelledby` 属性を必ず指定し、それだけで行を一意に判別できる要素への ID 参照を指定する
- [must] オブジェクト名だけで一意に判別できないオブジェクトでは、複数の要素の ID 参照をスペース区切りで指定する
