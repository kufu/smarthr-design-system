![smarthr-design-system](https://user-images.githubusercontent.com/4032232/106590029-06e06f80-6590-11eb-9c34-c34ad3125963.png)

## Preview Guideline Page

main branch: https://smarthr-design-system.netlify.app

## Local development

1. Clone this repo
2. In the terminal, navigate (`cd`) to the repo directory
3. `yarn` to install dependencies
4. `yarn dev` to start the dev server

## 開発の進め方

https://smarthr-inc.docbase.io/posts/1726096

## SmartHR Design System 環境構築の手引き 〜GitHubはじめての人向け〜
https://smarthr-inc.docbase.io/posts/2162922

## コンテンツを追加するまでの道のり 〜GitHubそんなにわからない人向けバージョン〜

https://smarthr-inc.docbase.io/posts/2083788

## ローカル環境やプレビューで困ったときの解決メモ
https://smarthr-inc.docbase.io/posts/2289638

## コンテンツを編集するときに注意すること

### 1. ディクレトリにはindex.mdxが必要です。

index.mdxがないディレクトリがあった場合、左側のサイドバーや、探すページのサイトマップの表示が狂うので注意して下い。

### 2. フロントマターのorderには**同階層と比べた位置**を指定する

フロントマターのorderに指定するのは**同階層での並び順**です。

自身より下層のページがある場合、index.mdxをおく必要がありますが、index.mdxは常に、**自身よりひとつ下の階層のファイルと横に並んでいる**ことに注意してください。

例えば、画像のように並べたい場合、

<img width="261" alt="Pasted_Image_2021_12_23_22_42" src="https://user-images.githubusercontent.com/43196286/147248999-ca756614-d3d2-4248-b38b-9f140093c667.png">

「ライティングガイド」にあたる、`/products/writing/index.mdx`に指定するorderの値は`6`になりますが、

`/products/writing/index.mdx`はエディタでは次のように見えるので、同列に並んでいるbasic-concept.mdxと比べ、`1`とつけたくなってしまいがちです。

<img width="500" alt="Pasted_Image_2021_12_23_22_51" src="https://user-images.githubusercontent.com/43196286/147253818-4ec2fe64-186f-47e1-b6b3-58914a1d22fb.png">

しかし、実際にはそれぞれの階層は次の画像のようになります。

<img width="500" alt="Pasted_Image_2021_12_23_22_51" src="https://user-images.githubusercontent.com/43196286/147253652-889b0698-e65c-4ff2-a950-9ed15c821adf.png">

というようにindex.mdxは常にひとつ下の階層と隣になるので、横にあるファイルの階層がひとつ下の階層であることに注意してください。

### 3. Reactコンポーネントを使う際の注意

`/src/components`までのエイリアスが`@Components`として設定されているので、 mdxファイル内で

```mdx
import { hoge } from '../../../../src/components/hoge'
```

ではなく、

```mdx
import { hoge } from '@Components/hoge'
```

と書けるようになっています。積極的に利用してください。

### イラスト画像の追加・削除・編集時の注意

イラスト画像はzipでダウンロードできるようにしているため、変更があった場合はzipファイルも更新する必要があります。下記のコマンドを実行してください。

```
yarn export:zip-images
```

## ローカルで従業員ログインを動作させる

`yarn dev`で実行される`gatsby develop`コマンドで立ち上げたローカル環境では従業員ログインが動作しません。

画像のようにログインしていないはずなのに「ログイン済みです」と返ってくるはずです。

<img width="30%" src="https://user-images.githubusercontent.com/43196286/146522761-38adf580-43d6-411b-a85c-d541c6a43dff.png" />

これはローカルでは`/static/_redirects`に置かれたNetlifyのプロキシ設定が動作しないからです。

### 具体的な確認方法

ローカルで動作させるためには[Netlify CLI](https://docs.netlify.com/cli/get-started/)が必要です。

```
npm install netlify-cli 
```

で、`netlify-cli`をインストールし

```
netlify dev
```

コマンドでサーバーを立ち上げてください。(デフォルトで`http://localhost:8888`)

それとは別に、

```
yarn dev
```

でGatsbyのサーバーを立ち上げます。(デフォルトで`http://localhost:8000`)

そうすれば、netlify-cliで立ち上げたほうのサーバー( http://localhost:8888 )から確認できます。


