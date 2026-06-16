# Timeline

情報を時間の流れに沿って整理・表示するためのコンポーネントです。操作履歴や更新履歴を時系列で見せるときに使います。

## import

```ts
import { TimelineItem, Timeline } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v96.0.1** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

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

使い方チェックリスト（Layer 3）は設定されていません。
