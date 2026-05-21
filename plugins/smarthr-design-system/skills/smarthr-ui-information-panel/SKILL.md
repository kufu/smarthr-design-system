---
name: smarthr-ui-information-panel
description: "ユーザーに伝えたい情報を視覚的に目立たせるパネルコンポーネントです。複数行のテキストや複数項目の不備一覧など、ResponseMessageやNotificationBarでは収まらない量のフィードバック情報などを表示するときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer2+layer3
---

ユーザーに伝えたい情報を視覚的に目立たせるパネルコンポーネントです。複数行のテキストや複数項目の不備一覧など、ResponseMessageやNotificationBarでは収まらない量のフィードバック情報などを表示するときに使います。

ユーザーに伝えたい情報を視覚的に目立たせるパネルコンポーネントです。複数行のテキストや複数項目の不備一覧など、[ResponseMessage](/products/components/response-message/)や[NotificationBar](/products/components/notification-bar/)では収まらない量のフィードバック情報などを表示するときに使います。

## import

```ts
import { InformationPanel } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| heading | ReactNode \| ObjectHeadingType | - | ✓ | パネルのタイトル |
| toggleable | boolean | - | - | `true` のとき、開閉ボタンを表示する |
| onClickTrigger | (active: boolean) => void | - | - | 開閉ボタン押下時に発火するコールバック関数 |
| type | "error" \| "warning" \| "info" \| "success" \| "sync" | info | - | - |
| bold | boolean | - | - | - |
| active | boolean | true | - | - |
| ref | Ref<HTMLDivElement> | - | - | - |

## 実装ルール

### design-system-guideline-prohibit-information-panel-in-white-bg
InformationPanelを白背景に配置することを禁止します。

詳細は eslint-plugin-smarthr の各ルール README を参照してください。

## 使い方チェックリスト

### 使用上の注意 > 短い一文で説明できるものに使用しない
- [must] 見出しと内容を必ずセットにして使用する
- [should] 短い一文で説明できる場合は、ResponseMessage や NotificationBar の使用を検討する

### (Layer 2 でカバー: design-system-guideline-prohibit-information-panel-in-white-bg)
- [should] InformationPanel では視覚的に強調されすぎる場合は、BaseColumn を使った代替パターンも検討する

### レイアウト > [WIP] モバイル > 開閉ボタン
- [must] モバイルでは開閉ボタンをアイコンボタンで表示する

### レイアウト > [WIP] モバイル > 余白
- [must] モバイルではコンポーネント内部の余白を 16px に変更する

### 状態 > デフォルト
- [should] 全文表示したままだと操作の妨げになるなど、利用者の使い勝手に影響する場合は開閉ボタンの表示を検討する
- [should] 開閉ボタンを表示する際は、利用者のストレスを避けるため開閉状態の保持を合わせて検討する
