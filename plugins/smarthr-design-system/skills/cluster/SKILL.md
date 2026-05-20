---
name: cluster
description: "要素を水平方向に並べるためのレイアウトコンポーネントです。幅に収まり切らない場合は折り返します。ボタンやテキストなどあらゆる要素を横並びで配置するときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer2
---

要素を水平方向に並べるためのレイアウトコンポーネントです。幅に収まり切らない場合は折り返します。ボタンやテキストなどあらゆる要素を横並びで配置するときに使います。

[Every Layout](https://every-layout.dev/)の`Cluster`を参考にしています。 折り返すのではなく、要素を水平方向にスクロールさせたいときは[Reel](/products/components/layout/reel/)を使います。

## import

```ts
import { Cluster } from 'smarthr-ui'
```

## Props

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
