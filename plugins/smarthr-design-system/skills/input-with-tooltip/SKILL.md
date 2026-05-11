---
name: input-with-tooltip
description: "smarthr-ui の InputWithTooltip を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。smarthr-ui の InputWithTooltip コンポーネントの使い方ガイド。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

## import

```ts
import { InputWithTooltip } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| placeholder | string | - | - | @deprecated placeholder属性は非推奨です。別途ヒント用要素を設置するか、それらの領域を確保出来ない場合はTooltipコンポーネントの利用を検討してください。 |
| type | string | - | - | input 要素の `type` 値 |
| width | string \| number | - | - | コンポーネントの幅 |
| autoFocus | boolean | - | - | オートフォーカスを行うかどうか |
| prefix | ReactNode | - | - | コンポーネント内の先頭に表示する内容 |
| error | boolean | - | - | フォームにエラーがあるかどうか |
| suffix | ReactNode | - | - | コンポーネント内の末尾に表示する内容 |
| bgColor | "BACKGROUND" \| "COLUMN" \| "BASE_GREY" \| "OVER_BACKGROUND" \| "HEAD" \| "BORDER" \| "ACTION_BACKGROUND" | - | - | 背景色。readOnly を下地の上に載せる場合に使う |
| tooltipMessage | ReactNode | - | ✓ | 入力欄に紐付けるツールチップに表示するメッセージ |

## 実装ルール

InputWithTooltip に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
