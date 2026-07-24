# Sidebar

メインコンテンツとサイドコンテンツの2カラムを配置するためのレイアウトコンポーネントです。「コレクションとシングルの2カラム（https://smarthr.design/products/design-patterns/page-layout/#h3-13）」ページレイアウトなど、メインとサブの関係がある要素を左右に並べるときに使います。メインコンテンツが指定した最小幅未満になると折り返します。

## import

```ts
import { Sidebar } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v98.1.0** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| right | boolean | false | - | - |
| gap | Gap \| SeparateGap | 1 | - | 各領域の間隔の指定（gap） |
| align | "center" \| "start" \| "flex-start" \| "end" \| "flex-end" \| "baseline" \| "stretch" | stretch | - | - |
| contentsMinWidth | MinWidth<string \| number> | 50% | - | コンポーネントの `min-width` 値 |

## 実装ルール

### best-practice-for-layouts
smarthr-ui/Layoutsに属するコンポーネント(Center,Cluster,Container,Reel,Stack,Sidebar)の利用方法をチェックするルールです。

❌ NG:

```jsx
// Checkbox, RadioButtonのchildrenにLayout系コンポーネントを設置する場合、as・forwardedAs属性にspanを指定していないければエラー
<AnyRadioButton><Cluster><A /><B /></Cluster></AnyRadioButton>
<RadioButtonPanel><AnyStack><A /><B /></AnyStack></RadioButtonPanel>
<AnyCheckbox><Sidebar><A /><B /></Sidebar></AnyCheckbox>
```

✅ OK:

```jsx
// Checkbox, RadioButtonのchildrenにLayout系コンポーネントを設置する場合、as・forwardedAs属性にspanを指定する
<AnyRadioButton><Cluster as="span"><A /><B /></Cluster></AnyRadioButton>
<RadioButtonPanel><AnyStack forwardedAs="span"><A /><B /></AnyStack></RadioButtonPanel>
<AnyCheckbox><Sidebar as="span"><A /><B /></Sidebar></AnyCheckbox>
```

詳細は eslint-plugin-smarthr の各ルール README を参照してください。

## 使い方チェックリスト

使い方チェックリスト（Layer 3）は設定されていません。
