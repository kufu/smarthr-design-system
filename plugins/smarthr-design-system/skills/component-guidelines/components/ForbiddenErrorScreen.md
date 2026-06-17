# ForbiddenErrorScreen

アクセス権限がないことを表示する全画面コンポーネントです。403相当の権限エラーを伝えるときに使います。

ユーザーがページにアクセスする権限をもっていない場合、所属企業の担当者（管理者）へ問い合わせるという対応策と、アプリケーションのホームへ戻るリンクを表示します。

## import

```ts
import { ForbiddenErrorScreen } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v96.0.1** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| homeUrl | string | - | ✓ | - |

## 実装ルール

ForbiddenErrorScreen に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

使い方チェックリスト（Layer 3）は設定されていません。
