---
name: header
description: "smarthr-ui の HeaderLink / HeaderDropdownMenuButton / Header を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。アカウントやシステムの設定、およびSmartHR内の他のアプリケーションへの横断的なアクセスを提供するコンポーネントです。ページの最上部に配置されます。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

アカウントやシステムの設定、およびSmartHR内の他のアプリケーションへの横断的なアクセスを提供するコンポーネントです。ページの最上部に配置されます。

複数のSmartHRのプロダクトを使っていたとしても同じSmartHRブランドの製品であることをユーザーが認知できるよう、共通のHeaderを提供します。 レイアウトなどは[AppHeader](/products/components/app-header/)を参照してください。

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

_checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
