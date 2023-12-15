# コードを表示するコンポーネント

## CodeBlockコンポーネント

MDX内で、`codeBlock`つき記述したコードフェンスは、`article.tsx`テンプレートでこの`<CodeBlock>`コンポーネントに変換されます（`codeBlock`を付けていないコードフェンスには、`<code>`タグが適用されます）。

`<CodeBlock>`が適用されるマークダウンの記載例：
````
```typescript codeBlock
// コード
```
````

### レンダリングの分岐

`<CodeBlock>`コンポーネント内でも、指定されたprops（MDX内で"```"に続いて指定されたinfo string）により、どのようにレンダリングするかを分岐しています。

#### editableが指定された場合
[react-live](https://github.com/FormidableLabs/react-live)を使って、ライブエディタをレンダリングします。コードの上には実行結果が表示され、コードの編集が反映されます。

さらに、`renderingComponent`が指定されている場合は、[デザインパターンのStorybook](https://main--62f0ae48c21b0728fd1a5c85.chromatic.com/)へのリンクも表示します。

#### editableが指定されていない場合
シンタックスハイライトを適用した（静的な）コードブロックを表示します。

### ライブエディタ

iframe内にreact-liveが提供するライブエディタを表示します。このフレーム内にはsmarthr-normalize-cssが適用されています。

#### react-frame-component
iframeの表示には[react-frame-component](https://www.npmjs.com/package/react-frame-component)を利用しています。

#### TypeScript
ライブエディタでは、コードをTypeScriptとしてトランスパイルするようになっています。TypeScript自体のコードは容量が大きいためGatsbyフレームワークのビルドには含めず、クライアントでのみCDNから読み込むようにしています（`<script>`タグです）。

## DesignPatternCodeBlockコンポーネント

`/content/articles/products/design-patterns`以下のMDXファイルから直接`import`して使用されるコンポーネントです。

ビルド時に、[smarthr-patterns](https://github.com/kufu/smarthr-patterns)のGitHubリポジトリから読み込んだコードが、GraphQL Data Layerに登録されているため、デザインパターンの名前を指定するだけでコードを表示するようになっています。

### 関連するファイル
- `/src/gatsby-node/index.ts`
- `/src/lib/fetchPatternCode.ts`
