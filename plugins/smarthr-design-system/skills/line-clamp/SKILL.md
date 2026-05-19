---
name: line-clamp
description: "テキストが指定幅・高さを超えるときに省略表示しTooltipで全文を見せるためのコンポーネントです。長い文字列を行数制限で省略させるときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

テキストが指定幅・高さを超えるときに省略表示しTooltipで全文を見せるためのコンポーネントです。長い文字列を行数制限で省略させるときに使います。

テキストが指定幅・高さを超えるときに省略表示し[Tooltip](/products/components/tooltip/)で全文を見せるためのコンポーネントです。長い文字列を行数制限で省略させるときに使います。

## import

```ts
import { LineClamp } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| maxLines | 1 \| 2 \| 3 \| 4 \| 5 \| 6 | 3 | - | - |
| ref | Ref<HTMLSpanElement> | - | - | - |

## 実装ルール

LineClamp に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
