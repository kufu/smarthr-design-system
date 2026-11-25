# StepFormDialog

複数ステップに分けたフォームを内包するダイアログコンポーネントです。ウィザード形式で複数の操作を順に進めるタスクをダイアログで提供するときに使います。

モーダルなダイアログです。ダイアログの表示中、ダイアログの裏側の領域はスクリム（幕）で隠され、操作を受け付けません。

## import

```ts
import { StepFormDialog } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v103.1.0** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| onToggle | (isOpen: boolean) => void | - | - | - |
| onClose | () => void | - | - | - |
| onOpen | () => void | - | - | - |
| onPressEscape | (close: () => void) => void | - | - | - |
| onClickClose | (close: () => void) => void | - | - | - |
| onSubmit | (e: FormEvent<HTMLFormElement>, helpers: StepFormHelpers) => void | - | ✓ | - |
| heading | ReactNode \| ObjectHeadingType | - | ✓ | - |
| size | "XS" \| "S" \| "M" \| "L" \| "XL" \| "XXL" \| "FULL" | - | - | ダイアログの大きさ |
| responseStatus | ResponseStatus | - | - | - |
| contentBgColor | "WHITE" \| "OVER_BACKGROUND" \| "BACKGROUND" \| "COLUMN" \| "BASE_GREY" \| ... 他8個 | - | - | コンテンツ部分の背景色 |
| contentPadding | Gap \| { block?: Gap; inline?: Gap; } | - | - | - |
| onClickOverlay | () => void | - | - | オーバーレイをクリックした時に発火するコールバック関数 @todo イベントハンドラー命名規則に従い handleClickOverlay に変更すべき（影響範囲大のため別PR） |
| firstFocusTarget | RefObject<HTMLElement> | - | - | ダイアログを開いた時にフォーカスする対象 |
| ariaLabel | string | - | - | ダイアログの `aria-label` |
| ariaLabelledby | string | - | - | ダイアログの `aria-labelledby` |
| portalParent | HTMLElement | - | - | DOM 上でダイアログの要素を追加する親要素。 ダイアログのマウントと同時に確定していない要素（例: ダイアログの祖先要素の ref）を 渡すと、その要素がまだ DOM に存在しない可能性があるため意図通りに動作しない。 呼び出し側で要素が確定してから渡すこと。 |
| closeButton | ButtonArgType \| ObjectButtonType \| ButtonResolverType | - | - | - |
| submitButton | ButtonArgType \| ObjectButtonType \| ButtonResolverType | - | ✓ | - |
| backButton | ButtonArgType \| ObjectButtonType \| ButtonResolverType | - | - | - |
| firstStep | StepItem | - | ✓ | - |
| stepLength | number | - | ✓ | ステップの総数 |
| onClickBack | () => void | - | - | - |

## 実装ルール

StepFormDialog に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

> ℹ️ 各項目は SmartHR Design System の基準であり、守らなければならない規則ではありません。`[must]` は基本的に合わせる基準、`[should]` は状況に応じて判断する推奨、`[avoid]` は避けることを推奨する使い方です。`[must]` に合わせない場合や `[avoid]` の使い方を採用する場合は、理由を明示してください。

### モバイル > 表示する情報量に応じて拡大したダイアログの採用を検討する
- [should] モバイルで表示する情報量に応じて拡大したダイアログの採用を検討する
  - ダイアログ内で多くのスクロールを伴う場合
  - 入力や編集など、キーボードでの入力操作が多い場合

### モバイル > レイアウト > 余白
- [must] 拡大したダイアログの左右と裏側の領域（スクリムで隠されている領域）のパディングは `0（0px）` とする
  - 基本的には代表的なダイアログ内レイアウトのパディングに従って配置する

### モバイル > レイアウト > フッターエリアのレイアウト
- [must] モバイルで［戻る］ボタンと Primary ボタンを Cluster で横いっぱいに並べる
  - ［キャンセル］ボタンは Button 群の下部に配置する
