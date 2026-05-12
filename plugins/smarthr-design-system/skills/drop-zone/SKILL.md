---
name: drop-zone
description: "smarthr-ui の DropZone / DropZone を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。ファイルを選択するためのコンポーネントです。ドラッグアンドドロップによるファイル選択をするためにドロップ領域を広く持っています。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

ファイルを選択するためのコンポーネントです。ドラッグアンドドロップによるファイル選択をするためにドロップ領域を広く持っています。

## import

```ts
import { DropZone, DropZone } from 'smarthr-ui'
```

## Props

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

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
