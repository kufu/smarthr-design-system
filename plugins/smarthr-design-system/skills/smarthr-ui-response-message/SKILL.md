---
name: smarthr-ui-response-message
description: "システムからの通知を表示するためのアイコン付きテキストコンポーネントです。要素の状態や操作結果のフィードバックを要素の近くに表示するときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer2+layer3
---

システムからの通知を表示するためのアイコン付きテキストコンポーネントです。要素の状態や操作結果のフィードバックを要素の近くに表示するときに使います。

## import

```ts
import { ResponseMessage } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| color | string \| 'TEXT_BLACK' \| 'TEXT_GREY' \| 'TEXT_DISABLED' \| 'TEXT_LINK' \| 'MAIN' \| 'DANGER' \| 'WARNING' \| 'BRAND' | - | - | アイコンの色 |
| size | any | - | - | - |
| status | "error" \| "warning" \| "info" \| "success" \| "sync" | info | - | - |

## 実装ルール

### best-practice-for-response-message
ResponseMessageコンポーネントの適切な使用を促すルールです。現時点では、見出しやラベルで使用することを禁止します。

❌ NG:

```jsx
// Heading系のchildren内
<Heading>
  <ResponseMessage type="success">Xxxx</ResponseMessage>
</Heading>

<h1>
  <ResponseMessage type="info">Hoge</ResponseMessage>
</h1>

<PageHeading>
  <ResponseMessage type="warning">Fuga</ResponseMessage>
</PageHeading>

// FormControlのlabel属性
<FormControl
  label={<ResponseMessage type="success">Foo</ResponseMessage>}
>
  <Input />
</FormControl>

// Fieldsetのlegend属性
<Fieldset
  legend={<ResponseMessage type="info">Bar</ResponseMessage>}
>
  <RadioButton name="option">オプション1</RadioButton>
</Fieldset>

// label要素のchildren内
<label>
  <ResponseMessage type="success">Foo</ResponseMessage>
</label>

// legend要素のchildren内
<legend>
  <ResponseMessage type="warning">Bar</ResponseMessage>
</legend>
```

✅ OK:

```jsx
// Heading系コンポーネントの場合はicon属性を使用
<Heading icon={<FaCircleCheckIcon />}>Xxxx</Heading>

<PageHeading icon={<FaCircleInfoIcon />}>Hoge</PageHeading>

// 生のheading要素の場合はTextを使用
<h1>
  <Text icon={<FaCircleInfoIcon />}>Fuga</Text>
</h1>

// FormControlの場合はlabel.icon属性を使用
<FormControl label={{ text: 'Foo', icon: <FaCircleCheckIcon /> }}>
  <Input />
</FormControl>

// Fieldsetの場合はlegend.icon属性を使用
<Fieldset legend={{ text: 'Bar', icon: <WarningIcon /> }}>
  <RadioButton name="option">オプション1</RadioButton>
</Fieldset>

// 生のlabel/legend要素の場合はTextを使用
<label>
  <Text icon={<FaCircleInfoIcon />}>Foo</Text>
</label>

<legend>
  <Text icon={<FaCircleExclamationIcon />}>Bar</Text>
</legend>

// ResponseMessageは結果表示に使用
<div>
  <ResponseMessage type="success">
    データを保存しました
  </ResponseMessage>
</div>

<section>
  <Heading>Xxxx</Heading>
  <ResponseMessage type="error">
    エラーが発生しました
  </ResponseMessage>
</section>
```

詳細は eslint-plugin-smarthr の各ルール README を参照してください。

## 使い方チェックリスト

### 使用上の注意
- [must] ResponseMessage は直前に操作した要素の近くに表示する

### 種類
- [should] `status="sync"` は NotificationBar のために存在するため、基本的に使わない
