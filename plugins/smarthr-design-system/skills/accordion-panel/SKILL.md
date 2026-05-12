---
name: accordion-panel
description: "smarthr-ui の AccordionPanelTrigger / AccordionPanelItem / AccordionPanelContent / AccordionPanel を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。表示したい要素を展開して表示したり、折りたたんで隠したりするためのコンポーネントです。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

表示したい要素を展開して表示したり、折りたたんで隠したりするためのコンポーネントです。

補足的な情報を折りたたんで画面をシンプルに保つことで、情報量が増えてもユーザーが重要な情報にたどりつきやすくなります。また、ページの要素が多くスクロールが生じる画面において、まず見出しだけを表示してユーザーに全体像を把握させたい場合にも使用できます。

## import

```ts
import { AccordionPanelTrigger, AccordionPanelItem, AccordionPanelContent, AccordionPanel } from 'smarthr-ui'
```

## Props

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
| rounded | boolean \| "all" \| "left" \| "right" \| "bottom" \| "top" | - | - | - |

## 実装ルール

AccordionPanel に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
