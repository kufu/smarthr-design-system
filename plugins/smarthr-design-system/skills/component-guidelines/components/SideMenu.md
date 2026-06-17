# SideMenu

複数のページを切り替えるためのサイドナビゲーションコンポーネントです。「サイドナビゲーションとコンテンツの2カラム」ページレイアウトで、AppNaviの下層に多数のページ項目を配置するときに使います。

## import

```ts
import { SideMenuItem, SideMenuGroup, SideMenu } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v96.0.1** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

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

### モバイル
- [avoid] 横幅の狭いモバイルでは SideMenu を使わない
