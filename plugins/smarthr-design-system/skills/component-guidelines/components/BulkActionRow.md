# BulkActionRow

テーブル内に一括操作UIを配置する行コンポーネントです。「テーブル内の一括操作」パターンにおいて、複数行を選択した状態でまとめて操作するときに使います。

他のコンポーネントと組み合わせることが多いため、具体的な使用方法はよくあるテーブル（https://smarthr.design/products/design-patterns/smarthr-table/）を参照してください。

## import

```ts
import { BulkActionRow } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v96.1.1** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

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

### アクセシビリティ > セル内にチェックボックスやラジオボタンをそのまま配置しない
- [avoid] セルの内部に Checkbox や RadioButton をそのまま配置せず、TdCheckbox / ThCheckbox / TdRadioButton を利用する

### アクセシビリティ > TdCheckboxおよびTdRadioButtonでは行を特定できる要素をIDで参照する
- [must] TdCheckbox および TdRadioButton を利用する場合は `aria-labelledby` 属性を必ず指定し、それだけで行を一意に判別できる要素への ID 参照を指定する
- [must] オブジェクト名だけで一意に判別できないオブジェクトでは、複数の要素の ID 参照をスペース区切りで指定する
