# DateFormatter

日付データを任意の形式にフォーマットして表示するコンポーネントです。日付をユーザーの言語や地域設定に適した形式で表示するときに使います。

## import

```ts
import { DateFormatter } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v102.0.0** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| parts | readonly [DatePart, ...DatePart[]] | - | - | 表示する日付のパーツ。指定しない場合は全て表示 |
| options | Omit<DateTimeFormatOptions, "dateStyle" \| "timeStyle"> & { disableSlashInJa?: boolean; capitalizeFirstLetter?: boolean; } | - | - | フォーマットオプション |
| date | string \| Date | - | ✓ | - |

## 実装ルール

DateFormatter に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

> ℹ️ 各項目は SmartHR Design System の基準であり、守らなければならない規則ではありません。`[must]` は基本的に合わせる基準、`[should]` は状況に応じて判断する推奨、`[avoid]` は避けることを推奨する使い方です。`[must]` に合わせない場合や `[avoid]` の使い方を採用する場合は、理由を明示してください。

### 使用上の注意 > 日付をフォーマットする機能だけ必要な場合
- [must] フォーマットされた日付の文字列だけが必要な場合は `useDateFormat` の `formatDate` を使う
