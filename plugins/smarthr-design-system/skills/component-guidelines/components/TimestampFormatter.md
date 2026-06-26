# TimestampFormatter

日付と時刻データを任意の形式にフォーマットして表示するコンポーネントです。日付と時刻をユーザーの言語や地域設定に適した形式で表示するときに使います。

## import

```ts
import { TimestampFormatter } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v96.1.0** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| timeParts | readonly [TimePart, ...TimePart[]] | - | - | 表示する時刻のパーツ。指定しない場合は ['hour', 'minute'] がデフォルト |
| date | string \| Date | - | ✓ | - |

## 実装ルール

TimestampFormatter に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

### 使用上の注意 > タイムスタンプをフォーマットする機能だけ必要な場合
- [must] フォーマットされたタイムスタンプの文字列だけが必要な場合は `useIntl` の `formatTimestamp` を使う
