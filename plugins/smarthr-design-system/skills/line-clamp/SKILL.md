---
name: line-clamp
description: "smarthr-ui の LineClamp を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。内包するテキストが指定した幅や高さを越えて存在するときに、Tooltipを用いて全文を表示するためのコンポーネントです。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

内包するテキストが指定した幅や高さを越えて存在するときに、Tooltipを用いて全文を表示するためのコンポーネントです。

内包するテキストが指定した幅や高さを越えて存在するときに、[Tooltip](/products/components/tooltip/)や[Disclosure](/products/components/disclosure/)を用いて全文を表示するためのコンポーネントです。

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

_checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
