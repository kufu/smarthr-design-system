# RadioButtonPanel

RadioButtonをパネル型に視覚的強化した単一選択コンポーネントです。選択肢に説明やステータスを付加するとき、視覚的に強調して操作領域を確保するときに使います。

## import

```ts
import { RadioButtonPanel } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| label | ReactNode | - | ✓ | - |

## 実装ルール

RadioButtonPanel に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

### 使用上の注意 > 選択肢にラベルテキストを含む複数の要素を追加表示させる場合に使用する
- [should] 選択肢に補足説明やステータスを付加する場合、または選択肢を視覚的に強調したい場合に RadioButtonPanel を使用する
  - 選択肢を適切に選択させるために、補足説明のテキストやステータスラベルを含む複数の要素を追加したい場合
  - ラベルテキストが短く画面内の他の要素と比べて認識しづらいなどの理由で、選択肢を視覚的に強調して表示したい場合
- [should] 選択肢が同程度の長さで簡潔なラベルテキストのみの場合は、基本的に RadioButton を使用する

### 使用上の注意 > ビューの切り替えを操作するUIとして使用しない
- [must] RadioButtonPanel は入力後に `送信` や `保存` などの type=submit ボタンを押すことで反映される場面で使用する
  - 即時反映を前提とする箇所では RadioButtonPanel を使わず、TabBar / SegmentedControl / Switch を使用する

### 使用上の注意 > ラジオボタンパネル内に操作可能な要素を含めない
- [avoid] RadioButtonPanel 内にアンカーリンクやボタンなど、ユーザーが操作可能な要素を配置しない
  - リンクを置きたい場合は、Fieldset の `helpMessage` props などを使用する
  - 選択肢に応じて段階的に別の操作をさせたい場合は、RadioButton と `disabled` 状態の組み合わせ、またはステップを複数に分けたモードを検討する
