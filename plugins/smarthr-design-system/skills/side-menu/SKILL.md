---
name: side-menu
description: "smarthr-ui の SideMenuItem / SideMenuGroup / SideMenu を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。複数のページを切り替えるためのコンポーネントです。主にページレイアウト「サイドナビゲーションとコンテンツの2カラム」で使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

複数のページを切り替えるためのコンポーネントです。主にページレイアウト「サイドナビゲーションとコンテンツの2カラム」で使います。

複数のページを切り替えるためのコンポーネントです。主にページレイアウト「[サイドナビゲーションとコンテンツの2カラム](/products/design-patterns/page-layout/#h2-7)」で使います。

## import

```ts
import { SideMenuItem, SideMenuGroup, SideMenu } from 'smarthr-ui'
```

## Props

### SideMenuItem
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| elementAs | ElementType | - | - | - |
| current | boolean | - | - | - |
| prefix | ReactNode | - | - | - |
| suffix | ReactNode | - | - | - |

### SideMenuGroup
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| heading | ReactNode | - | ✓ | - |

### SideMenu
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| radius | "s" \| "m" | - | - | - |
| layer | 0 \| 1 \| 2 \| 3 \| 4 | - | - | - |
| elementAs | "ol" \| "ul" | ul | - | - |

## 実装ルール

SideMenu に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
