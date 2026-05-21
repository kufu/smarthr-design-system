---
name: smarthr-ui-app-header
description: "画面上部に配置するSmartHR共通ヘッダーコンポーネントです。HeaderとAppNaviを結合し、各アプリケーションの表示を共通化します。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

画面上部に配置するSmartHR共通ヘッダーコンポーネントです。HeaderとAppNaviを結合し、各アプリケーションの表示を共通化します。

画面上部に配置するSmartHR共通ヘッダーコンポーネントです。[Header](/products/components/header/)と[AppNavi](/products/components/app-navi/)を結合し、各アプリケーションの表示を共通化します。

## import

```ts
import { AppHeader } from 'smarthr-ui'
```

## Props

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

## 実装ルール

AppHeader に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

使い方チェックリスト（Layer 3）は設定されていません。
