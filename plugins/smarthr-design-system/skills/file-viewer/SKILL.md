---
name: file-viewer
description: "smarthr-ui の FileViewer を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。画像やPDFファイルを表示・拡大縮小・回転できるファイルビューアーコンポーネントです。ファイルの内容をプレビューするときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

画像やPDFファイルを表示・拡大縮小・回転できるファイルビューアーコンポーネントです。ファイルの内容をプレビューするときに使います。

## import

```ts
import { FileViewer } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| file | FileForViewer | - | ✓ | - |
| width | number | - | - | - |
| scaleSteps | number[] | - | - | - |
| scaleStep | number | - | - | - |
| onPassword | OnPassword | - | - | - |
| onLoadError | () => void | - | - | - |

## 実装ルール

FileViewer に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
