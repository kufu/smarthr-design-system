# SectioningContent

header、footer、section、articleなどのセクショニング要素を表現するためのコンポーネントです。Headingと組み合わせて見出しレベルを自動計算するときに使います。

## import

```ts
import { Section, Article, Aside, Nav } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v96.1.1** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

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

使い方チェックリスト（Layer 3）は設定されていません。
