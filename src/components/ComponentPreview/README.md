# UIコンポーネントをプレビューするコンポーネント

`/content/articles/products/component/`以下のページなどで、UIコンポーネントの実際のレンダリング結果を表示するためのコンポーネントです。

## 使い方

MDXファイルで`import`して使うのは`<ComponentPreview>`コンポーネントです（`WrapperBase.tsx`と`ProductWrapper.tsx`は、`ComponentPreview.tsx`から`import`されている）。

## レンダリング

基本的には`children`として受け取ったJSX（TSX）をそのままレンダリングします。この際、`WrapperBase.tsx`と`ProductWrapper.tsx`で、スタイルの適用や、`SmartHR`のヘッダーの表示などを行なっています。

### オプション指定

`layout`propsでヘッダー表示の有無を切り替えるなどのオプションを指定できます。

## スタイリングについて

`components/article/CodeBlock/LiveContainer` で iframe 内に配置されるため、CSS Modules への移行は使わずに引き続き styled-components を利用しています。

もし、CSS Modules や Tailwind CSS への移行を実施する場合は、iframe 内へのスタイルの適用方法を検討する必要があります。
