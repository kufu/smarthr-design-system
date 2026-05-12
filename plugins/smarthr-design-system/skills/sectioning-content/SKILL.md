---
name: sectioning-content
description: "smarthr-ui の Section / Article / Aside / Nav を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。header要素やfooter要素、見出しの範囲を定義するためのコンポーネントです。Headingと組み合わせて使うと、見出しレベルを自動計算します。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer2
---

header要素やfooter要素、見出しの範囲を定義するためのコンポーネントです。Headingと組み合わせて使うと、見出しレベルを自動計算します。

`header`や`footer`、見出しの範囲を定義するためのコンポーネントです。[Heading](/products/components/heading/)と組み合わせて使うと、見出しレベルを自動計算します。

## import

```ts
import { Section, Article, Aside, Nav } from 'smarthr-ui'
```

## Props

### Section
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| baseLevel | number | - | - | - |

### Article
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| baseLevel | number | - | - | - |

### Aside
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| baseLevel | number | - | - | - |

### Nav
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| baseLevel | number | - | - | - |

## 実装ルール

### a11y-heading-in-sectioning-content
HeadingコンポーネントをSectioningContent(Article, Aside, Nav, Section) のいずれかで囲むことを促すルールです。<br /> 同時にSectioningContentはHeadingを内包しているか、もチェックします

❌ NG:

```jsx
// PageHeadingはSectiongContentでラップするとoutlineが乱れる可能性があるためNG
<Section>
  <PageHeading>
    hoge
  </PageHeading>
</Section>
```

✅ OK:

```jsx
// SectioningContentにはHeadingを含む必要がある
<Section>
  <Heading>hoge</Heading>
  <Section>
    <Heading>fuga</Heading>
  </Section>
</Section>
```

```jsx
// PageHeadingはSectioningContentで囲まない
<>
  <PageHeading>Page Name.</PageHeading>
  <Section>
    <Heading>hoge</Heading>
  </Section>
  <Center as="aside">
    <Heading>piyo</Heading>
  </Center>
</>
```

### a11y-prohibit-sectioning-content-in-form
form, fieldset, smarthr-ui/Fieldset 以下でSectioningContent(section, aside, article, nav)が利用されている場合、smarthr-ui/Fieldset, fieldset要素に置き換えることを促すルールです。

❌ NG:

```jsx
// form要素以下にSectionが存在するためNG
const AnyComponent = <form>
  <Section>
    <Heading>ANY TITLE.</Heading>
  </Section>
</form>
```

詳細は eslint-plugin-smarthr の各ルール README を参照してください。

## 使い方チェックリスト

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
