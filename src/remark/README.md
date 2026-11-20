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

## remark-index-id-header

Markdown の見出しに、見出しの文字列から作った id をつけるプラグインです。採番ルールは`src/lib/headingId.ts`にあり、Checklist コンポーネント（`src/lib/getSectionAnchorMap.ts`）とアンカーリンクのチェック（`scripts/check-anchor-links.ts`）も同じ関数を使います。

```md
## 無効（disabled）
```

から

```html
<h2 id="無効disabled">
  <span id="h2-3"></span>
  無効（disabled）
</h2>
```

のような見出しを生成します（実際の出力は`FragmentTitle.astro`を通ります）。

`<span id="h2-3">`は以前の id（レベルごとの出現順）です。Slack などに貼られた`#h2-3`のような古いリンクでも、これまでと同じように飛べるよう残しています。
