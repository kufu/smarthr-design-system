# RadioButton

input[type='radio']要素の代替として選択肢から1つだけ選ばせる選択コンポーネントです。5個以下の選択肢をラベル短く一覧で見せるときに使います。

## import

```ts
import { RadioButton } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v96.0.1** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

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

### 使用上の注意 > ユースケースに応じてコンポーネントを使い分ける > 選択肢が多すぎる場合は別のコンポーネントを検討する
- [should] 選択肢の中から単一の値を選択して入力させる場合は、基本的にラジオボタンを使用する
  - 選択肢の数が不定で予測できないなどの理由がない限りはラジオボタンの使用を推奨する
- [should] 選択肢のラベルテキストが長大、または選択肢が表示領域に収まらないほど多い場合は Select や SingleCombobox も検討する

### 使用上の注意 > ユースケースに応じてコンポーネントを使い分ける > 選択肢のラベルテキストはなるべく簡潔に同程度の文量で収める
- [must] ラジオボタンのラベルテキストは同程度の文量や行数になるように調整する
- [should] 選択肢に補足説明やステータスラベルなど複数要素を追加したい場合や、選択肢を視覚的に強調したい場合は RadioButtonPanel を検討する

### 使用上の注意 > ユースケースに応じてコンポーネントを使い分ける > ビューの切り替えを操作するUIとして使用しない
- [must] ラジオボタンは入力後に `送信` や `保存` などの type="submit" のボタンを押すことで内容が反映される場合に使用する
- [must] 即時反映を前提とする箇所では TabBar や SegmentedControl、または Switch を使用する

### 使用上の注意 > ユースケースに応じてコンポーネントを使い分ける > ラジオボタンの並び順
- [should] 横幅に十分なスペースがある場合は基本的に横並びにする
  - 選択肢の文字が長くなる場合は縦並びを検討する

### 使用上の注意 > ラジオボタン内に操作可能な要素を含めない
- [avoid] ラジオボタン内には、ヘルプページへのリンクや Input など、ユーザーが値を選択する以外の操作可能な要素を配置しない
- [must] リンクを置きたい場合は Fieldset の `helpMessage` props などを使用する
- [should] Combobox などで選択肢に応じて段階的に別の操作をさせたい場合は、RadioButton と `disabled` 状態の組み合わせ、またはステップを複数に分けたモードを検討する

### 状態 > デフォルト
- [must] 選択肢の中から 1 つデフォルト値に設定するものを決める

### デザインパターン > 選択肢のグルーピング
- [should] 複数の選択肢を持つ項目をいくつも並べて表示する場合は、ラベルがかかる範囲や設定項目ごとの選択肢を区別しやすくするため BaseColumn でグルーピングする

### モバイル
- [should] モバイルでは画面幅が狭いため基本的に縦並びにする
- [must] 誤操作を防ぐため、小さい要素間のマージンに従って十分なマージンを確保する
