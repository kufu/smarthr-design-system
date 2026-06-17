# DropZone

ドラッグアンドドロップでのファイル選択を主目的としたコンポーネントです。広いドロップ領域でファイルをアップロードさせるときに使います。

ドラッグアンドドロップでファイル選択させるためのコンポーネントです。広いドロップ領域でファイルをアップロードさせるときに使います。

## import

```ts
import { DropZone, DropZone } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v96.0.1** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

### DropZone
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| accept | string | - | - | 許可するファイル型を表す1つ以上の固有ファイル型指定子 <b>（ドラッグ&ドロップの挙動には影響しません）</b> |
| disabled | boolean | - | - | - |
| multiple | boolean | true | - | 複数ファイルを選択できるかどうか |
| name | string | - | - | - |
| error | boolean | - | - | フォームにエラーがあるかどうか |
| onSelectFiles | (e: ChangeEvent<HTMLInputElement> \| DragEvent<HTMLElement>, files: FileList) => void | - | ✓ | ボタンまたはドラッグ&ドロップでファイルが追加された時に発火するコールバック関数 |
| selectButtonLabel | string | - | - | ファイル選択ボタンのラベル |

### DropZone
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| accept | string | - | - | 許可するファイル型を表す1つ以上の固有ファイル型指定子 <b>（ドラッグ&ドロップの挙動には影響しません）</b> |
| disabled | boolean | - | - | - |
| multiple | boolean | true | - | 複数ファイルを選択できるかどうか |
| name | string | - | - | - |
| error | boolean | - | - | フォームにエラーがあるかどうか |
| onSelectFiles | (e: ChangeEvent<HTMLInputElement> \| DragEvent<HTMLElement>, files: FileList) => void | - | ✓ | ボタンまたはドラッグ&ドロップでファイルが追加された時に発火するコールバック関数 |
| selectButtonLabel | string | - | - | ファイル選択ボタンのラベル |

## 実装ルール

DropZone に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

### 使用上の注意 > 複数使用する場合
- [should] 複数使用する場合は全体の閲覧性を維持できるようにレイアウトを検討するか、InputFile を使う

### モバイル
- [must] モバイル中心のユースケースでは InputFile を使う
