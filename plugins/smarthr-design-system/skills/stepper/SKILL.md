---
name: stepper
description: "smarthr-ui の VerticalStepItem / Stepper / StepStatusIcon / StepCounter / HorizontalStepItem を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。連続する操作を、操作のステップごとにグルーピングするコンポーネントです。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

連続する操作を、操作のステップごとにグルーピングするコンポーネントです。

ステップの進行状況に応じて、現在地や完了のステータスを適切に表現してください。

## import

```ts
import { VerticalStepItem, Stepper, StepStatusIcon, StepCounter, HorizontalStepItem } from 'smarthr-ui'
```

## Props

### VerticalStepItem
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| label | ReactNode | - | ✓ | ステップラベル |
| status | "completed" \| "closed" \| { type: "completed" \| "closed"; text: string; } | - | - | 状態 |
| stepNumber | number | - | ✓ | ステップ数 |
| current | boolean | - | ✓ | 現在地かどうか |

### Stepper
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| type | "horizontal" \| "vertical" | - | ✓ | - |
| steps | Step[] \| VerticalStep[] | - | ✓ | type=vertical では子要素を持てる |
| activeIndex | number | - | - | 現在地。0始まり。 |

### StepStatusIcon
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| alt | ReactNode | - | - | アイコンの説明テキスト |
| size | "XXS" \| "XS" \| "S" \| "M" \| "L" \| "XL" \| "XXL" | - | - | アイコンの大きさ（フォントサイズの抽象値） @deprecated 親要素やデフォルトフォントサイズが継承されるため固定値の指定は非推奨 |
| color | string \| 'TEXT_BLACK' \| 'TEXT_GREY' \| 'TEXT_DISABLED' \| 'TEXT_LINK' \| 'MAIN' \| 'DANGER' \| 'WARNING' \| 'BRAND' | - | - | アイコンの色 |
| status | "completed" \| "closed" \| { type: "completed" \| "closed"; text: string; } | - | - | - |

### StepCounter
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| status | "completed" \| "closed" \| { type: "completed" \| "closed"; text: string; } | - | - | 状態 |
| stepNumber | number | - | - | - |
| current | boolean | - | ✓ | - |

### HorizontalStepItem
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| label | ReactNode | - | ✓ | ステップラベル |
| status | "completed" \| "closed" \| { type: "completed" \| "closed"; text: string; } | - | - | 状態 |
| stepNumber | number | - | ✓ | ステップ数 |
| current | boolean | - | ✓ | 現在地かどうか |
| isPrevStepCompleted | boolean | - | ✓ | 前のステップが完了しているかどうか |

## 実装ルール

Stepper に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
