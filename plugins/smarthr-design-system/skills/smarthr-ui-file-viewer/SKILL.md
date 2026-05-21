---
name: smarthr-ui-file-viewer
description: "画像やPDFファイルを表示・拡大縮小・回転できるファイルビューアーコンポーネントです。ファイルの内容をプレビューするときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer3
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

### モバイル
- [should] FileViewer をダイアログで表示する際は、画面いっぱいに広げる拡大したダイアログの使用を検討する
