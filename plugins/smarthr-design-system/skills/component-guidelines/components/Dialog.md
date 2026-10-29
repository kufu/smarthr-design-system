# Dialog

ページ前面に表示されるダイアログ領域のプリミティブコンポーネントです。ActionDialog/MessageDialog/ModelessDialog/FormDialog/StepFormDialogで実現できない独自のダイアログを提供するときに使います。

ダイアログは、ユーザーに入力や選択などの操作を求めたり、情報を提示するために使われます。ユーザーの操作を起点として表示され、ユーザーの操作によって閉じられます。

## import

```ts
import { Dialog } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v100.1.0** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| width | string \| number | - | - | @deprecated ダイアログの幅を指定する場合は、`width` ではなく `size` を使用してください。 ダイアログの幅 |
| size | "XS" \| "S" \| "M" \| "L" \| "XL" \| "XXL" \| "FULL" | - | - | ダイアログの大きさ |
| firstFocusTarget | RefObject<HTMLElement> | - | - | ダイアログを開いた時にフォーカスする対象 |
| isOpen | boolean | - | ✓ | ダイアログを開いているかどうか |
| onClickOverlay | () => void | - | - | オーバーレイをクリックした時に発火するコールバック関数 @todo イベントハンドラー命名規則に従い handleClickOverlay に変更すべき（影響範囲大のため別PR） |
| onPressEscape | (e: KeyboardEvent) => void | - | - | エスケープキーを押下した時に発火するコールバック関数 @todo イベントハンドラー命名規則に従い handlePressEscape に変更すべき（影響範囲大のため別PR） |
| ariaLabel | string | - | - | ダイアログの `aria-label` |
| ariaLabelledby | string | - | - | ダイアログの `aria-labelledby` |
| portalParent | HTMLElement | - | - | DOM 上でダイアログの要素を追加する親要素。 ダイアログのマウントと同時に確定していない要素（例: ダイアログの祖先要素の ref）を 渡すと、その要素がまだ DOM に存在しない可能性があるため意図通りに動作しない。 呼び出し側で要素が確定してから渡すこと。 |
| ref | Ref<HTMLDivElement> | - | - | - |

## 実装ルール

### best-practice-for-remote-trigger-dialog
RemoteDialogTrigger、RemoteTriggerXxxxDialogのベストプラクティスをチェックするルールです。

### design-system-guideline-prohibit-dialog-button-icon
Dialogのボタンテキストにアイコンコンポーネント（名前が"Icon"で終わるコンポーネント）を含めることを禁止するルールです。

詳細は eslint-plugin-smarthr の各ルール README を参照してください。

## 使い方チェックリスト

### Dialogを使用したコンポーネント > ActionDialog、FormDialog
- [should] ユーザーに入力や選択などの操作を求める場合は ActionDialog / FormDialog を使う
- [should] ダイアログコンテンツにフォームが含まれている場合は FormDialog を使う

### Dialogを使用したコンポーネント > MessageDialog
- [should] ユーザーに情報を提示する場合は MessageDialog を使う

### Dialogを使用したコンポーネント > ModelessDialog
- [should] ダイアログと裏側の画面を同時並行で閲覧・操作する場合は ModelessDialog を使う

### Dialogを使用したコンポーネント > StepFormDialog
- [should] タスクの完了に複数の操作が必要な場合は StepFormDialog を使う
