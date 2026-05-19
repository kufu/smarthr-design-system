---
name: tooltip
description: "補足説明テキストをホバーやフォーカスで一時的に表示するためのツールチップコンポーネントです。アイコンのみボタンへのラベル付け、LineClampで省略したテキストの全文表示など、限られたスペースで補足情報を添えるときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

補足説明テキストをホバーやフォーカスで一時的に表示するためのツールチップコンポーネントです。アイコンのみボタンへのラベル付け、LineClampで省略したテキストの全文表示など、限られたスペースで補足情報を添えるときに使います。

WarningIcon, FaArrowDownIcon, FaArrowLeftIcon, FaArrowRightIcon, FaArrowUpIcon, FaCircleInfoIcon, FaCirclePlusIcon, FaFileIcon, FaUserLargeIcon, TextLink } from 'smarthr-ui'

## import

```ts
import { Tooltip } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| message | ReactNode | - | ✓ | ツールチップ内に表示するメッセージ |
| triggerType | "text" \| "icon" | - | - | ツールチップを表示する対象のタイプ。アイコンの場合は `icon` を指定する |
| ellipsisOnly | boolean | - | - | `true` のとき、ツールチップを表示する対象が省略されている場合のみツールチップ表示を有効にする |
| tabIndex | number | 0 | - | ツールチップを表示する対象の tabIndex 値 |
| ariaDescribedbyTarget | "wrapper" \| "inner" | wrapper | - | ツールチップを内包要素に紐付けるかどうか |

## 実装ルール

Tooltip に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
