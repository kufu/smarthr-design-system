---
name: unauthorized-error-screen
description: "smarthr-ui の UnauthorizedErrorScreen を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。一定時間操作がなかったためにセッションが切れたときなど、認証が必要な状態でアクセスした場合に表示するコンポーネントです。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

一定時間操作がなかったためにセッションが切れたときなど、認証が必要な状態でアクセスした場合に表示するコンポーネントです。

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

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
