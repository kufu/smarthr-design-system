# SortDropdown

コレクションの並べ替えを提供するためのドロップダウンコンポーネントです。主にテーブル以外のリストやカード一覧の並べ替え項目と並び順を設定するときに使います。

## import

```ts
import { SortDropdown } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v97.0.0** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| sortFields | SortFieldType[] | - | ✓ | 並び替え項目 |
| defaultOrder | "desc" \| "asc" | - | ✓ | 並び順の初期値 |
| sortFieldLabel | ReactNode | - | - | - |
| sortOrderLegend | ReactNode | - | - | - |
| ascLabel | ReactNode | - | - | - |
| descLabel | ReactNode | - | - | - |
| applyText | ReactNode | - | - | - |
| cancelText | ReactNode | - | - | - |
| onApply | (args: ArgsOnApply) => void | - | ✓ | 適用時に発火するイベント |
| onCancel | MouseEventHandler<HTMLButtonElement> | - | - | キャンセル時に発火するイベント |
| ref | Ref<HTMLButtonElement> | - | - | - |

## 実装ルール

SortDropdown に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

### 使用上の注意
- [must] テーブルを並べ替える場合は Th の `sort` プロパティを使う

### レイアウト > [WIP] モバイル > ドロップダウンパネル
- [must] モバイル端末ではドロップダウンパネルを ActionDialog を用いてモーダルに表示する
