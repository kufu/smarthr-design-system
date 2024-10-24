# StoryBookを表示するコンポーネント

[SmartHR UIのStorybook](https://story.smarthr-ui.dev/)を表示するためのコンポーネントです。

## 概要

- iframeでStorybookを表示します。
- iframeの下部にはStoryのソースコードも表示します。

## 使い方

`src/components/ComponentStory` ではなく、`src/components/article/ComponentStory.astro` を `import` してください。

Astroコンポーネントの `ComponentStory` にはデータの取得や、アイランドとして読み込む指定などが含まれています。

```mdx
import ComponentPropsTable from '@/components/article/ComponentPropsTable.astro'

<ComponentStory name="ComponentName" />
```

コンポーネントの名前などをpropsに指定すると、自動的にそのコンポーネントの情報を表示します。

また、`noMargin`を指定すると、iframeのマージンを削除します。ページの先頭に配置する際に指定してください。

(アイランドとして読み込まれる関係で、ページ先頭の要素のマージンを消す CSS が適用されない問題を解決するためのものです)

```mdx
import ComponentPropsTable from '@/components/article/ComponentPropsTable.astro'

<ComponentStory name="ComponentName" noMargin />
```

### コードの取得

ビルド時にGitHubから取得し、埋め込んでいます。
