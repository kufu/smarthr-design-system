---
name: desktop
description: "smarthr-ui の UserInfo / ActualUserInfo / ReleaseNotesDropdown / Navigation / DesktopHeader / AppLauncher を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。smarthr-ui の UserInfo / ActualUserInfo / ReleaseNotesDropdown / Navigation / DesktopHeader / AppLauncher コンポーネントの使い方ガイド。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

## import

```ts
import { UserInfo, ActualUserInfo, ReleaseNotesDropdown, Navigation, DesktopHeader, AppLauncher } from 'smarthr-ui'
```

## Props

### UserInfo
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| email | string | - | - | - |
| empCode | string | - | - | - |
| firstName | string | - | - | - |
| lastName | string | - | - | - |
| accountUrl | string | - | - | - |
| accountImageUrl | string | - | - | - |
| enableNew | boolean | - | - | - |
| tenants | Tenant[] | - | - | テナント一覧 |
| currentTenantId | string | - | - | 現在のテナント ID |
| desktopAdditionalContent | ReactNode | - | - | - |

### ActualUserInfo
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| email | string | - | - | - |
| empCode | string | - | - | - |
| firstName | string | - | - | - |
| lastName | string | - | - | - |
| accountUrl | string | - | - | - |
| accountImageUrl | string | - | - | - |
| enableNew | boolean | - | - | - |
| tenants | Tenant[] | - | - | テナント一覧 |
| currentTenantId | string | - | - | 現在のテナント ID |
| desktopAdditionalContent | ReactNode | - | - | - |
| displayName | string | - | ✓ | - |

### ReleaseNotesDropdown
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| indexUrl | string | - | ✓ | - |
| links | { title: string; url: string; }[] | - | ✓ | - |
| loading | boolean | - | - | - |
| error | boolean | - | - | - |

### Navigation
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| appName | ReactNode | - | ✓ | - |
| navigations | Navigation[] | - | ✓ | - |
| additionalContent | ReactNode | - | ✓ | - |
| releaseNote | ReleaseNoteProps | - | - | - |
| enableNew | boolean | - | - | - |

### DesktopHeader
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
| locale | LocaleProps | - | - | - |
| appName | ReactNode | - | - | - |
| schoolUrl | string | - | - | - |
| helpPageUrl | string | - | - | - |
| userInfo | UserInfoProps | - | - | - |
| desktopAdditionalContent | ReactNode | - | - | - |
| navigations | Navigation[] | - | - | - |
| desktopNavigationAdditionalContent | ReactNode | - | - | - |
| releaseNote | ReleaseNoteProps | - | - | - |
| features | { id: string; name: string; url: string; favorite: boolean; position?: number; }[] | - | - | - |
| mobileAdditionalContent | ReactNode | - | - | - |

### AppLauncher
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| features | { id: string; name: string; url: string; favorite: boolean; position?: number; }[] | - | ✓ | - |

## 実装ルール

desktop に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
