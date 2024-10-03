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
# ルートディレクトリ上で
$ pnpm generate:thumbnails
```

また、独自のGatsbyプラグインである`/plugins/gatsby-source-component-captures/fetchComponentCaptures`の一部のfetch処理を共有で使用しており、
このプラグインが内部で`process.pwd()`を使用しているため、ルートディレクトリでないと正常に動作しません。
`__dirname`ではなく`process.pwd()`を使用している理由は、Gatsbyのコンテキストで実行されるケースでは`.cache`ディレクトリ内で実行され、
その場合`__dirname`では正常に動作しないためです。
