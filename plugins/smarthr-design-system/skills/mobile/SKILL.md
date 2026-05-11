---
name: mobile
description: "smarthr-ui の UserInfo / TenantSelector / ReleaseNote / NavigationItem / Navigation / MobileHeader / MenuSubHeading / MenuDialog / Content / MenuButton / MenuAccordion / Menu / LanguageSelector / Help / AppLauncherFilterDropdown / AppLauncher を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。smarthr-ui の UserInfo / TenantSelector / ReleaseNote / NavigationItem / Navigation / MobileHeader / MenuSubHeading / MenuDialog / Content / MenuButton / MenuAccordion / Menu / LanguageSelector / Help / AppLauncherFilterDropdown / AppLauncher コンポーネントの使い方ガイド。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer2
---

## import

```ts
import { UserInfo, TenantSelector, ReleaseNote, NavigationItem, Navigation, MobileHeader, MenuSubHeading, MenuDialog, Content, MenuButton, MenuAccordion, Menu, LanguageSelector, Help, AppLauncherFilterDropdown, AppLauncher } from 'smarthr-ui'
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
| locale | LocaleProps | - | - | - |

### TenantSelector
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| tenants | Tenant[] | - | - | - |
| currentTenantId | string | - | - | - |
| onTenantSelect | (id: string) => void | - | - | - |

### ReleaseNote
（固有 Props なし）

### NavigationItem
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| navigation | Navigation | - | ✓ | - |
| onClickNavigation | () => void | - | ✓ | - |

### Navigation
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| navigations | Navigation[] \| (ChildNavigation \| ChildNavigationGroup)[] | - | ✓ | - |
| onClickNavigation | () => void | - | ✓ | - |

### MobileHeader
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

### MenuSubHeading
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| title | ReactNode | - | ✓ | - |
| onClickBack | () => void | - | ✓ | - |

### MenuDialog
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| isOpen | boolean | - | ✓ | - |
| setIsOpen | Dispatch<boolean> | - | ✓ | - |
| tenantSelector | ReactNode | - | ✓ | - |

### Content
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| setIsOpen | Dispatch<boolean> | - | ✓ | - |
| tenantSelector | ReactNode | - | ✓ | - |
| domRef | RefObject<HTMLSelectElement> | - | ✓ | - |

### MenuButton
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| onClick | () => void | - | ✓ | - |
| isCurrent | boolean | - | - | - |

### MenuAccordion
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| isOpen | boolean | - | ✓ | - |
| setIsOpen | Dispatch<(isOpen: boolean) => boolean> | - | ✓ | - |
| title | ReactNode | - | ✓ | - |

### Menu
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| appName | ReactNode | - | ✓ | - |
| tenantSelector | ReactNode | - | ✓ | - |
| additionalContent | ReactNode | - | ✓ | - |

### LanguageSelector
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| locale | LocaleProps | - | ✓ | - |
| onClickClose | () => void | - | ✓ | - |

### Help
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| helpPageUrl | string | - | - | - |
| schoolUrl | string | - | - | - |

### AppLauncherFilterDropdown
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| page | "all" \| "favorite" | - | ✓ | - |
| onSelectPage | (page: "all" \| "favorite") => void | - | ✓ | - |

### AppLauncher
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| features | { id: string; name: string; url: string; favorite: boolean; position?: number; }[] | - | ✓ | - |

## 実装ルール

### a11y-heading-in-sectioning-content
HeadingコンポーネントをSectioningContent(Article, Aside, Nav, Section) のいずれかで囲むことを促すルールです。<br /> 同時にSectioningContentはHeadingを内包しているか、もチェックします

### a11y-prohibit-sectioning-content-in-form
form, fieldset, smarthr-ui/Fieldset 以下でSectioningContent(section, aside, article, nav)が利用されている場合、smarthr-ui/Fieldset, fieldset要素に置き換えることを促すルールです。

### a11y-help-link-with-support-href
[ヘルプページ](https://support.smarthr.jp/)へのリンクは[smarthr-ui/HelpLink](https://smarthr.design/products/components/text-link/help-link/)を使うことを促すルールです

詳細は eslint-plugin-smarthr の各ルール README を参照してください。

## 使い方チェックリスト

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
