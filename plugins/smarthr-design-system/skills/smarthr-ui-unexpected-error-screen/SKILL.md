---
name: smarthr-ui-unexpected-error-screen
description: "予期しないエラーが発生したことを表示する全画面コンポーネントです。500相当のサーバーエラーを伝えるときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

予期しないエラーが発生したことを表示する全画面コンポーネントです。500相当のサーバーエラーを伝えるときに使います。

メンテナンスやシステム障害などでデータの閲覧・作成・更新が安全に実行できない状況の場合、予期しないエラーが発生したメッセージを表示します。 予期しないエラーの場合、対応方法やヘルプセンターへのリンクを丁寧に提示することが重要です。アプリケーションのホームへ戻るリンクも表示してください。

## import

```ts
import { UnexpectedErrorScreen } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| homeUrl | string | - | ✓ | - |

## 実装ルール

UnexpectedErrorScreen に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

使い方チェックリスト（Layer 3）は設定されていません。
