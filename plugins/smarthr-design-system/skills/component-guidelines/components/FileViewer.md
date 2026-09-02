# FileViewer

画像やPDFファイルを表示・拡大縮小・回転できるファイルビューアーコンポーネントです。ファイルの内容をプレビューするときに使います。

## import

```ts
import { FileViewer } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v99.3.2** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| file | FileForViewer | - | ✓ | - |
| width | number | - | - | - |
| scaleSteps | number[] | - | - | - |
| scaleStep | number | - | - | - |
| onPassword | OnPassword | - | - | - |
| onLoadError | (error: unknown) => void | - | - | - |
| searchable | boolean | true | - | PDF表示時に検索ボックスを表示するかどうか |

## 実装ルール

FileViewer に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

### 状態 > PDF内テキスト検索の表示
- [should] モバイルなど画面サイズが限られる場面では、検索フォームがコンテンツ領域を圧迫する場合があるため、`searchable={false}` の指定を検討する

### モバイル
- [should] FileViewer をダイアログで表示する際は、画面いっぱいに広げる拡大したダイアログの使用を検討する
