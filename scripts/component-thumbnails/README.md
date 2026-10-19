## Puppeteerのインストールについて

コンポーネントのサムネイル画像を生成するために、Puppeteerを使ってStorybookのページにアクセスしてスクリーンショットを撮影しています。

Puppeteerは本体の`package.json`ではなく、このディレクトリの`package.json`に定義しています。このディレクトリはpnpmのワークスペース（`pnpm-workspace.yaml`）に含まれているため、ルートディレクトリで`pnpm install`を実行するとPuppeteerもあわせてインストールされます。

## サムネイルの画像生成について

ルートディレクトリで以下のコマンドを実行すると、各コンポーネントのサムネイル画像が`public/thumbnails/component-stories`内に生成されます。
これは開発者が必要に応じて手動で実行し、commit、pushをする必要があります。

```bash
$ pnpm generate:thumbnails
```
