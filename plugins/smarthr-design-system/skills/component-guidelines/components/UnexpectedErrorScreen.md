# UnexpectedErrorScreen

予期しないエラーが発生したことを表示する全画面コンポーネントです。500相当のサーバーエラーを伝えるときに使います。

メンテナンスやシステム障害などでデータの閲覧・作成・更新が安全に実行できない状況の場合、予期しないエラーが発生したメッセージを表示します。 予期しないエラーの場合、対応方法やヘルプセンターへのリンクを丁寧に提示することが重要です。アプリケーションのホームへ戻るリンクも表示してください。

## import

```ts
import { UnexpectedErrorScreen } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v95.0.0** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| homeUrl | string | - | ✓ | - |

## 実装ルール

UnexpectedErrorScreen に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

使い方チェックリスト（Layer 3）は設定されていません。
