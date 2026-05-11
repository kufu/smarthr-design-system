---
name: calendar
description: "smarthr-ui の YearPicker / CalendarTable / Calendar を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。カレンダーを表示し日付を選択するためのコンポーネントです。基本的にはDatePickerと合わせて使用されるため、単独で使用することはありません。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

カレンダーを表示し日付を選択するためのコンポーネントです。基本的にはDatePickerと合わせて使用されるため、単独で使用することはありません。 

Calendarコンポーネントは、カレンダーを表示し日付を選択するためのコンポーネントです。基本的には[DatePicker](/products/components/date-picker/)と合わせて使用されるため、単独で使用することはありません。

## import

```ts
import { YearPicker, CalendarTable, Calendar } from 'smarthr-ui'
```

## Props

### YearPicker
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| selectedYear | number | - | - | 選択された年 |
| fromYear | number | - | ✓ | 選択可能な開始年 |
| toYear | number | - | ✓ | 選択可能な終了年 |
| onSelectYear | (e: MouseEvent<HTMLButtonElement, MouseEvent>) => void | - | ✓ | トリガのセレクトイベントを処理するハンドラ |
| isDisplayed | boolean | - | ✓ | 表示フラグ |

### CalendarTable
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| current | { day: Dayjs; months: number[][]; } | - | ✓ | 現在の日付 |
| from | Date | - | ✓ | 選択可能な開始日 |
| to | Date | - | ✓ | 選択可能な終了日 |
| onSelectDate | (e: MouseEvent<Element, MouseEvent>, date: Date) => void | - | ✓ | トリガのセレクトイベントを処理するハンドラ |
| selectedDayText | string | - | ✓ | 選択された日付 |

### Calendar
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
