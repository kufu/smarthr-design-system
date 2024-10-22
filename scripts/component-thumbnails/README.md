## Puppeteerのインストールについて

コンポーネントのサムネイル画像を生成するために、Puppeteerを使ってStorybookのページにアクセスしてスクリーンショットを撮影しています。

そのためPuppeteerのインストールが必要ですが、SDS本体のpackage.jsonにPuppeteerを定義するとビルドで
毎回SDSに不要なPuppeteerがインストールされてしまうため、Puppeteerはこのディレクトリ内でインストールしてください。

```bash
$ cd scripts/component-thumbnails
$ pnpm install
```

## サムネイルの画像生成について

ルートディレクトリで以下のコマンドを実行すると、各コンポーネントのサムネイル画像が`static/thumbnails`内に生成されます。
これは開発者が必要に応じて手動で実行し、commit、pushをする必要があります。

```bash
$ pnpm generate:thumbnails
```
