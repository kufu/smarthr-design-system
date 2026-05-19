---
name: calendar
description: "smarthr-ui の Calendar を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。カレンダーを表示し日付を選択するためのコンポーネントです。基本的にDatePickerやWarekiPickerの内部部品として使われるため、単独では使用しません。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

カレンダーを表示し日付を選択するためのコンポーネントです。基本的にDatePickerやWarekiPickerの内部部品として使われるため、単独では使用しません。

カレンダーを表示し日付を選択するためのコンポーネントです。基本的に[DatePicker](/products/components/date-picker/)や[WarekiPicker](/products/components/wareki-picker/)の内部部品として使われるため、単独では使用しません。

## import

```ts
import { Calendar } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| value | Date | - | - | 選択された日付 |
| from | Date | new Date(1900, 0, 1) | - | 選択可能な開始日 |
| to | Date | - | - | 選択可能な終了日 |
| onSelectDate | (e: MouseEvent<Element, MouseEvent>, date: Date) => void | - | ✓ | トリガのセレクトイベントを処理するハンドラ |

## 実装ルール

Calendar に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
