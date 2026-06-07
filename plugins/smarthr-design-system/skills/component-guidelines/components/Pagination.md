# Pagination

「よくあるテーブル（https://smarthr.design/products/design-patterns/smarthr-table/）」などの一覧のページを切り替えるためのコンポーネントです。大量データを分割表示し、ページ単位で前後移動させるときに使います。使用する場所によって機能を落とせます。

## import

```ts
import { Pagination } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| total | number | - | ✓ | 全ページ数 |
| current | number | - | ✓ | 現在のページ |
| padding | number | - | - | 現在のページの前後に表示するページ番号のボタンの数 |
| withoutNumbers | boolean | - | - | `true` のとき、ページ番号のボタンを表示しない |
| onClick | ((pageNumber: number, e: MouseEvent<HTMLElement, MouseEvent>) => void) \| ((href: string, e: MouseEvent<HTMLElement, MouseEvent>) => void) | - | - | ボタンを押下したときに発火するコールバック関数 リンクを押下したときに発火するコールバック関数 |
| hrefTemplate | (pageNumber: number) => string | - | - | href属性生成用関数。設定した場合、番号やarrowがbuttonからa要素に置き換わります |
| linkAs | ElementType | - | - | next/linkなどのカスタムコンポーネントを指定します。指定がない場合はデフォルトで `a` タグが使用されます。 |

## 実装ルール

Pagination に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

### モバイル > Paginationの代わりに、データを追加で読み込むボタンの利用を検討する
- [should] モバイルでは Pagination の代わりに、データを追加で読み込んで表示するボタン（例: よくあるリストの「さらに表示」ボタン）の利用を検討する
  - ただし、表示されるデータの件数が多いと想定される場合や、一覧上から特定のデータを探して操作することが主要な使われ方として想定される場合は、モバイルでも Pagination が適していることがある
- [must] モバイルで Pagination を表示する場合は、`withoutNumber` props を有効にするか、`padding` props に 0〜1 の値を設定する
