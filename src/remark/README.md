# 独自のremarkプラグイン

## remark-code-block

コードブロックからメタ情報を取得するためのプラグインです。
デフォルトでは、言語の指定より後の部分 (`editable layout=product`など) が取得できないので作成しました。

```md
```tsx editable layout=product
const a = "Hello, World!";
```

から

```json
{
  "code": "const a = \"Hello, World!\";",
  "language": "tsx",
  "meta": "editable layout=product"
}
```

のようなデータを生成します。

metaは`@/components/article/CodeBlock.astro`内で`[key: string]: string | boolean`のオブジェクトに変換され、`@/coponents/CodeBlock`にPropsとして渡されます。
