---
name: tab-bar
description: "異なるオブジェクトやビューを横方向のタブで切り替えるためのコンポーネントです。同一画面内で並列関係にあるビューを切り替えるとき、影響範囲を下線で明確にしながらタブを並べるときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

異なるオブジェクトやビューを横方向のタブで切り替えるためのコンポーネントです。同一画面内で並列関係にあるビューを切り替えるとき、影響範囲を下線で明確にしながらタブを並べるときに使います。

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
