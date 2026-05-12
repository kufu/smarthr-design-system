---
name: timeline
description: "smarthr-ui の TimelineItem / Timeline を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。情報を時間の流れに沿って、見やすく整理・表示するコンポーネントです。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

情報を時間の流れに沿って、見やすく整理・表示するコンポーネントです。

## import

```ts
import { TimelineItem, Timeline } from 'smarthr-ui'
```

## Props

### TimelineItem
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| datetime | string \| Date | - | ✓ | - |
| dateLabel | string | - | - | 日付の代わりに表示するテキスト |
| timeFormat | "none" \| "HH:mm:ss" \| "HH:mm" | HH:mm | - | 時刻のフォーマット |
| dateSuffixArea | ReactNode | - | - | 日付のサフィックス領域 |
| sideActionArea | ReactNode | - | - | サイドアクション領域 |
| current | boolean | - | - | 現在のアイテムかどうか |

### Timeline
（固有 Props なし）

## 実装ルール

Timeline に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
