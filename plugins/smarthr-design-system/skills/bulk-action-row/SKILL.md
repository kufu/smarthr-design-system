---
name: bulk-action-row
description: "smarthr-ui の BulkActionRow を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。テーブル内の一括操作行です。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer3
---

テーブル内の一括操作行です。

他のコンポーネントと組み合わせることが多いため、具体的な使用方法は[よくあるテーブル](/products/design-patterns/smarthr-table/)を参照してください。

## import

```ts
import { BulkActionRow } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| ref | Ref<HTMLTableRowElement> | - | - | - |

## 実装ルール

BulkActionRow に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

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
