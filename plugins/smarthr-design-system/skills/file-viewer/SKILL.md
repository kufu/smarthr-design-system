---
name: file-viewer
description: "smarthr-ui の PDFViewer / ImageViewer / FileViewer を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。画像やPDFファイルを表示・拡大縮小・回転できるファイルビューアーです。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

画像やPDFファイルを表示・拡大縮小・回転できるファイルビューアーです。

## import

```ts
import { PDFViewer, ImageViewer, FileViewer } from 'smarthr-ui'
```

## Props

### PDFViewer
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| file | FileForViewer | - | ✓ | - |
| scale | number | - | ✓ | - |
| rotation | number | - | ✓ | - |
| width | number | - | ✓ | - |
| onLoad | () => void | - | ✓ | - |
| onPDFLoaded | (defaultRotation: number) => void | - | - | - |
| onPassword | OnPassword | - | - | PDFファイルのパスワード入力を要求されたときに呼ばれるコールバック関数。PdfViewerでのみ使用されます。 |
| onLoadError | () => void | - | - | - |

### ImageViewer
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| file | FileForViewer | - | ✓ | - |
| scale | number | - | ✓ | - |
| rotation | number | - | ✓ | - |
| width | number | - | ✓ | - |
| onLoad | () => void | - | ✓ | - |
| onPDFLoaded | (defaultRotation: number) => void | - | - | - |
| onPassword | OnPassword | - | - | PDFファイルのパスワード入力を要求されたときに呼ばれるコールバック関数。PdfViewerでのみ使用されます。 |
| onLoadError | () => void | - | - | - |

### FileViewer
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
