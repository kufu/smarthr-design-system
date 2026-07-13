# SingleCombobox

選択肢から1つの値を選択しつつテキスト入力での絞り込みや値追加もできる選択コンポーネントです。6個以上の選択肢から検索しながら1つを選択するときに使います。

## import

```ts
import { SingleCombobox } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v97.0.0** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

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

### 使用上の注意 > 単一選択の場合に使用する
- [must] 値を複数選択させたい場合は MultiCombobox を使用する

### 使用上の注意 > 選択肢が6個以上の場合に使用する
- [should] 選択肢の数が 6 個以上で、ユーザーにテキスト入力で値を追加させたり、値を絞り込んで選択させたい場合は SingleCombobox を使用する
- [should] 選択肢が 5 個以下であれば、初期状態で選択肢が一覧できる RadioButton を使用する
- [should] RadioButton を配置する十分スペースがない場合は、SingleCombobox や Select の使用を検討する

### 使用上の注意 > 入力補助のヒントメッセージとしてプレースホルダを使用しない
- [avoid] 入力補助のヒントメッセージとしてプレースホルダ（`placeholder`）を使用しない
- [must] 入力補助のヒントメッセージを表示したい場合は、`dropdownHelpMessage` または FormControl の `helpMessage` を使用する
- [must] ヒントメッセージを常に表示したい場合は、FormControl の `helpMessage` を使用する

### 状態 > 無効（disabled）
- [should] 無効状態にする場合は、そもそも無効ではなくフォーム自体を非表示にしたり、無効状態の理由を付近に表示することを検討する

### 状態 > 選択肢にない値の追加
- [should] ユーザーがその場で選択肢を追加できるようにしたい場合は、`creatable` を適用してコールバック関数 `onAdd` を適切に実装する
