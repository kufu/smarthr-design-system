---
name: side-menu
description: "複数のページを切り替えるためのサイドナビゲーションコンポーネントです。「サイドナビゲーションとコンテンツの2カラム」ページレイアウトで、AppNaviの下層に多数のページ項目を配置するときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

複数のページを切り替えるためのサイドナビゲーションコンポーネントです。「サイドナビゲーションとコンテンツの2カラム」ページレイアウトで、AppNaviの下層に多数のページ項目を配置するときに使います。

複数のページを切り替えるためのサイドナビゲーションコンポーネントです。「[サイドナビゲーションとコンテンツの2カラム](/products/design-patterns/page-layout/#h3-12)」ページレイアウトで、[AppNavi](/products/components/app-navi/)の下層に多数のページ項目を配置するときに使います。

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
