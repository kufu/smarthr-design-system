![smarthr-design-system](https://user-images.githubusercontent.com/4032232/106590029-06e06f80-6590-11eb-9c34-c34ad3125963.png)

## Preview Guideline Page

main branch: https://smarthr-design-system.netlify.app

## Local development

`.node-version`に記載されているバージョンのNode.jsと最新のpnpmがインストールされている必要があります。

1. Clone this repo
2. In the terminal, navigate (`cd`) to the repo directory
3. `pnpm` to install dependencies
4. `pnpm dev` to start the dev server

## 関連ドキュメント

- [開発の進め方](https://www.notion.so/SmartHR-Design-System-32637b6398eb80e5a142c87abc0c746e)
- [SmartHR Design System 環境構築の手引き 〜GitHubはじめての人向け〜](https://www.notion.so/SmartHR-Design-System-GitHub-28c37b6398eb81fdb060cb5c8c4168ab)
- [コンテンツを追加するまでの道のり 〜GitHubそんなにわからない人向けバージョン〜](https://www.notion.so/SmartHR-Design-System-GitHub-32237b6398eb80b99206f84cab4d90b0)
- [ローカル環境やプレビューで困ったときの解決メモ](https://www.notion.so/SDS-32237b6398eb80db93a7ca2b0c82cdfe)
- [Astroやコンポーネントに関する開発者向けドキュメント](https://github.com/kufu/smarthr-design-system/blob/main/CONTRIBUTING.md)

## コンテンツを編集するときに注意すること

### 1. ディレクトリにはindex.mdxが必要です。

index.mdxがないディレクトリがあった場合、左側のサイドバーや、探すページのサイトマップの表示が狂うので注意してください。

### 2. フロントマターのorderには**同階層と比べた位置**を指定する

フロントマターのorderに指定するのは**同階層での並び順**です。

自身より下層のページがある場合、index.mdxをおく必要がありますが、index.mdxは常に、**自身より1つ下の階層のファイルと横に並んでいる**ことに注意してください。

例えば、画像のように並べたい場合、

<img width="261" alt="Pasted_Image_2021_12_23_22_42" src="https://user-images.githubusercontent.com/43196286/147248999-ca756614-d3d2-4248-b38b-9f140093c667.png">

「ライティングガイド」にあたる、`/products/writing/index.mdx`に指定するorderの値は`6`になりますが、

`/products/writing/index.mdx`はエディタでは次のように見えるので、同列に並んでいるbasic-concept.mdxと比べ、`1`とつけたくなってしまいがちです。

<img width="500" alt="Pasted_Image_2021_12_23_22_51" src="https://user-images.githubusercontent.com/43196286/147253818-4ec2fe64-186f-47e1-b6b3-58914a1d22fb.png">

しかし、実際にはそれぞれの階層は次の画像のようになります。

<img width="500" alt="Pasted_Image_2021_12_23_22_51" src="https://user-images.githubusercontent.com/43196286/147253652-889b0698-e65c-4ff2-a950-9ed15c821adf.png">

というようにindex.mdxは常に1つ下の階層と隣になるので、横にあるファイルの階層が1つ下の階層であることに注意してください。

例外的に`/products/components/`以下の各コンポーネントのページではorderは適用されません。コンポーネントの名前順に並びます。

また、第2階層（「はじめに」「基本原則」など）については別途`/src/data/navigationItem.json`に定義された順序が適用されます。このJSONはヘッダー・フッター・検索ページ下部のサイトマップに反映されます。

### 3. コンポーネントを使う際の注意

`/src`のエイリアスが`@/`として設定されているので、 mdxファイル内で

```mdx
import Hoge from '../../../../src/components/hoge'
```

ではなく、

```mdx
import Hoge from '@/components/hoge'
```

と書けるようになっています。積極的に利用してください。

### 4. 見出しへのリンクは見出しの文字列で書く

見出しには、見出しの文字列から作った id が付きます（GitHub と同じ規則。英字は小文字、空白は`-`、記号は除去、日本語はそのまま）。

```mdx
## 無効（disabled）

[無効の状態](/products/components/button/#無効disabled)
```

- 同じページに同じ文字列の見出しがあると、2つ目以降は`-1`、`-2`…が付きます。
- 見出しの文字列を変えると id も変わります。その見出しへのリンクは`pnpm lint:anchors`（PR の CI でも実行）で検出されるので、あわせて直してください。
- 見出しの文字列を変えても残したい id は、`{<span id="use-finite-verbs-in-button-labels" />}`のように明示的に埋め込めます。
- 以前の`#h3-2`のような形式（レベルごとの出現順）は、新しく書かないでください。見出しを足したり消したりすると、黙って別の見出しを指すようになります。`pnpm lint:anchors --fix`で今の id に書き換えられます。
  - Slack などに貼られた古いリンクのために、見出しには以前の形式の id も残しています。

### アイコン画像の追加・削除・編集時の注意

アイコン画像（`src/content/articles/basics/icons/images/icons`）はzipでダウンロードできるようにしているため、変更があった場合はzipも更新する必要があります。コミット時にpre-commitフックで自動的に作り直されますが、手動で更新する場合は下記のコマンドを実行してください。

```
pnpm export:zip-images
```

### Gotchaアイテムの追加・削除・編集方法

Gotchaの画像はサイズが大きいため、画像配信CDN[Cloudinary](https://cloudinary.com/)を利用しています。画像の追加・更新の際はCloudinaryの`sds`フォルダに追加したい画像をアップロードしてください。

アップロードすると、Cloudinary上で名前がつきますので、`/src/data/gotchaItem.json`にその画像名と、タイトルなどの情報を記載してください。

※Cloudinaryは、1回目の画像アクセス時に画像の最適化・キャッシュを作成するので、初回表示時のみ数秒程度の時間がかかるかもしれません。2回目以降の表示が高速であれば問題ありません。

アイテムを削除したい場合は、`/src/data/gotchaItem.json`から該当の項目を削除すれば表示されなくなります。Cloudinary上の画像もあわせて削除しても構いません。

## より詳細なドキュメント

- [開発者向けの情報](https://github.com/kufu/smarthr-design-system/blob/main/CONTRIBUTING.md)

### スクリプトや自動実行

- [GitHub Actions](./.github/workflows/README.md)
- [Git hooksとhusky](./.husky/README.md)
- [リンクチェック](./scripts/content-checker/README.md)（アンカーリンクは`pnpm lint:anchors`）

### Reactコンポーネント

- [ComponentPreview](./src/components/ComponentPreview/README.md)
- [ComponentStory](./src/components/ComponentStory/README.md)
- [CodeBlock](./src/components/CodeBlock/README.md)
