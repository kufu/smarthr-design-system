---
name: smarthr-ui-help-link
description: "ヘルプページを開くためのテキストリンクコンポーネントです。SmartHRのヘルプセンターへ誘導するリンクを置くときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer2
---

ヘルプページを開くためのテキストリンクコンポーネントです。SmartHRのヘルプセンターへ誘導するリンクを置くときに使います。

## import

```ts
import { HelpLink } from 'smarthr-ui'
```

## Props

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
