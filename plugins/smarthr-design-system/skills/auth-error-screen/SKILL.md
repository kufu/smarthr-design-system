---
name: auth-error-screen
description: "認証フローで問題が発生したことを表示する全画面コンポーネントです。SSOやOAuthなどログイン処理に失敗したときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

認証フローで問題が発生したことを表示する全画面コンポーネントです。SSOやOAuthなどログイン処理に失敗したときに使います。

ユーザーがログインしていない状態で認証が必要なページにアクセスした場合や、ログインに問題が発生した場合に表示します。 「SmartHRに戻る」のリンク先はアプリケーションのホームではなく、SmartHRのホームにしてください。

## import

```ts
import { AuthErrorScreen } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| smarthrUrl | string | - | ✓ | - |

## 実装ルール

AuthErrorScreen に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
