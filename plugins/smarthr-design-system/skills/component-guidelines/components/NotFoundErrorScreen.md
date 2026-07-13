# NotFoundErrorScreen

存在しないページであることを表示する全画面コンポーネントです。404相当のエラーを伝えるときに使います。

ユーザーが存在しないページにアクセスした場合、ページ自体が移動・削除された可能性の提示と、アプリケーションのホームへ戻るリンクを表示します。

## import

```ts
import { NotFoundErrorScreen } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v97.0.0** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| homeUrl | string | - | ✓ | - |

## 実装ルール

NotFoundErrorScreen に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

使い方チェックリスト（Layer 3）は設定されていません。
