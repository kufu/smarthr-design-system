# AccordionPanel

縦に積まれた見出しのリストで、関連する詳細の表示・非表示を切り替えられるコンポーネントです。情報量が多い場合に表示内容を絞るときに使います。

補足的な情報を折りたたんで画面をシンプルに保つことで、情報量が増えてもユーザーが重要な情報にたどりつきやすくなります。また、ページの要素が多くスクロールが生じる画面において、まず見出しだけを表示してユーザーに全体像を把握させたい場合にも使用できます。

## import

```ts
import { AccordionPanelTrigger, AccordionPanelItem, AccordionPanelContent, AccordionPanel } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v96.1.0** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

### AccordionPanelTrigger
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| headingType | "sectionTitle" \| "blockTitle" \| "subBlockTitle" \| "subSubBlockTitle" | blockTitle | - | ヘッダ部分のテキストのスタイル |
| unrecommendedHeadingTag | "h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6" | - | - | 可能な限り利用せず、SectioningContent(Article, Aside, Nav, Section)を使ってHeadingと関連する範囲を明確に指定する方法を検討してください |

### AccordionPanelItem
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| name | string | - | ✓ | アイテムを識別するための名前 |

### AccordionPanelContent
（固有 Props なし）

### AccordionPanel
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| iconPosition | "left" \| "right" | left | - | アイコンの左右位置 |
| expandableMultiply | boolean | true | - | 複数のパネルを同時に開くことを許容するかどうか |
| defaultExpanded | string[] | [] | - | デフォルトで開いた状態にするアイテムの `name` の配列 |
| onClick | (expandedItems: string[]) => void | - | - | トリガのクリックイベントを処理するハンドラ |
| rounded | boolean \| "all" \| "top" \| "bottom" \| "left" \| "right" | - | - | - |

## 実装ルール

AccordionPanel に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

### 使用上の注意 > AccordionPanelを乱用しない
- [should] 画面内の情報量や粒度、構造が適切かどうかを精査して AccordionPanel を使用する

### 使用上の注意 > ModelessDialogとの使い分け
- [should] 「ヘルプページを参照しながら別の操作を行なう」など、画面のスクロールに依存せずモードレスに情報を表示したい場合は、AccordionPanel ではなく ModelessDialog を使用する

### レイアウト > アイコンの位置
- [avoid] `iconPosition` props でアイコンを右に配置するのは非推奨

### レイアウト > デフォルトの開閉状態
- [avoid] ユーザーの操作や閲覧が必ず必要な、重要性の高い情報を AccordionPanel で隠さない
  - デフォルトで閉じる使い方の例: 一部のユーザーしか利用しない機能（例: 高度な設定など）を隠し画面の表示要素をシンプルに保ちたい場合
  - デフォルトで閉じる使い方の例: 見出しを並べ、ユーザーに情報全体の構造を把握させたい場合

### アクセシビリティ > ユーザーが操作していないリストを勝手に閉じない
- [must] `expandableMultiply` props は `expandableMultiply={true}` に指定する
  - `expandableMultiply={false}` だと、1つのリストを展開するとすでに展開している別のリストが同時に閉じ、ユーザーが予測・意図していない動きが発生するため非推奨
