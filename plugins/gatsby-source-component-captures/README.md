# gatsby-source-component-captures

[SmartHR UIのStorybook](https://story.smarthr-ui.dev/)上の各コンポーネントグループの名前やサムネイル画像のパスなどをGatsbyのGraphQL Data Layerに追加するプラグインです。

## データの取得

1. 最新バージョン（https://story.smarthr-ui.devにデプロイされているもの）の`stories.json`を取得
2. `stories.json`から各コンポーネントの名前、属するグループ名などを抜き出す。

### Gatsby GraphQL Data Layerへの追加

グループごとに、属するコンポーネントの名前やサムネイル画像のパスなどをGatsbyのGraphQL Data Layerに追加しています。その際、対応するMDXファイルが存在しないコンポーネントは除外します。

#### 登録したデータを使っている場所

- `/src/components/ComponentCaptures` から、`useStaticQuery`で取得

### サムネイル画像の生成

このプラグインで行っているのは、画像パスのGraphQL Data Layerの登録のみで、画像そのものの生成はしていません。
画像は、`/scripts/component-thumbnails` でスクリプトを実行して生成します。
