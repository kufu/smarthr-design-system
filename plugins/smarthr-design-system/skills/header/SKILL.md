---
name: header
description: "アカウント設定やアプリ切替などSmartHR共通の横断機能を提供するヘッダーコンポーネントです。基本はAppHeaderの利用を推奨し、独自のヘッダー構成が必要なときのみHeader単体で使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

アカウント設定やアプリ切替などSmartHR共通の横断機能を提供するヘッダーコンポーネントです。基本はAppHeaderの利用を推奨し、独自のヘッダー構成が必要なときのみHeader単体で使います。

アカウント設定やアプリ切替などSmartHR共通の横断機能を提供するヘッダーコンポーネントです。基本は[AppHeader](/products/components/app-header/)の利用を推奨し、独自のヘッダー構成が必要なときのみHeader単体で使います。

## import

```ts
import { HeaderLink, HeaderDropdownMenuButton, Header } from 'smarthr-ui'
```

## Props

### HeaderLink
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| enableNew | boolean | - | - | - |

### HeaderDropdownMenuButton
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| trigger | ReactNode \| { children: ReactNode; size?: ButtonProps; onlyIcon?: boolean \| { component?: ComponentType<any>; }; } | - | ✓ | 引き金となるボタン |
| children | ReactNode \| ReactElement<any, string \| JSXElementConstructor<any>> \| ReactElement<any, string \| JSXElementConstructor<any>> \| ReactElement<...> \| ReactNode \| ReactElement<any, string \| JSXElementConstructor<any>> \| ReactElement<any, string \| JSXElementConstructor<any>> \| ReactElement<...>[] | - | ✓ | 操作群 |
| onOpen | () => void | - | - | ドロップダウンメニューが開かれた際のイベント |
| onClose | () => void | - | - | ドロップダウンメニューが閉じられた際のイベント |
| ref | Ref<HTMLButtonElement> | - | - | - |

### Header
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| logo | ReactElement<any, string \| JSXElementConstructor<any>> | - | - | ロゴ |
| logoHref | string | - | - | ロゴリンク |
| featureName | ReactNode | - | - | 機能名（enableNew と合わせて使います） |
| apps | Category[] | - | - | 機能群（enableNew と合わせて使います） |
| tenants | Tenant[] | - | - | テナント一覧 |
| currentTenantId | string | - | - | 現在のテナント ID |
| onTenantSelect | (id: string) => void | - | - | テナントが選択された時に発火するコールバック関数 |
| enableNew | boolean | - | - | @deprecated internal-ui から利用するので使わないでください。 |

## 実装ルール

Header に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

使い方チェックリスト（Layer 3）は設定されていません。
