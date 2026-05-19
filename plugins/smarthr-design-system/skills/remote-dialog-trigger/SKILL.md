---
name: remote-dialog-trigger
description: "別コンポーネント階層からダイアログを開くとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するときに使う。別コンポーネント階層から離れた位置のダイアログを開くためのトリガーコンポーネントです。ボタン配置とダイアログ定義を分離して管理するときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer2
---

別コンポーネント階層から離れた位置のダイアログを開くためのトリガーコンポーネントです。ボタン配置とダイアログ定義を分離して管理するときに使います。

たとえば、一覧テーブルの各行に置いた「削除」ボタンから、共通の削除確認ダイアログを開きたい場合に使えます。各行ごとに同じダイアログを書く必要がなく、テーブルの外に1つだけ配置したダイアログを、各行のボタンから共通で開くことができます。

## import

```ts
import { RemoteDialogTrigger } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| targetId | string | - | ✓ | - |
| onClick | (open: () => void) => void | - | - | - |

## 実装ルール

### best-practice-for-remote-trigger-dialog
RemoteDialogTrigger、RemoteTriggerXxxxDialogのベストプラクティスをチェックするルールです。

❌ NG:

```jsx
<RemoteDialogTrigger targetId={id}>open.</RemoteDialogTrigger>
<RemoteTriggerActionDialog {...args} id={'hoge'}>content.</RemoteTriggerActionDialog>
```

✅ OK:

```jsx
<RemoteDialogTrigger targetId="help_dialog">open.</RemoteDialogTrigger>
<RemoteTriggerActionDialog {...args} id="help_dialog">content.</RemoteTriggerActionDialog>
```

詳細は eslint-plugin-smarthr の各ルール README を参照してください。

## 使い方チェックリスト

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
