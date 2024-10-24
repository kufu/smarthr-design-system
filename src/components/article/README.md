# components/article

記事ページ (MDX) で使用するコンポーネントを格納しています。

## ComponentPropsTable.astro

smarthr-uiコンポーネントのPropsを一覧にして表示するコンポーネントです。

### 使い方

MDXファイルから`import`して使います。

コンポーネントの名前などをpropsに指定すると、自動的にそのコンポーネントのprops情報を表示します。

```mdx
import ComponentPropsTable from '@/components/article/ComponentPropsTable.astro'

## Props

<ComponentPropsTable name="ComponentName" />
```

### props情報の取得

`pnpm update:ui-data` で取得したデータを使用しています。

また、このコマンドは `pnpm build` `pnpm dev` を実行すると自動で実行されます。

## PageIndex.astro

子ページのインデックスを表示するコンポーネント

そのページの子に当たるページの一覧を表示するコンポーネントです。MDXファイル内で`import`して使用する想定です。

### 表示するページの取得

Astroの [getCollection](https://docs.astro.build/ja/reference/api-reference/#getcollection) を使用して、指定したディレクトリパス以下のMDXファイルを取得しています。

### リンク説明文の指定

`<div slot="pathName">` で囲んだ部分が、リンクの説明文として表示されます。 Markdown も記述可能です。

例：

```mdx
import PageIndex from '@/components/article/PageIndex.astro'

<PageIndex basePath="/operational-guideline/page-template/">
  <div slot="style-template">
    ページ（mdxファイル）のスタイル見本です。
  </div>
  <div slot="component-template">
    [プロダクトのコンポーネント](/products/components/)カテゴリのページを書く際のテンプレートです。
  </div>
  <div slot="design-patterns-template">
    [プロダクトのデザインパターン](/products/design-patterns/)カテゴリのページを書く際のテンプレートです。
  </div>
</PageIndex>
```

### オプション指定

propsで以下のオプションを指定できます。

- basePath: 表示するページのディレクトリパス（必須）
- heading: インデックスの見出しサイズ（任意 / デフォルトは「h2」）
- excludePaths: 表示しないページのパス（任意 / 指定した文字を含むものをすべて除外）
