---
name: information-panel
description: "ユーザーに伝えたい情報を視覚的に目立たせるパネルコンポーネントです。複数行のテキストや複数項目の不備一覧など、ResponseMessageやNotificationBarでは収まらない量のフィードバック情報などを表示するときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer2
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

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
