---
name: stack
description: "smarthr-ui の Stack を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。Every LayoutのStackを参考にしたコンポーネントです。要素を縦に均等に並べたいときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer2
---

Every LayoutのStackを参考にしたコンポーネントです。要素を縦に均等に並べたいときに使います。

[Every Layout](https://every-layout.dev/)の`Stack`を参考にしたコンポーネントです。要素を垂直方向に等間隔で並べたいときに使います。

## import

```ts
import { Stack } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| inline | boolean | false | - | - |
| gap | Gap | 1 | - | - |
| align | "center" \| "start" \| "flex-start" \| "end" \| "flex-end" \| "baseline" \| "stretch" | - | - | - |

## 実装ルール

### best-practice-for-layouts
smarthr-ui/Layoutsに属するコンポーネント(Center,Cluster,Container,Reel,Stack,Sidebar)の利用方法をチェックするルールです。

❌ NG:

```jsx
// divに置き換え可能 or Stackの内部的なstyleを期待した実装になってしまうためNG
<Stack gap={0}>
  <Any />
  <Any />
</Stack>
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

✅ OK:

```jsx
// Stackはas="span"、もしくはforwardedAs="span"を指定すれば利用できる
<Fieldset legend={
  <Stack as="span">
    <Text />
    <SubText />
  </Stack>
} />
<FormControl label={{
  text: (
   <AnyStack forwardedAs="span">
     <Text />
     <SubText />
   </AnyStack>
  ),
}} />
```

詳細は eslint-plugin-smarthr の各ルール README を参照してください。

## 使い方チェックリスト

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
