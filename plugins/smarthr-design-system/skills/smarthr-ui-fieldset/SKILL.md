---
name: smarthr-ui-fieldset
description: "fieldset要素の代替として複数の入力要素をグルーピングするコンポーネントです。関連する入力欄を1つの見出しでまとめるときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer2+layer3
---

fieldset要素の代替として複数の入力要素をグルーピングするコンポーネントです。関連する入力欄を1つの見出しでまとめるときに使います。

`fieldset`要素の代替として複数の入力要素をグルーピングするコンポーネントです。関連する入力欄を1つの見出しでまとめるときに使います。

## import

```ts
import { Fieldset } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| disabled | boolean | - | - | `true` のとき、文字色を `TEXT_DISABLED` にする |
| subActionArea | ReactNode | - | - | タイトル右の領域 |
| innerMargin | Gap | - | - | タイトル群と子要素の間の間隔調整用（基本的には不要） |
| statusLabels | FunctionComponentElement<any> \| FunctionComponentElement<any>[] | - | - | タイトルの隣に表示する `StatusLabel` の配列 |
| helpMessage | ReactNode | - | - | タイトルの下に表示するヘルプメッセージ |
| exampleMessage | ReactNode | - | - | タイトルの下に表示する入力例 |
| errorMessages | ReactNode \| ReactNode[] | - | - | タイトルの下に表示するエラーメッセージ |
| autoBindErrorInput | boolean | - | - | エラーがある場合に自動的に入力要素を error にするかどうか |
| supplementaryMessage | ReactNode | - | - | フォームコントロールの下に表示する補足メッセージ |
| legend | ReactNode \| Omit<{ text: ReactNode; styleType?: TextProps; icon?: any; unrecommendedHide?: boolean; htmlFor?: string; id?: string; }, "htmlFor"> | - | ✓ | - |

## 実装ルール

### a11y-form-control-in-form
fieldset, Fieldset, FormControl を利用する場合、form要素で囲むことを促すルールです。 このルールは[smarthr/a11y-input-in-form-control](https://github.com/kufu/tamatebako/tree/master/packages/eslint-plugin-smarthr/rules/a11y-input-in-form-control) と組み合わせることでより厳密なチェックを行えます。

❌ NG:

```jsx
// FormControl、Fieldsetを内包するコンポーネントの場合、名称のsuffixが
// FormControl、Fieldset、もしくはFormControls, Fieldsetsのいずれかである必要があるためNG
const Sample1 = () => (
  <>
    <StyledFormControl name="field1" />
    <StyledFormControl name="field2" />
    <StyledFormControl name="field3" />
  </>
)
const Sample2 = (props) => (
  <Fieldset {...props}>
    <Any />
  </>
)
```

✅ OK:

```jsx
// FormControl、Fieldsetを内包するコンポーネントの場合、名称のsuffixが
// FormControl、Fieldset、もしくはFormControls, Fieldsetsのいずれかの場合OK
const SampleFormControls = () => (
  <>
    <StyledFormControl name="field1" />
    <StyledFormControl name="field2" />
    <StyledFormControl name="field3" />
  </>
)
const SampleFieldset = (props) => (
  <Fieldset {...props}>
    <Any />
  </>
)

// コンポーネント名を上記の様に調整することで
// これらのコンポーネントを利用する別コンポーネントでも正しくチェックが行えます
```

### a11y-input-in-form-control
入力要素をsmarthr-ui/FormControl、もしくはsmarthr-ui/Fieldsetで囲むことを促すルールです

❌ NG:

```jsx
// Fieldsetには role="group" がデフォルトで設定されているのでNG
<Fieldset  role="group" />
```

✅ OK:

```jsx
<Fieldset title="any heading">
  {radios.map((a) => (
    <RadioButton>{a.label}</RadioButton>
  ))}
</Fieldset>
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

```jsx
// childrenを持たないFieldset、FormControlは入力要素として扱うためOK
<Fieldset title="any heading">
  <HogeFieldset />
  <FugaFormControl />
</Fieldset>
```

### a11y-prohibit-sectioning-content-in-form
form, fieldset, smarthr-ui/Fieldset 以下でSectioningContent(section, aside, article, nav)が利用されている場合、smarthr-ui/Fieldset, fieldset要素に置き換えることを促すルールです。

❌ NG:

```jsx
// fieldset要素以下にAsideが存在するためNG
const AnyComponent = <Fieldset>
  <Aside>
    <Heading>ANY TITLE.</Heading>
  </Aside>
</Fieldset>
```

✅ OK:

```jsx
// form内でSectioningContentを利用していないのでOK
const AnyComponent = (
  <form>
    <Fieldset title="ANY TITLE.">
      Hoge.
      <Fieldset title="ANY TITLE.">
        Fuga.
        <FormControl  title="ANY TITLE.">
          Piyo.
        </FormControl>
      </Fieldset>
    </Fieldset>
  </form>
)
```

詳細は eslint-plugin-smarthr の各ルール README を参照してください。

## 使い方チェックリスト

### 使用上の注意 > 入力要素が2つ以上の場合にのみ使用する
- [must] Fieldset は 2 つ以上の入力要素を持つフォームをグループ化する場合に使用する
- [must] 入力要素が 1 つだけの場合は FormControl を使用する

### レイアウト
- [must] Fieldset には複数の入力要素のグループの目的を明確にするタイトルをつける
- [must] Fieldset に内包されるフォーム要素のタイトルは、グルーピングしている Fieldset のタイトルよりも低い見出しレベルにする

### レイアウト > エラーの表示方法
- [must] Fieldset のタイトル下にエラーメッセージを表示する場合は、該当の FormControl のタイトルを含める

### 状態 > 無効（disabled）
- [should] 無効状態にする場合は、そもそも無効ではなくフォーム自体を非表示にしたり、無効状態の理由を付近に表示することを検討する

### 状態 > 読み取り専用
- [should] 入力内容の確認時など、すでに入力済みの書き換えできない値として表示する際は、Input の `readOnly` を使用する
- [should] Fieldset 内の値を readOnly で表示する場合、分割されたフォームの値をそれぞれコピーする必要があり手間になる点に注意する
