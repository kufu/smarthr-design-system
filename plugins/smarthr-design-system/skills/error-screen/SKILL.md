---
name: error-screen
description: "エラーを全画面で表示するためのプリミティブコンポーネントです。Auth/Forbidden/NotFound/Unauthorized/Unexpectedの各ErrorScreenで実現できない独自のエラー画面を提供するときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer3
---

エラーを全画面で表示するためのプリミティブコンポーネントです。Auth/Forbidden/NotFound/Unauthorized/Unexpectedの各ErrorScreenで実現できない独自のエラー画面を提供するときに使います。

なんらかのエラーによってユーザーが操作できなくなった場合や、ユーザーに操作をさせたくない場合に使用してください。

## import

```ts
import { ErrorScreen } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| logo | ReactNode | - | - | ロゴ |
| title | ReactNode | - | - | コンテンツの上に表示されるタイトル |
| links | { label: ReactNode; url: string; target?: string; }[] | - | - | コンテンツの下に表示されるアンカー要素のリスト |
| children | ReactNode | - | - | 表示するコンテンツ |
| className | string | - | - | コンポーネントに適用するクラス名 |

## 実装ルール

ErrorScreen に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

### 使用上の注意
- [avoid] 全画面でエラーを表示する必要がないエラーには ErrorScreen を使用しない
- [should] フォームのバリデーションエラーや連携 API の疎通エラーのような一時的なエラーの場合は、NotificationBar / ResponseMessage / InformationPanel の使用を検討する

### レイアウト > ロゴ
- [should] 特別な理由がない限り、ロゴを表示する

### レイアウト > タイトル
- [must] タイトルには、どのようなエラーが発生したのかがわかる文言を設定する

### レイアウト > メッセージ
- [should] タイトルに補足が必要な場合、メッセージを設定する

### レイアウト > リンク
- [should] エラーになったときにユーザーの助けになるようなページへ誘導できる場合はリンクを表示する
