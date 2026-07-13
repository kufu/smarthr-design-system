# Calendar

カレンダーを表示し日付を選択するためのコンポーネントです。基本的にWarekiPickerやDatePicker（非推奨）の内部部品として使われるため、単独では使用しません。

## import

```ts
import { Calendar } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v97.0.0** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| value | Date | - | - | 選択された日付 |
| from | Date | new Date(1900, 0, 1) | - | 選択可能な開始日 |
| to | Date | - | - | 選択可能な終了日 |
| onSelectDate | (e: MouseEvent<Element, MouseEvent>, date: Date) => void | - | ✓ | トリガのセレクトイベントを処理するハンドラ |

## 実装ルール

Calendar に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

使い方チェックリスト（Layer 3）は設定されていません。
