<!-- textlint-disable -->
## fetchComponentCaptures.ts

[SmartHR UIのStorybook](https://story.smarthr-ui.dev/)上の各コンポーネントグループの名前やサムネイル画像のパスなどを取得します。

## データの取得

1. 最新バージョン（https://story.smarthr-ui.devにデプロイされているもの）の`index.json`を取得
1. `index.json`から各コンポーネントの名前、属するグループ名などを抜き出す
1. 抜き出した情報を元に各コンポーネントの記事 (MDX) のパスを作成
1. 記事が存在する場合データを登録

### サムネイル画像の生成

この関数では画像そのものの生成はしていません。
画像は、`/scripts/component-thumbnails` でスクリプトを実行して生成します。
