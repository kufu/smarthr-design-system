---
name: definition-list
description: "見出しと説明をペアで並べる定義リストコンポーネントです。フォーム入力内容の確認画面や編集不要のデータ表示など、ラベルと値のペアを参照用に並べるときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer2+layer3
---

見出しと説明をペアで並べる定義リストコンポーネントです。フォーム入力内容の確認画面や編集不要のデータ表示など、ラベルと値のペアを参照用に並べるときに使います。

## import

```ts
import { DefinitionListItem, DefinitionList } from 'smarthr-ui'
```

## Props

### DefinitionListItem
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| term | ReactNode \| { text: ReactNode; styleType?: "blockTitle" \| "subBlockTitle" \| "subSubBlockTitle"; } | - | ✓ | - |
| fullWidth | boolean | - | - | - |
| maxColumns | number | - | - | - |

### DefinitionList
（固有 Props なし）

## 実装ルール

### best-practice-for-consecutive-definition-list
同階層に `DefinitionList` が連続して配置されている場合に警告するルールです。

❌ NG:

```jsx
<DefinitionList>
  <DefinitionListItem term="項目1">内容1</DefinitionListItem>
</DefinitionList>
<DefinitionList>
  <DefinitionListItem term="項目2">内容2</DefinitionListItem>
  <DefinitionListItem term="項目3">内容3</DefinitionListItem>
</DefinitionList>
```

✅ OK:

```jsx
// 1つのDefinitionListにまとめる
<DefinitionList>
  <DefinitionListItem term="項目1">内容1</DefinitionListItem>
  <DefinitionListItem term="項目2">内容2</DefinitionListItem>
  <DefinitionListItem term="項目3">内容3</DefinitionListItem>
</DefinitionList>
```

```jsx
// maxColumns を使用してカラム数を指定
<DefinitionList>
  <DefinitionListItem maxColumns={1} term="項目1">内容1</DefinitionListItem>
  <DefinitionListItem maxColumns={2} term="項目2">内容2</DefinitionListItem>
  <DefinitionListItem maxColumns={2} term="項目3">内容3</DefinitionListItem>
</DefinitionList>
```

```jsx
// 意味的に異なるグループを表現する場合は、間に別の要素を挿入
<DefinitionList>
  <DefinitionListItem term="基本情報">...</DefinitionListItem>
</DefinitionList>

<h2>詳細情報</h2>

<DefinitionList>
  <DefinitionListItem term="詳細項目">...</DefinitionListItem>
</DefinitionList>
```

詳細は eslint-plugin-smarthr の各ルール README を参照してください。

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
