---
name: badge
description: "件数などの数値を視覚的に表すためのコンポーネントです。Iconなどの視覚情報が少ない要素に変化が発生していることを通知バッジとして知らせるときにも使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

件数などの数値を視覚的に表すためのコンポーネントです。Iconなどの視覚情報が少ない要素に変化が発生していることを通知バッジとして知らせるときにも使います。

## import

```ts
import { Badge } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| count | number | - | - | 件数 |
| overflowCount | number | - | - | 最大表示件数。この数を超えた場合は{最大表示件数+}と表示される |
| showZero | boolean | - | - | 0値を表示するかどうか |
| type | "grey" \| "blue" \| "red" \| "yellow" | - | - | 色の種類 |
| dot | boolean | - | - | ドット表示するかどうか |

## 実装ルール

Badge に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
