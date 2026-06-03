# TimestampFormatter

日付と時刻データを任意の形式にフォーマットして表示するコンポーネントです。日付と時刻をユーザーの言語や地域設定に適した形式で表示するときに使います。

## import

```ts
import { TimestampFormatter } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| timeParts | readonly [TimePart, ...TimePart[]] | - | - | 表示する時刻のパーツ。指定しない場合は ['hour', 'minute'] がデフォルト |
| date | string \| Date | - | ✓ | - |

## 実装ルール

TimestampFormatter に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

使い方チェックリスト（Layer 3）は設定されていません。
