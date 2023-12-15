# StoryBookを表示するコンポーネント

[SmartHR UIのStorybook](https://story.smarthr-ui.dev/)を表示するためのコンポーネントです。

## 概要
- iframeでStorybookを表示します。
- バージョンを切り替えるため、実際にはchromaticのドメインにあるものを表示しています。
- iframeの下部にはStoryのソースコードも表示します。

## 使い方

MDXファイルから`import`して使います。コンポーネントの名前などをpropsに指定すると、自動的にそのコンポーネントの情報を表示します。

## データの取得

Gatsbyのビルド時に、gatsby-source-ui-versionsがGraphQL Data LayerにコンポーネントごとのStoryの情報を登録しているので、それを取得して使います。Storyの情報はバージョンごとに存在するので
、バージョン切り替え時にはiframeの中身を切り替わります。

### コードの取得

コードはビルド時には登録していないので、クライアントサイドで取得します。具体的にはGitHubへのfetchが行われます。バージョン切り替え時には再度fetchします。
