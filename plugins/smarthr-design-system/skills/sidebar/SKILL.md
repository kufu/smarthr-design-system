---
name: sidebar
description: "smarthr-ui の Sidebar を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。Every LayoutのSidebarを参考にしたコンポーネントです。メインコンテンツとサイドコンテンツの2つのコンテンツを配置したいときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer2
---

Every LayoutのSidebarを参考にしたコンポーネントです。メインコンテンツとサイドコンテンツの2つのコンテンツを配置したいときに使います。

[Every Layout](https://every-layout.dev/)の`Sidebar`を参考にしたコンポーネントです。メインコンテンツとサイドコンテンツの2つのコンテンツを配置したいときに使います。メインコンテンツが指定した最小幅未満になると折り返します。

## import

```ts
import { Sidebar } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| gap | Gap \| SeparateGap | 1 | - | 各領域の間隔の指定（gap） |
| align | "center" \| "start" \| "flex-start" \| "end" \| "flex-end" \| "baseline" \| "stretch" | stretch | - | - |
| right | boolean | false | - | - |
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

_checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
