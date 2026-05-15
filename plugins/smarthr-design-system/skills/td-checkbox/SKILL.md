---
name: td-checkbox
description: "smarthr-ui の TdCheckbox を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。チェックボックスを内包するTdです。aria-labelledby属性が必須です。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer2+layer3
---

チェックボックスを内包するTdです。aria-labelledby属性が必須です。

他のコンポーネントと組み合わせることが多いため、具体的な使用方法は[よくあるテーブル](/products/design-patterns/smarthr-table/)を参照してください。

## import

```ts
import { TdCheckbox } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| aria-labelledby | string | - | ✓ | Checkboxのaccessible nameとして設定するテキストを参照するためのid属性値。同じ親Tr配下のTdかTh、もしくはその子孫要素のidを指定する。複数要素のテキストを指定する場合は空白区切りでidをつなぐ |
| error | boolean | - | - | チェックボックスにエラーがあるかどうか |
| mixed | boolean | - | - | `true` のとき、チェック状態を `mixed` にする |
| vAlign | "baseline" \| "middle" | - | - | - |
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
