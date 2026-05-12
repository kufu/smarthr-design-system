---
name: single-combobox
description: "選択肢一覧から1つ選択 + 自由入力もできる入力欄を置くとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するときに使う。選択肢の中から単一の値を選択するコンポーネントです。テキスト入力によって選択肢を絞り込んだり、選択肢に新たな値を追加できます。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

選択肢の中から単一の値を選択するコンポーネントです。テキスト入力によって選択肢を絞り込んだり、選択肢に新たな値を追加できます。

## import

```ts
import { SingleCombobox } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| items | ComboboxItem<T>[] | - | ✓ | 選択可能なアイテムのリスト |
| name | string | - | - | input 要素の `name` 属性の値 |
| disabled | boolean | - | - | input 要素の `disabled` 属性の値 |
| required | boolean | - | - | input 要素の `required` 属性の値 |
| className | string | - | - | コンポーネント内の一番外側の要素に適用するクラス名 |
| error | boolean | - | - | `true` のとき、コンポーネントの外枠が `DANGER` カラーになる |
| creatable | boolean | - | - | `true` のとき、 `items` 内に存在しないアイテムを新しく追加できるようになる |
| placeholder | string | - | - | input 要素の `placeholder` 属性の値 |
| isLoading | boolean | - | - | `true` のとき、ドロップダウンリスト内にローダーを表示する |
| width | string \| number | - | - | input 要素の `width` スタイルに適用する値 |
| dropdownHelpMessage | ReactNode | - | - | ドロップダウンリスト内に表示するヘルプメッセージ |
| dropdownWidth | string \| number | auto | - | ドロップダウンリストの `width` スタイルに適用する値 |
| onChangeInput | (e: ChangeEvent<HTMLInputElement>) => void | - | - | input 要素の `value` が変わった時に発火するコールバック関数 |
| onAdd | (label: string) => void | - | - | `items` 内に存在しないアイテムが追加されたときに発火するコールバック関数 |
| onSelect | (item: ComboboxItem<T>) => void | - | - | アイテムが選択された時に発火するコールバック関数 |
| onChange | (e: ChangeEvent<HTMLInputElement>) => void | - | - | input 要素の `value` が変わった時に発火するコールバック関数 @deprecated `onChange` は非推奨なため、 代わりに `onChangeInput` を使用してください。 |
| selectedItem | ComboboxItem<T> | - | ✓ | 選択されているアイテム |
| defaultItem | ComboboxItem<T> | - | - | デフォルトで選択されるアイテム |
| prefix | ReactNode | - | - | コンポーネント内の先頭に表示する内容 |
| onClear | () => void | - | - | 選択されているアイテムがクリアされた時に発火するコールバック関数 |
| onClearClick | (e: MouseEvent<Element, MouseEvent>) => void | - | - | 選択されているアイテムがクリアされた時に発火するコールバック関数 指定している場合、クリア時にonClickを実行せずにonClearClickのみ実行する |
| onChangeSelected | (selectedItem: ComboboxItem<T>) => void | - | - | 選択されているアイテムのリストが変わった時に発火するコールバック関数 |
| onFocus | () => void | - | - | コンポーネントがフォーカスされたときに発火するコールバック関数 |
| onBlur | () => void | - | - | コンポーネントからフォーカスが外れた時に発火するコールバック関数 |
| noResultText | ReactNode | - | - | 検索結果が0件の時に表示するコンテンツ |

## 実装ルール

SingleCombobox に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

_checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
