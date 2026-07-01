# HelpLink

ヘルプページを開くためのテキストリンクコンポーネントです。SmartHRのヘルプセンターへ誘導するリンクを置くときに使います。

## import

```ts
import { HelpLink } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v96.1.0** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

（固有 Props なし）

## 実装ルール

### a11y-help-link-with-support-href
[ヘルプページ](https://support.smarthr.jp/)へのリンクは[smarthr-ui/HelpLink](https://smarthr.design/products/components/text-link/help-link/)を使うことを促すルールです

✅ OK:

```jsx
<HelpLink href="https://support.smarthr.jp/xxxxx">any</HelpLink>
<HelpLink href={`//support.smarthr.jp/${hoge}`}>any</HelpLink>
```

詳細は eslint-plugin-smarthr の各ルール README を参照してください。

## 使い方チェックリスト

使い方チェックリスト（Layer 3）は設定されていません。
