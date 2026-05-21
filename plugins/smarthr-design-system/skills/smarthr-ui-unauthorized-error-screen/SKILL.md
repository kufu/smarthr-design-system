---
name: smarthr-ui-unauthorized-error-screen
description: "セッション切れなど認証が必要な状態を伝える全画面コンポーネントです。401相当のエラーで再ログインが必要なときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

セッション切れなど認証が必要な状態を伝える全画面コンポーネントです。401相当のエラーで再ログインが必要なときに使います。

ユーザーが一定時間操作しなかった場合、自動でログアウトしたことがわかるメッセージとログインボタンを表示します。ログインボタンを押せば、再ログインできるようにしてください。

## import

```ts
import { UnauthorizedErrorScreen } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| onClickLogin | () => void | - | ✓ | - |
| isLoading | boolean | - | ✓ | - |

## 実装ルール

UnauthorizedErrorScreen に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

使い方チェックリスト（Layer 3）は設定されていません。
