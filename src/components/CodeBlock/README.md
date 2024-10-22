# コードを表示するコンポーネント

## 使い方

MDX内で記述したコードフェンスは `src/pages/[...slug].astro` 内の設定により、この`<CodeBlock>`コンポーネントに変換されます。

````
```typescript
// コード
```
````

### MDX内で直接使用する場合

CodeBlock なら `@/components/article/CodeBlock.astro`、renderingComponent を指定したいなら `@/components/article/DesignPatternCodeBlock` を `import` してください。

この Astro コンポーネントには info string のパースや、データの取得、アイランドとして読み込む設定などが含まれています。

## レンダリングの分岐

指定されたprops（MDX内で"```"に続いて指定されたinfo string）により、どのようにレンダリングするかを分岐しています。

### editableが指定された場合
[react-live](https://github.com/FormidableLabs/react-live)を使って、ライブエディタをレンダリングします。コードの上には実行結果が表示され、コードの編集が反映されます。

さらに、`renderingComponent`が指定されている場合は、[デザインパターンのStorybook](https://main--62f0ae48c21b0728fd1a5c85.chromatic.com/)へのリンクも表示します。

### editableが指定されていない場合
シンタックスハイライトを適用した（静的な）コードブロックを表示します。

## ライブエディタ

iframe内にreact-liveが提供するライブエディタを表示します。このフレーム内にはsmarthr-normalize-cssが適用されています。

### react-frame-component
iframeの表示には[react-frame-component](https://www.npmjs.com/package/react-frame-component)を利用しています。

### TypeScript
ライブエディタでは、コードをTypeScriptとしてトランスパイルするようになっています。
