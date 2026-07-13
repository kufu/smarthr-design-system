# Stack

要素を垂直方向に並べるためのレイアウトコンポーネントです。ページの「セクション」や「ブロック」、段落、フォーム項目などあらゆる要素を垂直に積み重ねて配置するときに使います。

Every Layout（https://every-layout.dev/）のStackを参考にしています。

## import

```ts
import { Stack } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v97.0.0** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

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

使い方チェックリスト（Layer 3）は設定されていません。
