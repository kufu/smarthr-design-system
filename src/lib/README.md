<!-- textlint-disable -->
## fetchComponentCaptures.ts

[SmartHR UIのStorybook](https://story.smarthr-ui.dev/)上の各コンポーネントグループの名前やサムネイル画像のパスなどを取得します。

## データの取得

1. 利用中のバージョンのStorybook（Chromaticのパーマリンク）の`index.json`を取得
1. `index.json`から各コンポーネントの名前、属するグループ名などを抜き出す
1. 抜き出した情報を元に各コンポーネントの記事 (MDX) のパスを作成
1. 記事が存在する場合データを登録

`index.json`は https://story.smarthr-ui.dev から取得していましたが、Netlifyの内部ビルダーからアクセスできず
ビルドが失敗するため、Chromaticのパーマリンクから取得しています。
パーマリンクの生成に使うコミットハッシュは`getUIData.ts`（`scripts/fetch-ui-data.ts`が作るキャッシュ）から取得しているため、
この関数を使う前に`pnpm update:ui-data`が実行されている必要があります。

### サムネイル画像の生成

この関数では画像そのものの生成はしていません。
画像は、`/scripts/component-thumbnails` でスクリプトを実行して生成します。
