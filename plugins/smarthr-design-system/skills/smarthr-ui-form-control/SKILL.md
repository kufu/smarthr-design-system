---
name: smarthr-ui-form-control
description: "単一の入力要素にラベル、ヘルプ/エラー/補足のメッセージテキスト、入力必須か否かを紐づけるためのコンポーネントです。1つの入力欄にラベル付けするとき、入力欄にエラーや補足メッセージを表示するときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer2+layer3
---

単一の入力要素にラベル、ヘルプ/エラー/補足のメッセージテキスト、入力必須か否かを紐づけるためのコンポーネントです。1つの入力欄にラベル付けするとき、入力欄にエラーや補足メッセージを表示するときに使います。

FaCircleExclamationIcon, StatusLabel, Cluster, Text } from 'smarthr-ui'

## import

```ts
import { FormControl } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| label | ReactNode \| { text: ReactNode; styleType?: TextProps; icon?: any; unrecommendedHide?: boolean; htmlFor?: string; id?: string; } | - | ✓ | グループのラベル名 |
| subActionArea | ReactNode | - | - | タイトル右の領域 |
| innerMargin | Gap | - | - | タイトル群と子要素の間の間隔調整用（基本的には不要） |
| statusLabels | FunctionComponentElement<any> \| FunctionComponentElement<any>[] | - | - | タイトルの隣に表示する `StatusLabel` の配列 |
| helpMessage | ReactNode | - | - | タイトルの下に表示するヘルプメッセージ |
| exampleMessage | ReactNode | - | - | タイトルの下に表示する入力例 |
| errorMessages | ReactNode \| ReactNode[] | - | - | タイトルの下に表示するエラーメッセージ |
| autoBindErrorInput | boolean | true | - | エラーがある場合に自動的に入力要素を error にするかどうか |
| supplementaryMessage | ReactNode | - | - | フォームコントロールの下に表示する補足メッセージ |

## 実装ルール

### a11y-form-control-in-form
fieldset, Fieldset, FormControl を利用する場合、form要素で囲むことを促すルールです。 このルールは[smarthr/a11y-input-in-form-control](https://github.com/kufu/tamatebako/tree/master/packages/eslint-plugin-smarthr/rules/a11y-input-in-form-control) と組み合わせることでより厳密なチェックを行えます。

❌ NG:

```jsx
// formで囲まれていないためNG
const Sample = () => (
  <>
    <FormControl />
    <HogeFieldset />
    <fieldset />
  </>
)
```

✅ OK:

```jsx
// form要素で囲まれているならOK
const Sample1 = () => (
  // form要素と推測されるコンポーネントならOK
  <StyledForm>
    <FormControl />
    <HogeFieldset />
    <fieldset />
  </StyledForm>
)
const Sample2 = () => (
  // as, forwardedAsでform要素にされているコンポーネントの場合もOK
  <Hoge as="form">
    <FormControl />
    <HogeFieldset />
    <fieldset />
  </Hoge>
)
```

### a11y-input-in-form-control
入力要素をsmarthr-ui/FormControl、もしくはsmarthr-ui/Fieldsetで囲むことを促すルールです

❌ NG:

```jsx
// RadioButton, Checkboxは内部にlabel要素を持つためFormControlで囲むことは不適切
// 見出しを設定したい場合、Fieldsetでグルーピングする
<FormControl title="any heading">
  <RadioButton>{a.label}</RadioButton>
</FormControl>
```

```jsx
// FormControlが複数の入力要素を持ってしまっているのでNG
<FormControl title="any heading">
  <Input />
  <Combobox />
</FormControl>
```

```jsx
// FormControlがネストしてしまっているのでNG
<FormControl>
  <SubFormControl>
    <Checkbox />
  </SubFormControl>
</FormControl>
```

✅ OK:

```jsx
<FormControl title="any heading">
  <Input />
</FormControl>
```

```jsx
<Fieldset title="date range">
  <FormControl label={{ text: "start", unrecommendedHide: true }}>
    <WarekiPicker />
  </FormControl>
  ~
  <FormControl label={{ text: "end", unrecommendedHide: true }}>
    <WarekiPicker />
  </FormControl>
</Fieldset>
```

詳細は eslint-plugin-smarthr の各ルール README を参照してください。

## 使い方チェックリスト

### 使用上の注意 > 入力要素が1つの場合にのみ使用する
- [must] FormControl は入力要素が 1 つだけの場合にのみ使用する
- [must] 値を分割して入力する場合や Checkbox / RadioButton など複数の入力要素を持つフォームに対してラベルやメッセージテキストを表示したい場合は Fieldset を使用する

### 使用上の注意 > 入力要素が1つの場合にのみ使用する > 複数のフォームを横に並べる場合
- [should] 入力要素をグルーピングできる場合は基本的に Fieldset を使用する
- [must] やむを得ず FormControl を横に並べる場合はエラー表示時にレイアウトが崩れないか注意する

### レイアウト > ステータスラベルの有無
- [should] フォーム入力が必須か任意かをユーザーが区別できるようにステータスラベルを使用する

### レイアウト > ステータスラベルの有無 > ステータスラベルの省略 > 必須を省略するケース
- [should] 認知負荷を減らすために必須ステータスラベルの省略を検討する
  - フォーム入力が極めて少なく、すべて必須であることが自明な場合
  - 任意のフォームよりも入力必須のフォームが多い場合

### レイアウト > ステータスラベルの有無 > ステータスラベルの省略 > ステータスラベル自体を省略するケース
- [should] フォームの説明文などですべての項目が必須または任意であることが明記されている場合は、ステータスラベル自体の省略を検討する

### レイアウト > メッセージテキストの有無
- [must] 入力要素の `placeholder` の代替として、入力例は `exampleMessage` を使用する

### レイアウト > メッセージテキストの有無 > エラーメッセージ
- [must] エラーメッセージは入力必須の入力要素の値が空、またはデータ型が異なるなど適切な値が入力されていない場合に表示する
- [must] どの入力要素がエラーかを視覚的に見つけやすくするため、入力要素にも `error` 状態を付加する
- [must] 同一画面上でエラーをリアルタイムに判定できる場合は、エラーの原因が解消されたらメッセージの表示を止める

### 状態 > 無効（disabled）
- [must] フォームの操作ができない状態を表現する際は、Input など内包する要素の `disabled` を使用する
  - そもそも無効ではなくフォーム自体を非表示にしたり、無効状態の理由を付近に表示することを検討する

### 状態 > 読み取り専用
- [must] 入力内容の確認時など、すでに入力済みの書き換えできない値として表示する際は、Input など内包する要素の `readOnly` を使用する
