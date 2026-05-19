---
name: text-link
description: "テキストにリンクを付けるとき、アンカー要素をデザインシステム準拠で使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するときに使う。a要素の代わりに使用する汎用テキストリンクコンポーネントです。本文中にリンクを置くとき、HelpLinkやUpwardLinkで表現できないテキストリンクを提供するときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer2+layer3
---

a要素の代わりに使用する汎用テキストリンクコンポーネントです。本文中にリンクを置くとき、HelpLinkやUpwardLinkで表現できないテキストリンクを提供するときに使います。

`a`要素の代わりに使用する汎用テキストリンクコンポーネントです。本文中にリンクを置くとき、[HelpLink](/products/components/text-link/help-link/)や[UpwardLink](/products/components/text-link/upward-link/)で表現できないテキストリンクを提供するときに使います。

## import

```ts
import { TextLink } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| size | "XS" \| "S" \| "M" | - | - | - |
| onClick | (e: MouseEvent<Element, MouseEvent>) => void | - | - | リンクをクリックした時に発火するコールバック関数 |
| prefix | ReactNode | - | - | テキストの前に表示するアイコン |
| suffix | ReactNode | - | - | テキストの後ろに表示するアイコン |
| elementAs | ElementType | - | - | TextLinkを利用しつつnext/linkなどと併用する場合に指定する |
| ref | any | - | - | - |

## 実装ルール

### design-system-guideline-prohibit-double-icons
要素の前後両方にアイコンの使用を禁止するルールです。`Button` や `TextLink` において、`prefix` と `suffix` が同時に設定されている場合、エラーとなります。

✅ OK:

```jsx
<Button>hoge</Button>
<Button suffix={SUFFIX}>hoge</Button>
<Button prefix="PREFIX">hoge</Button>
<TextLink>hoge</TextLink>
<TextLink suffix="SUFFIX">hoge</TextLink>
<TextLink prefix={PREFIX}>hoge</TextLink>
<StyledButton>hoge</StyledButton>
<StyledLink>hoge</StyledLink>
<Input prefix={PREFIX} suffix={SUFFIX} />
```

詳細は eslint-plugin-smarthr の各ルール README を参照してください。

## 使い方チェックリスト

### 使用上の注意 > ユースケースに応じてコンポーネントを使い分ける > 選択肢が多すぎる場合は別のコンポーネントを検討する
- [should] 選択肢の中から単一の値を選択して入力させる場合は、基本的にラジオボタンを使用する
  - 選択肢の数が不定で予測できないなどの理由がない限りはラジオボタンの使用を推奨する
- [should] 選択肢のラベルテキストが長大、または選択肢が表示領域に収まらないほど多い場合は Select や SingleCombobox も検討する

### 使用上の注意 > ユースケースに応じてコンポーネントを使い分ける > 選択肢のラベルテキストはなるべく簡潔に同程度の文量で収める
- [must] ラジオボタンのラベルテキストは同程度の文量や行数になるように調整する
- [should] 選択肢に補足説明やステータスラベルなど複数要素を追加したい場合や、選択肢を視覚的に強調したい場合は RadioButtonPanel を検討する

### 使用上の注意 > ユースケースに応じてコンポーネントを使い分ける > ビューの切り替えを操作するUIとして使用しない
- [must] ラジオボタンは入力後に `送信` や `保存` などの type="submit" のボタンを押すことで内容が反映される場合に使用する
- [must] 即時反映を前提とする箇所では TabBar や SegmentedControl、または Switch を使用する

### 使用上の注意 > ユースケースに応じてコンポーネントを使い分ける > ラジオボタンの並び順
- [should] 横幅に十分なスペースがある場合は基本的に横並びにする
  - 選択肢の文字が長くなる場合は縦並びを検討する

### 使用上の注意 > ラジオボタン内に操作可能な要素を含めない
- [avoid] ラジオボタン内には、ヘルプページへのリンクや Input など、ユーザーが値を選択する以外の操作可能な要素を配置しない
- [must] リンクを置きたい場合は Fieldset の `helpMessage` props などを使用する
- [should] Combobox などで選択肢に応じて段階的に別の操作をさせたい場合は、RadioButton と `disabled` 状態の組み合わせ、またはステップを複数に分けたモードを検討する

### 状態 > デフォルト
- [must] 選択肢の中から 1 つデフォルト値に設定するものを決める

### デザインパターン > 選択肢のグルーピング
- [should] 複数の選択肢を持つ項目をいくつも並べて表示する場合は、ラベルがかかる範囲や設定項目ごとの選択肢を区別しやすくするため BaseColumn でグルーピングする

### モバイル
- [should] モバイルでは画面幅が狭いため基本的に縦並びにする
- [must] 誤操作を防ぐため、小さい要素間のマージンに従って十分なマージンを確保する
