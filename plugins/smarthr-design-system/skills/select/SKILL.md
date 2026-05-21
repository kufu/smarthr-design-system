---
name: select
description: "select要素の代替として選択肢から1つの値を選ばせるドロップダウンコンポーネントです。6個以上の選択肢を検索不要で効率よくレイアウトするときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer2+layer3
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

### 使用上の注意 > 選択肢が6個以上の場合に使用する
- [should] 基本的に選択肢の数が 6 個以上になる場合は Select を使う

### 使用上の注意 > 選択肢が6個以上の場合に使用する > 選択肢が5個以下の場合
- [should] 選択肢が 5 個以下であれば RadioButton の使用を検討する
  - RadioButton で配置するスペースがない場合は Select も使用可能

### 使用上の注意 > 選択肢が6個以上の場合に使用する > 選択肢の数が不定の場合
- [should] 選択肢の数が実装時に固定できない場合は想定される最大数を考慮して使用するコンポーネントを判断する

### 使用上の注意 > SingleComboboxとの使い分け
- [should] 単一選択かつユーザーに選択肢をフィルタリングさせたい場合は SingleCombobox の使用を検討する

### 使用上の注意 > 即時反映が期待されるビューの切り替えには使わない
- [avoid] 即時反映が期待されるビューの切り替えに Select を使わない
  - ビューの切り替えには TabBar や SegmentedControl、SideNav を使う

### 状態 > デフォルト
- [should] デフォルトは空の状態で表示する
  - ユーザーの入力作業が向上したりミスを減らせる場合には他の選択肢を設定することを検討する
