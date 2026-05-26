---
name: smarthr-ui-app-launcher
description: "【非推奨】AppLauncherは、Header内に配置されるSmartHRの複数のアプリケーション間を遷移するためのランチャーコンポーネントです。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

> ⚠️ **非推奨**: AppLauncherは古いコンポーネントです。代わりにAppHeaderのアプリランチャー（features props）を使用してください。

Header内に配置されるSmartHRの複数のアプリケーション間を遷移するためのランチャーコンポーネントです。

SmartHRの複数のアプリケーション間を移動するためのランチャーコンポーネントです。

## import

```ts
import { AppLauncher } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| apps | Category[] | - | ✓ | - |
| urlToShowAll | string | - | - | - |
| triggerLabel | ReactNode | - | - | トリガーボタンのラベル。指定しない場合はIntlProviderから取得 |
| enableNew | boolean | - | - | - |

## 実装ルール

AppLauncher に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

使い方チェックリスト（Layer 3）は設定されていません。
