---
name: icon
description: "smarthr-ui の generateIcon / WarningIcon / SparklesIcon / LanguageIcon を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。アイデアやアクションを表すための視覚的な要素を表示するためのコンポーネントです。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

アイデアやアクションを表すための視覚的な要素を表示するためのコンポーネントです。

FaAddressBookIcon, FaAddressCardIcon, FaAnglesLeftIcon, FaAnglesRightIcon, FaCirclePlusIcon, FaArrowRightIcon, FaUserLargeIcon, FaPenIcon, FaCircleXmarkIcon, OpenInNewTabIcon, WarningIcon, FaGearIcon, Cluster, Text, TextLink, Button, Td, DefinitionList, DefinitionListItem, Chip, } from 'smarthr-ui'

## import

```ts
import { generateIcon, WarningIcon, SparklesIcon, LanguageIcon } from 'smarthr-ui'
```

## Props

### generateIcon
（固有 Props なし）

### WarningIcon
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| alt | ReactNode | - | - | アイコンの説明テキスト |
| size | "XXS" \| "XS" \| "S" \| "M" \| "L" \| "XL" \| "XXL" | - | - | アイコンの大きさ（フォントサイズの抽象値） @deprecated 親要素やデフォルトフォントサイズが継承されるため固定値の指定は非推奨 |
| color | string \| 'TEXT_BLACK' \| 'TEXT_GREY' \| 'TEXT_DISABLED' \| 'TEXT_LINK' \| 'MAIN' \| 'DANGER' \| 'WARNING' \| 'BRAND' | - | - | アイコンの色 |

### SparklesIcon
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| alt | ReactNode | - | - | アイコンの説明テキスト |
| size | "XXS" \| "XS" \| "S" \| "M" \| "L" \| "XL" \| "XXL" | - | - | アイコンの大きさ（フォントサイズの抽象値） @deprecated 親要素やデフォルトフォントサイズが継承されるため固定値の指定は非推奨 |
| color | string \| 'TEXT_BLACK' \| 'TEXT_GREY' \| 'TEXT_DISABLED' \| 'TEXT_LINK' \| 'MAIN' \| 'DANGER' \| 'WARNING' \| 'BRAND' | - | - | アイコンの色 |

### LanguageIcon
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| alt | ReactNode | - | - | アイコンの説明テキスト |
| size | "XXS" \| "XS" \| "S" \| "M" \| "L" \| "XL" \| "XXL" | - | - | アイコンの大きさ（フォントサイズの抽象値） @deprecated 親要素やデフォルトフォントサイズが継承されるため固定値の指定は非推奨 |
| color | string \| 'TEXT_BLACK' \| 'TEXT_GREY' \| 'TEXT_DISABLED' \| 'TEXT_LINK' \| 'MAIN' \| 'DANGER' \| 'WARNING' \| 'BRAND' | - | - | アイコンの色 |

## 実装ルール

Icon に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
