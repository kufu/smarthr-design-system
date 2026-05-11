---
name: cluster
description: "smarthr-ui の clusterClassNameGenerator / Cluster を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。Every LayoutのClusterを参考にしたコンポーネントです。要素を横に均等に並べたいときに使います。幅に収まり切らなくなると要素を折返して並べます。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer2
---

Every LayoutのClusterを参考にしたコンポーネントです。要素を横に均等に並べたいときに使います。幅に収まり切らなくなると要素を折返して並べます。

[Every Layout](https://every-layout.dev/)の`Cluster`を参考にしたコンポーネントです。要素を水平方向に等間隔で並べたいときに使います。幅に収まり切らなくなると要素を折り返して並べます。

## import

```ts
import { clusterClassNameGenerator, Cluster } from 'smarthr-ui'
```

## Props

### clusterClassNameGenerator
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| inline | boolean | false | - | - |
| align | "center" \| "start" \| "flex-start" \| "end" \| "flex-end" \| "baseline" \| "stretch" | - | - | - |
| justify | "center" \| "start" \| "flex-start" \| "end" \| "flex-end" \| "stretch" \| "normal" \| "space-between" \| "space-around" \| "space-evenly" | - | - | - |
| rowGap | Gap | - | - | - |
| columnGap | Gap | - | - | - |
| class | ClassNameValue | - | - | - |
| className | ClassNameValue | - | - | - |

### Cluster
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| inline | boolean | false | - | - |
| align | "center" \| "start" \| "flex-start" \| "end" \| "flex-end" \| "baseline" \| "stretch" | - | - | - |
| justify | "center" \| "start" \| "flex-start" \| "end" \| "flex-end" \| "stretch" \| "normal" \| "space-between" \| "space-around" \| "space-evenly" | - | - | - |
| gap | Gap \| SeparateGap | 0.5 | - | - |

## 実装ルール

### best-practice-for-layouts
smarthr-ui/Layoutsに属するコンポーネント(Center,Cluster,Container,Reel,Stack,Sidebar)の利用方法をチェックするルールです。

❌ NG:

```jsx
// Cluster, Stackは子要素が複数存在する場合に利用するべきもののため
// 要素が単一の場合エラーになる
<Cluster>
  <div>
    hoge
  </div>
</Cluster>
<StyledStack>
  <Any />
</StyledStack>
```

```jsx
// centerをしたい場合、Centerコンポーネントを利用するべきなのでNG
<Cluster justify="center"><Any /></Cluster>
```

```jsx
// Heading, FormControlのlabel, Fieldsetのlegendにsmarthr-ui/Layoutsに属するコンポーネントを設置するとエラー
<Heading><Cluster><AnyIcon /><Text /></Cluster></Heading>
<FormControl label={{
  text: <Text prefixIcon={<AnyIcon />}>hoge</Cluster>
}} />
<Fieldset legend={
  <Stack>
    <Text />
    <SubText />
  </Stack>
} />
```

```jsx
// Checkbox, RadioButtonのchildrenにLayout系コンポーネントを設置する場合、as・forwardedAs属性にspanを指定していないければエラー
<AnyRadioButton><Cluster><A /><B /></Cluster></AnyRadioButton>
<RadioButtonPanel><AnyStack><A /><B /></AnyStack></RadioButtonPanel>
<AnyCheckbox><Sidebar><A /><B /></Sidebar></AnyCheckbox>
```

✅ OK:

```jsx
// 子が複数あるのでOK
<Cluster>
  <Any />
  <Any />
</Cluster>

<StyledStack>
  {flg ? 'a' : (
    <>
      <Any />
      <Any />
    </>
  )}
</StyledStack>
```

```jsx
// Cluster、かつ右寄せをしている場合は子一つでもOK
<Cluster justify="end">
  <Any />
</Cluster>
<Cluster justify="flex-end">
  <Any />
  <Any />
</Cluster>
```

```jsx
// Checkbox, RadioButtonのchildrenにLayout系コンポーネントを設置する場合、as・forwardedAs属性にspanを指定する
<AnyRadioButton><Cluster as="span"><A /><B /></Cluster></AnyRadioButton>
<RadioButtonPanel><AnyStack forwardedAs="span"><A /><B /></AnyStack></RadioButtonPanel>
<AnyCheckbox><Sidebar as="span"><A /><B /></Sidebar></AnyCheckbox>
```

詳細は eslint-plugin-smarthr の各ルール README を参照してください。

## 使い方チェックリスト

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
