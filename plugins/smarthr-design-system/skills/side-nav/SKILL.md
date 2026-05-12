---
name: side-nav
description: "smarthr-ui の SideNavItemButton / SideNavItemAnchor / SideNav を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。ビューを適切な単位で分割して縦方向に並べ、切り替えるためのコンポーネントです。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

ビューを適切な単位で分割して縦方向に並べ、切り替えるためのコンポーネントです。

ビューを適切な単位で分割して縦方向に並べ、切り替えるためのコンポーネントです。項目設定のビューを切り替えるときなどに使います。

## import

```ts
import { SideNavItemButton, SideNavItemAnchor, SideNav } from 'smarthr-ui'
```

## Props

### SideNavItemButton
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| title | ReactNode | - | - | アイテムのタイトル @deprecated SideNav で items を使う時の props です。children を使ってください。 |
| size | "S" \| "M" | - | - | アイテムの大きさ |
| prefix | ReactNode | - | - | タイトルのプレフィックスの内容。通常、StatusLabelやIconの配置に用います。 |
| current | boolean | - | - | 選択されているアイテムかどうか |
| suffix | ReactNode | - | - | タイトルのサフィックスの内容。通常、Prefixを使用済みの場合にStatusLabelやChipの配置に用います。 |
| onClick | (e: MouseEvent<HTMLButtonElement, MouseEvent>) => void | - | - | - |

### SideNavItemAnchor
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| title | ReactNode | - | - | アイテムのタイトル @deprecated SideNav で items を使う時の props です。children を使ってください。 |
| size | "S" \| "M" | - | - | アイテムの大きさ |
| prefix | ReactNode | - | - | タイトルのプレフィックスの内容。通常、StatusLabelやIconの配置に用います。 |
| current | boolean | - | - | 選択されているアイテムかどうか |
| suffix | ReactNode | - | - | タイトルのサフィックスの内容。通常、Prefixを使用済みの場合にStatusLabelやChipの配置に用います。 |
| onClick | (e: MouseEvent<HTMLAnchorElement, MouseEvent>) => void | - | - | - |
| href | string | - | ✓ | - |
| elementAs | ElementType | - | - | next/link などのカスタムコンポーネントを指定します。指定がない場合はデフォルトで `a` タグが使用されます。 |

### SideNav
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| items | SideNavItemButtonProps[] | - | - | 各アイテムのデータの配列 @deprecated SideNavItemButton を使ってください |
| size | "S" \| "M" | M | - | 各アイテムの大きさ |
| onClick | (e: MouseEvent<HTMLAnchorElement \| HTMLButtonElement, MouseEvent>, id: string) => void | - | - | アイテムを押下したときに発火するコールバック関数 |
| className | string | - | - | コンポーネントに適用するクラス名 |
| rounded | boolean \| "all" \| "left" \| "right" \| "bottom" \| "top" | - | - | - |

## 実装ルール

SideNav に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
