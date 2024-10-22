# UIコンポーネントをプレビューするコンポーネント

`src/content/articles/products/component/`以下のページなどで、UIコンポーネントの実際のレンダリング結果を表示するためのコンポーネントです。

## 使い方

MDXファイルで`import`して使うのは`<ComponentPreview>`コンポーネントです。

以下のように使ってください。

```mdx
import ComponentPreview from '@/components/ComponentPreview/ComponentPreview'

<ComponentPreview>
  {/* ここにレンダリングしたいコンポーネントを記述 */}
</ComponentPreview>
```

## スタイリングについて

このコンポーネントは次の箇所で使用されています。

- MDXファイル内
- `components/article/CodeBlock/LiveContainer` の iframe の中

他コンポーネントと同じように CSS Modules を使うと、iframe 内で使用された場合にスタイルが適用されなくなってしまいます。

そのため、暫定的にインラインスタイルでスタイリングしています。
