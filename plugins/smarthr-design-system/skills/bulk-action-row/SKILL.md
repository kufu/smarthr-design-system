---
name: bulk-action-row
description: "テーブル内に一括操作UIを配置する行コンポーネントです。「テーブル内の一括操作」パターンにおいて、複数行を選択した状態でまとめて操作するときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer2+layer3
---

テーブル内に一括操作UIを配置する行コンポーネントです。「テーブル内の一括操作」パターンにおいて、複数行を選択した状態でまとめて操作するときに使います。

`table`要素の代替として表形式でデータを表示するためのコンポーネントです。データを行列で一覧表示するとき、レコードを並べて比較するビューを提示するときに使います。

## import

```ts
import { BulkActionRow } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| ref | Ref<HTMLTableRowElement> | - | - | - |

## 実装ルール

### design-system-guideline-bulk-action-row-button
BulkActionRow内では「すべてのオブジェクトを選択」ボタンの実装には Button[variant="tertiary"] を使用することを推奨するルールです

❌ NG:

```jsx
// TextLinkは画面遷移を示すセマンティックなマークアップです
// BulkActionRowは一括操作用の領域であり、画面遷移以外の動作を担うため、Linkは不適切です
// また、コントラスト比も確保できません
<Table>
  <thead>
    <BulkActionRow>
      <Cluster align="center">
        <Text>このページの「オブジェクト名」50件すべて選択されています。</Text>
        <TextLink href={undefined} onClick={toggleAllChecked}>
          一覧の「オブジェクト名」1000件すべてを選択
        </TextLink>
      </Cluster>
    </BulkActionRow>
  </thead>
</Table>
```

```jsx
// AnchorButtonはa要素ベースのコンポーネントであり、画面遷移を示すセマンティックなマークアップです
// BulkActionRowは一括操作用の領域であり、画面遷移以外の動作を担うため、AnchorButtonは不適切です
<Table>
  <thead>
    <BulkActionRow>
      <Cluster align="center">
        <Text>このページの「オブジェクト名」50件すべて選択されています。</Text>
        <AnchorButton href={undefined} onClick={toggleAllChecked}>
          一覧の「オブジェクト名」1000件すべてを選択
        </AnchorButton>
      </Cluster>
    </BulkActionRow>
  </thead>
</Table>
```

```jsx
// prefixが付いたButtonコンポーネントを使用している
<Table>
  <thead>
    <BulkActionRow>
      <Cluster align="center">
        <Text>このページの「オブジェクト名」50件すべて選択されています。</Text>
        <SelectAllButton>一覧の「オブジェクト名」1000件すべてを選択</SelectAllButton>
      </Cluster>
    </BulkActionRow>
  </thead>
</Table>
```

```jsx
// prefixが付いたButtonコンポーネントを使用している
<Table>
  <thead>
    <BulkActionRow>
      <Cluster align="center">
        <Text>このページの「オブジェクト名」50件すべて選択されています。</Text>
        <button>一覧の「オブジェクト名」1000件すべてを選択</button>
      </Cluster>
    </BulkActionRow>
  </thead>
</Table>
```

✅ OK:

```jsx
// 「すべてのオブジェクトの選択」ボタンにvariant="tertiary"を指定
<Table>
  <thead>
    <BulkActionRow>
      <Cluster align="center">
        <Text>このページの「オブジェクト名」50件すべて選択されています。</Text>
        <Button variant="tertiary" size="S">
          一覧の「オブジェクト名」1000件すべてを選択
        </Button>
      </Cluster>
    </BulkActionRow>
  </thead>
</Table>
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
