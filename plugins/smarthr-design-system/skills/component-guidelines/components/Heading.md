# Heading

見出し要素の代替として直後のコンテンツの見出しを示すコンポーネントです。「セクション」や「ブロック」に見出しをつけるときに使います。

## import

```ts
import { Heading } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v95.0.0** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| unrecommendedTag | "h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6" | - | - | 可能な限り利用せず、SectioningContent(Article, Aside, Nav, Section)を使ってHeadingと関連する範囲を明確に指定する方法を検討してください |
| visuallyHidden | boolean | - | - | 視覚的に非表示にするフラグ |
| icon | any | - | - | テキスト左に設置するアイコン |
| type | "sectionTitle" \| "blockTitle" \| "subBlockTitle" \| "subSubBlockTitle" | - | - | テキストのスタイル テキストのスタイル  screenTitleを使用する場合、PageHeadingコンポーネントを使用してください |
| size | "L" \| "XL" \| "XXL" | 'L' | - | テキストのサイズ  `sectionTitle`の場合、`XXL`か`XL`か`L`を指定してください |

## 実装ルール

### a11y-heading-in-sectioning-content
HeadingコンポーネントをSectioningContent(Article, Aside, Nav, Section) のいずれかで囲むことを促すルールです。<br /> 同時にSectioningContentはHeadingを内包しているか、もチェックします

❌ NG:

```jsx
// Headingがsmarthr-ui/SectioningContent(Article, Aside, Nav, Section)のいずれかで囲まれていないためNG
<div>
  <Heading>
    hoge
  </Heading>
</div>
```

```jsx
// buildinのSectioningContentではなくsmarthr-ui/SectioningContentで囲まなければ
// Headingレベルの自動計算が有効にならないためNG
<section>
  <Heading>
    hoge
  </Heading>
</section>
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

### a11y-prohibit-useless-sectioning-fragment
Headingレベルの自動計算用のコンポーネントであるSectioningFragmentが不必要に利用されている場合を検知し、修正を促します

詳細は eslint-plugin-smarthr の各ルール README を参照してください。

## 使い方チェックリスト

### 使用上の注意
- [must] Heading はコンテンツのアウトラインに沿って順に使用する
  - ブロックタイトルの前にサブ・ブロックタイトルを使わない

### 種類 > 画面タイトル
- [must] 画面のタイトルには PageHeading コンポーネントを使う
