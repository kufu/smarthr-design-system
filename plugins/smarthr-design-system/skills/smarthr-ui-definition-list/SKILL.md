---
name: smarthr-ui-definition-list
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

### 使用上の注意
- [should] 原則としてデータの編集や送信を伴わない画面においてデータを表示する場合は DefinitionList を使用するのを推奨する

### 使用上の注意 > Inputの意匠を残してデータを表示したいときはreadOnlyのInputを検討する
- [should] フォームに入力した内容の確認画面など、Input の意匠を残してデータを表示したい場合は DefinitionList ではなく readOnly の Input の利用を検討する

### レイアウト > カラム数の指定
- [must] 表示したいデータの内容に合わせて `maxColumns` props で適切な列数を指定する

### レイアウト > カラム数の指定 > 関連性のある項目がある場合
- [should] 関連性のある項目（例: 氏名とヨミガナ）は横に並べて表示することで関連性をユーザーに伝える
- [must] 関連性のある項目を横並びにする場合は `maxColumns` props に横並びにしたい項目の数を指定する

### レイアウト > カラム数の指定 > 意図的に項目を一列で表示したい場合
- [must] 画面幅や項目の文字数にかかわらず意図的に項目を一列で表示したい場合は `maxColumns` props に `1` を指定する

### レイアウト > 見出しの種類
- [must] コンテンツのアウトラインに沿って適切な見出しレベルを指定する
  - DefinitionList を含むコンテンツの見出しが `sectionTitle` の場合、`termStyleType` props に `blockTitle` を指定する

### レイアウト > 表示項目が1つしかない場合
- [should] 表示項目が 1 つしかない場合に罫線が視線誘導を妨げるなら別の意匠を検討する
