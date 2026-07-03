# UnauthorizedErrorScreen

セッション切れなど認証が必要な状態を伝える全画面コンポーネントです。401相当のエラーで再ログインが必要なときに使います。

ユーザーが一定時間操作しなかった場合、自動でログアウトしたことがわかるメッセージとログインボタンを表示します。ログインボタンを押せば、再ログインできるようにしてください。

## import

```ts
import { UnauthorizedErrorScreen } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v96.1.1** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| onClickLogin | () => void | - | ✓ | - |
| isLoading | boolean | - | ✓ | - |

## 実装ルール

UnauthorizedErrorScreen に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

使い方チェックリスト（Layer 3）は設定されていません。
