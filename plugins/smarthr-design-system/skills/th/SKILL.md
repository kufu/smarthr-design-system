---
name: th
description: "th要素の代替としてテーブルの列見出しセルを表すコンポーネントです。"
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
| vAlign | "baseline" \| "middle" \| "bottom" | - | - | - |

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

### 使用上の注意
- [should] 原則としてデータの編集や送信を伴わない画面においてデータを表示する場合は DefinitionList を使用するのを推奨する

### 使用上の注意 > Inputの意匠を残してデータを表示したいときはreadOnlyのInputを検討する
- [should] フォームに入力した内容の確認画面など、Input の意匠を残してデータを表示したい場合は DefinitionList ではなく readOnly の Input の利用を検討する

### レイアウト > カラム数の指定
- [must] 表示したいデータの内容に合わせて `maxColumns` props で適切な列数を指定する

### レイアウト > カラム数の指定 > 関連性のある項目がある場合
- [should] 関連性のある項目（例: 氏名とヨミガナ）は横に並べて表示することで関連性をユーザーに伝える
- [must] 関連性のある項目を横並びにする場合は `maxColumns` props に横並びにしたい項目の数を指定する

### レイアウト > カラム数の指定 > 意図的に項目を一列で表示したい場合
- [must] 画面幅や項目の文字数にかかわらず意図的に項目を一列で表示したい場合は `maxColumns` props に `1` を指定する

### レイアウト > 見出しの種類
- [must] コンテンツのアウトラインに沿って適切な見出しレベルを指定する
  - DefinitionList を含むコンテンツの見出しが `sectionTitle` の場合、`termStyleType` props に `blockTitle` を指定する

### レイアウト > 表示項目が1つしかない場合
- [should] 表示項目が 1 つしかない場合に罫線が視線誘導を妨げるなら別の意匠を検討する
