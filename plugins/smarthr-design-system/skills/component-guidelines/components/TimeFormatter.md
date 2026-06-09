# TimeFormatter

時刻データを任意の形式にフォーマットして表示するコンポーネントです。時刻をユーザーの言語や地域設定に適した形式で表示するときに使います。

## import

```ts
import { TimeFormatter } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v95.0.0** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| parts | readonly [TimePart, ...TimePart[]] | - | - | 表示する時刻のパーツ。指定しない場合は ['hour', 'minute'] がデフォルト |
| options | DateTimeFormatOptions | - | - | フォーマットオプション |
| date | string \| Date | - | ✓ | - |

## 実装ルール

TimeFormatter に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

### 使用上の注意 > 時刻をフォーマットする機能だけ必要な場合
- [must] フォーマットされた時刻の文字列だけが必要な場合は `useIntl` の `formatTime` を使う
