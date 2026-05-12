---
name: tab-bar
description: "smarthr-ui の TabItem / TabBar を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。ユーザーの関心が近いものを並列化し、ビューを切り替えるためのコンポーネントです。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

ユーザーの関心が近いものを並列化し、ビューを切り替えるためのコンポーネントです。

## import

```ts
import { TabItem, TabBar } from 'smarthr-ui'
```

## Props

### TabItem
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| suffix | ReactNode | - | - | ボタン内の末尾に表示する内容 |
| selected | boolean | false | - | `true` のとき、タブが選択状態のスタイルになる |
| disabled | boolean | - | - | `true` のとき、タブを無効状態にしてクリック不能にする |
| disabledReason | { icon?: ReactNode; message: ReactNode; } | - | - | 無効な理由 |
| onClick | (tabId: string) => void | - | ✓ | タブをクリックした時に発火するコールバック関数 |

### TabBar
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| bordered | boolean | - | - | `true` のとき、TabBar に下線を表示する |

## 実装ルール

TabBar に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
