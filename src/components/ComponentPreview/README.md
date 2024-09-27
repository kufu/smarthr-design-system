# UIコンポーネントをプレビューするコンポーネント

`/content/articles/products/component/`以下のページなどで、UIコンポーネントの実際のレンダリング結果を表示するためのコンポーネントです。

## 使い方

MDXファイルで`import`して使うのは`<ComponentPreview>`コンポーネントです（`WrapperBase.tsx`と`ProductWrapper.tsx`は、`ComponentPreview.tsx`から`import`されている）。

## レンダリング

基本的には`children`として受け取ったJSX（TSX）をそのままレンダリングします。この際、`WrapperBase.tsx`と`ProductWrapper.tsx`で、スタイルの適用や、`SmartHR`のヘッダーの表示などを行なっています。

### オプション指定
`layout`propsでヘッダー表示の有無を切り替えるなどのオプションを指定できます。
