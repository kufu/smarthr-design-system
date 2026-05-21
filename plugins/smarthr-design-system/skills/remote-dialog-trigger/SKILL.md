---
name: remote-dialog-trigger
description: "別コンポーネント階層から離れた位置のダイアログを開くためのトリガーコンポーネントです。ボタン配置とダイアログ定義を分離して管理するときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer2+layer3
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

### 使用上の注意 > ボタンとダイアログを同じ場所に書ける場合は、通常のダイアログコンポーネントを使用する
- [must] ボタンとダイアログを同じ場所に書ける場合は ActionDialog や FormDialog などのダイアログコンポーネントを使う
  - `RemoteDialogTrigger` は、同じダイアログを複数の場所から開きたい場合や、ボタンとダイアログを同じ場所に置きづらい場合にのみ使う
