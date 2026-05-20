---
name: app-header
description: "画面上部に配置するSmartHR共通ヘッダーコンポーネントです。HeaderとAppNaviを結合し、各アプリケーションの表示を共通化します。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer3
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

### レイアウト > Header > 2. 企業アカウント切替ボタン
- [must] 企業アカウントの切り替え機能を提供しない場合は、ユーザーが所属している企業アカウント名のみを表示する

### レイアウト > Header > 6. ユーザーアカウントボタン
- [must] ユーザーに関する操作やリンクを提供しない場合は、ユーザーのアカウント名のみを表示する

### レイアウト > AppNavi > 3. データ同期ボタン（任意）
- [should] データ同期ボタンには前回同期した日時を `最終同期：yyyy/MM/dd H:mm` の形式で併記する
  - スペースに余裕がない場合は省略できる

### レイアウト > AppNavi > 4. リリースノートボタン（任意）
- [should] リリースノートはホーム画面などユーザーの利用開始の起点となる画面のコンテンツとして配置する
  - ホーム画面がない機能や、どの画面からもリリースノートにアクセスする可能性がある場合に限り、例外的にリリースノートボタンの配置を検討する

### モバイル
- [must] モバイル環境で省略された機能や情報には各ボタンからアクセスできるようにする
