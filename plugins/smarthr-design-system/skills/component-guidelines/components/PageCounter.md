# PageCounter

「よくあるテーブル」などの一覧の総件数と現在ページの件数を表示するためのコンポーネントです。Paginationと併用し件数を提示するときに使います。

## import

```ts
import { PageCounter } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v103.1.0** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| start | number | - | ✓ | - |
| end | number | - | ✓ | - |
| total | number | - | - | - |

## 実装ルール

PageCounter に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

> ℹ️ 各項目は SmartHR Design System の基準であり、守らなければならない規則ではありません。`[must]` は基本的に合わせる基準、`[should]` は状況に応じて判断する推奨、`[avoid]` は避けることを推奨する使い方です。`[must]` に合わせない場合や `[avoid]` の使い方を採用する場合は、理由を明示してください。

### モバイル
- [must] PageCounter は Pagination と合わせて使う
- [avoid] モバイルで Pagination を表示していない場合（代わりに「さらに表示」ボタンを表示している場合など）は PageCounter を使わない
