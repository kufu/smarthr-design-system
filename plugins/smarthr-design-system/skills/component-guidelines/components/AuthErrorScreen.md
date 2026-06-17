# AuthErrorScreen

認証フローで問題が発生したことを表示する全画面コンポーネントです。SSOやOAuthなどログイン処理に失敗したときに使います。

ユーザーがログインしていない状態で認証が必要なページにアクセスした場合や、ログインに問題が発生した場合に表示します。 「SmartHRに戻る」のリンク先はアプリケーションのホームではなく、SmartHRのホームにしてください。

## import

```ts
import { AuthErrorScreen } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v96.0.1** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| smarthrUrl | string | - | ✓ | - |

## 実装ルール

AuthErrorScreen に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

使い方チェックリスト（Layer 3）は設定されていません。
