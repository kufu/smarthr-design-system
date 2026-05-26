---
name: smarthr-ui-input-file
description: "InputFileは、input[type='file']要素の代替としてファイルを選択させるコンポーネントです。ファイルをアップロードさせるときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer3
---

input[type='file']要素の代替としてファイルを選択させるコンポーネントです。ファイルをアップロードさせるときに使います。

Text, Cluster } from 'smarthr-ui'

## import

```ts
import { InputFile } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| label | ReactNode | - | ✓ | フォームのラベル |
| disabled | boolean | - | - | - |
| multiple | boolean \| { appendable?: boolean; } | - | - | - |
| size | "S" \| "M" | - | - | - |
| onChange | (files: File[]) => void | - | - | ファイルの選択に変更があったときに発火するコールバック関数 |
| error | boolean | - | - | - |
| hasFileList | boolean | - | - | ファイルリストを表示するかどうか |

## 実装ルール

InputFile に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

### 使用上の注意 > ドラッグアンドドロップでのファイル選択
- [should] ドラッグアンドドロップでのファイル選択を提供したい場合など、より多くの操作方法を提供したい場合は DropZone の使用も検討する
  - DropZone を一定以上の大きさでレイアウトすることが難しい場合は InputFile を推奨する
  - 1 つの画面に複数のファイル選択 UI を配置する必要がある場合は InputFile を推奨する

### アクセシビリティ
- [must] InputFile では入力すべき内容をユーザーに明確に伝えるラベルと、支援技術向けの Accessible Name を設定する

### アクセシビリティ > InputFileでラベルを提供する
- [must] 入力要素として「何を入力すべきか」を示すラベルを FormControl の `title` で設定する

### アクセシビリティ > InputFileでラベルを省略する場合
- [must] ラベルを省略する場合も Accessible Name を漏れなく提供する
  - FormControl の `label.dangerouslyHide` を使用してラベルを不可視化する
  - `aria-label` で入力する内容を特定できる Accessible Name を設定する

### モバイル
- [should] 目的のファイルを選択するステップが複数回に分かれるケースでは、必要に応じて `multiple={{ appendable: true }}` props の利用を検討する
