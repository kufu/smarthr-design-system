# Header

アカウント設定やアプリ切替などSmartHR共通の横断機能を提供するヘッダーコンポーネントです。基本はAppHeaderの利用を推奨し、独自のヘッダー構成が必要なときのみHeader単体で使います。

複数のSmartHRのプロダクトを使っていたとしても同じSmartHRブランドの製品であることをユーザーが認知できるよう、共通のHeaderを提供します。

## import

```ts
import { HeaderLink, HeaderDropdownMenuButton, Header } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v98.1.0** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

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
