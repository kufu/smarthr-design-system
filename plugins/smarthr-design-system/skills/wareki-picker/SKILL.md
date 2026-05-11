---
name: wareki-picker
description: "smarthr-ui の WarekiPicker を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。和暦の日付を西暦に変換する機能と和暦をプレビューする機能をもった入力要素です。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

和暦の日付を西暦に変換する機能と和暦をプレビューする機能をもった入力要素です。

例えば、「令和4年12月3日」という日付を入力欄に貼り付けると「2022-12-03」に変換する機能を備えています。

## import

```ts
import { WarekiPicker } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| disabled | boolean | - | - | フォームを無効にするかどうか |
| name | string | - | - | input 要素の `name` 属性の値 |
| placeholder | string | - | - | placeholder属性は非推奨です。別途ヒント用要素を設置するか、それらの領域を確保出来ない場合はTooltipコンポーネントの利用を検討してください。 |
| value | string | - | - | input 要素の `value` 属性の値 |
| width | string \| number | - | - | コンポーネントの幅 |
| onChange | (e: ChangeEvent<HTMLInputElement>, other: { date: Date; formatValue: string; errors: string[]; }) => void | - | - | 選択された日付が変わった時に発火するコールバック関数 |
| from | Date | - | - | 選択可能な期間の開始日 |
| to | Date | - | - | 選択可能な期間の終了日 |
| error | boolean | - | - | フォームにエラーがあるかどうか |
| parseInput | (input: string) => Date | - | - | 入力を独自にパースする場合に、パース処理を記述する関数 |
| formatDate | (date: Date) => string | - | - | 表示する日付を独自にフォーマットする場合に、フォーマット処理を記述する関数 |
| onChangeDate | (date: Date, value: string, other: { errors: string[]; }) => void | - | - | @deprecated onChangeDate は非推奨です。onChange を使ってください。 |

## 実装ルール

WarekiPicker に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
