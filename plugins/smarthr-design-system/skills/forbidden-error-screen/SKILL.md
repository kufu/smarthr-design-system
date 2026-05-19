---
name: forbidden-error-screen
description: "smarthr-ui の ForbiddenErrorScreen を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。アクセス権限がないことを表示する全画面コンポーネントです。403相当の権限エラーを伝えるときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

アクセス権限がないことを表示する全画面コンポーネントです。403相当の権限エラーを伝えるときに使います。

ユーザーがページにアクセスする権限をもっていない場合、所属企業の担当者（管理者）へ問い合わせるという対応策と、アプリケーションのホームへ戻るリンクを表示します。

## import

```ts
import { ForbiddenErrorScreen } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| homeUrl | string | - | ✓ | - |

## 実装ルール

ForbiddenErrorScreen に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
