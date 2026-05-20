---
name: notification-bar
description: "システムからの通知を表示するためのコンポーネントです。操作結果のフィードバックを表示するとき、ページ全体や特定領域に重要な状態を伝えるときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

システムからの通知を表示するためのコンポーネントです。操作結果のフィードバックを表示するとき、ページ全体や特定領域に重要な状態を伝えるときに使います。

## import

```ts
import { NotificationBar } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| base | "base" \| "none" | - | - | - |
| animate | boolean | - | - | - |
| bold | boolean | - | - | - |
| type | "error" \| "warning" \| "info" \| "success" \| "sync" | - | ✓ | - |
| subActionArea | ReactNode | - | - | コンポーネント右の領域 |
| onClose | () => void | - | - | 閉じるボタン押下時に発火させる関数 |
| role | "alert" \| "status" | - | - | role 属性 |
| layer | 0 \| 1 \| 2 \| 3 \| 4 | - | - | - |

## 実装ルール

NotificationBar に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
