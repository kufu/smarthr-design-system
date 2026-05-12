---
name: component-selector
description: "smarthr-ui のどのコンポーネントを使うべきかの選定ガイド。フォームを作る、テーブルを表示する、ボタンを置く、ダイアログを開く、通知を出すなど、何らかの UI を実装しようとしているときに使う。具体的なコンポーネントの SKILL.md を呼ぶ前にまず読む。 主なシナリオ: ActionDialog（ユーザーに操作や入力を求めるダイアログを表示するとき、確認・実行ダイアログを作るとき）、Button（ボタンを置くとき、クリックで操作を実行させるとき、リンクをボタン風に表示するとき）、DefinitionList（ラベルと値のペアを並べてデータを表示するとき、詳細情報を一覧するとき）、Dialog（ダイアログを独自制御で実装するとき）、FormControl（フォーム要素にラベルやエラーメッセージを付けるとき、入力欄をアクセシブルにするとき）、FormDialog（フォームをダイアログ内に表示するとき）、Input（テキスト・数値を1行で入力させるとき、フォームに入力欄を追加するとき）、InputFile（ファイルをアップロードさせるとき）、MessageDialog（メッセージや情報をダイアログで通知するとき）、ModelessDialog（ページの操作を妨げないモードレスダイアログを使うとき）、RadioButton（複数の選択肢から1つだけ選ばせるとき）、StepFormDialog（複数ステップのフォームをダイアログ内に表示するとき）、Table（表形式でデータを一覧表示するとき、行・列を持つデータを見せるとき）、TextLink（テキストにリンクを付けるとき、アンカー要素をデザインシステム準拠で使うとき）。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

# smarthr-ui コンポーネント選定ガイド

このスキルは、UI 要件から該当するコンポーネントを特定するためのインデックスです。コンポーネントの詳細な使い方は、各コンポーネント名のスキル（例: `smarthr-design-system:button`）を参照してください。

## コンポーネント一覧

| コンポーネント | 用途 | 対応スキル |
|---|---|---|
| AccordionPanel | 表示したい要素を展開して表示したり、折りたたんで隠したりするためのコンポーネントです。 | `smarthr-design-system:accordion-panel` |
| ActionDialog | ユーザーに操作や入力を求めるダイアログを表示するとき、確認・実行ダイアログを作るとき | `smarthr-design-system:action-dialog` |
| AppHeader | ページ上部に配置されるヘッダーです。横断的な機能やナビゲーションを提供します。各プロダクトでの表示を共通化するために、HeaderとAppNaviを結合し表示要素を固定化したコンポーネントです。 | `smarthr-design-system:app-header` |
| AppLauncher | AppLauncher コンポーネント | `smarthr-design-system:app-launcher` |
| AppNavi | プロダクト内の主要な機能を切り替えるためのコンポーネントです。機能の切り替えだけでなく、プロダクト全体に影響を及ぼす頻繁に行なう操作を埋め込めます。 | `smarthr-design-system:app-navi` |
| Badge | 件数などの数値を視覚的に表すためのコンポーネントです。 | `smarthr-design-system:badge` |
| Balloon | Balloon コンポーネント | `smarthr-design-system:balloon` |
| Base | 矩形で視覚的に要素をグルーピングするコンポーネントです。 | `smarthr-design-system:base` |
| BaseColumn | 矩形で視覚的に要素をグルーピングするコンポーネントです。 | `smarthr-design-system:base-column` |
| BottomFixedArea | FloatAreaと役割が重複しているためBottomFixedAreaは非推奨です。より柔軟に使えるFloatAreaを使ってください。 | `smarthr-design-system:bottom-fixed-area` |
| Browser | 階層構造を持つデータを選択するためのコンポーネントです。 | `smarthr-design-system:browser` |
| Button | ボタンを置くとき、クリックで操作を実行させるとき、リンクをボタン風に表示するとき | `smarthr-design-system:button` |
| Calendar | カレンダーを表示し日付を選択するためのコンポーネントです。基本的にはDatePickerと合わせて使用されるため、単独で使用することはありません。 | `smarthr-design-system:calendar` |
| Center | Every LayoutのCenterを参考にしたコンポーネントです。要素を天地左右中央に配置したいときに使います。 | `smarthr-design-system:center` |
| Checkbox | Checkbox コンポーネント | `smarthr-design-system:checkbox` |
| Chip | テキストを装飾をするためのコンポーネントです。 | `smarthr-design-system:chip` |
| Cluster | Every LayoutのClusterを参考にしたコンポーネントです。要素を横に均等に並べたいときに使います。幅に収まり切らなくなると要素を折返して並べます。 | `smarthr-design-system:cluster` |
| Container | 主要なコンテンツ幅を管理するためのコンポーネントです。 | `smarthr-design-system:container` |
| ControlledActionDialog | ControlledActionDialog コンポーネント | `smarthr-design-system:controlled-action-dialog` |
| ControlledFormDialog | ControlledFormDialog コンポーネント | `smarthr-design-system:controlled-form-dialog` |
| ControlledMessageDialog | ControlledMessageDialog コンポーネント | `smarthr-design-system:controlled-message-dialog` |
| ControlledStepFormDialog | ControlledStepFormDialog コンポーネント | `smarthr-design-system:controlled-step-form-dialog` |
| CurrencyInput | CurrencyInput コンポーネント | `smarthr-design-system:currency-input` |
| DatePicker | ユーザーに日付を指定させる際に使用するコンポーネントです。フォーカスするとCalendarが開き、視覚的に日付を選択できます。 | `smarthr-design-system:date-picker` |
| DefinitionList | ラベルと値のペアを並べてデータを表示するとき、詳細情報を一覧するとき | `smarthr-design-system:definition-list` |
| desktop | desktop コンポーネント | `smarthr-design-system:desktop` |
| Dialog | ダイアログを独自制御で実装するとき | `smarthr-design-system:dialog` |
| Disclosure | コンテンツの表示・非表示を切り替えるUIを作るためのアクセシブルなコンポーネントです。 | `smarthr-design-system:disclosure` |
| Dropdown | ボタンを押すとパネルが開く機能の抽象コンポーネントです。パネルを開くための引き金となるDropdownTriggerとパネル自体を指すDropdownContentから構成されます。 | `smarthr-design-system:dropdown` |
| DropdownMenuButton | 複数の操作をまとめて提供するためのコンポーネントで、パネル内には操作がリスト形式で表示されます。 | `smarthr-design-system:dropdown-menu-button` |
| DropZone | ファイルを選択するためのコンポーネントです。ドラッグアンドドロップによるファイル選択をするためにドロップ領域を広く持っています。 | `smarthr-design-system:drop-zone` |
| ErrorScreen | エラーを全画面で表示をするためのコンポーネントです。 | `smarthr-design-system:error-screen` |
| Fieldset | フォームにおける複数の入力要素をグルーピングするためのコンポーネントです。 | `smarthr-design-system:fieldset` |
| FileViewer | 画像やPDFファイルを表示・拡大縮小・回転できるファイルビューアーです。 | `smarthr-design-system:file-viewer` |
| FilterDropdown | 一覧の絞り込みを行なうためのコンポーネントで、パネル内に自由に入力要素を配置できるほか、絞り込みを適用したり解除したりするための機能も有しています。 | `smarthr-design-system:filter-dropdown` |
| FloatArea | スクロール時に固定表示する領域のためのコンポーネントです。特定のアクションボタンやテキストを、スクロール位置にかかわらず画面内の特定の位置に表示できます。 | `smarthr-design-system:float-area` |
| FormControl | フォーム要素にラベルやエラーメッセージを付けるとき、入力欄をアクセシブルにするとき | `smarthr-design-system:form-control` |
| FormDialog | フォームをダイアログ内に表示するとき | `smarthr-design-system:form-dialog` |
| Header | アカウントやシステムの設定、およびSmartHR内の他のアプリケーションへの横断的なアクセスを提供するコンポーネントです。ページの最上部に配置されます。 | `smarthr-design-system:header` |
| Heading | 直後に続くコンテンツの見出しに使うコンポーネントです。 | `smarthr-design-system:heading` |
| HelpLink | ヘルプページを開くためのテキストリンクです。 | `smarthr-design-system:help-link` |
| InformationPanel | ユーザーに伝えたい情報を他の要素より視覚的に目立たせるためのコンポーネントです。 | `smarthr-design-system:information-panel` |
| Input | テキスト・数値を1行で入力させるとき、フォームに入力欄を追加するとき | `smarthr-design-system:input` |
| InputFile | ファイルをアップロードさせるとき | `smarthr-design-system:input-file` |
| LanguageSwitcher | LanguageSwitcher コンポーネント | `smarthr-design-system:language-switcher` |
| LineClamp | 内包するテキストが指定した幅や高さを越えて存在するときに、Tooltipを用いて全文を表示するためのコンポーネントです。 | `smarthr-design-system:line-clamp` |
| Loader | 読み込み中や操作中など何らかの操作が仕掛り中であることを伝えるためのコンポーネントです。 | `smarthr-design-system:loader` |
| MessageDialog | メッセージや情報をダイアログで通知するとき | `smarthr-design-system:message-dialog` |
| mobile | mobile コンポーネント | `smarthr-design-system:mobile` |
| ModelessDialog | ページの操作を妨げないモードレスダイアログを使うとき | `smarthr-design-system:modeless-dialog` |
| MultiCombobox | MultiCombobox コンポーネント | `smarthr-design-system:multi-combobox` |
| NotificationBar | 操作の結果などをシステムからの通知として表示するためのコンポーネントです。 | `smarthr-design-system:notification-bar` |
| PageCounter | 主に「よくあるテーブル」などコレクションの全件数と選択されている現在のページの件数を表示するためのコンポーネントです。 | `smarthr-design-system:page-counter` |
| PageHeading | PageHeading コンポーネント | `smarthr-design-system:page-heading` |
| Pagination | 主に「よくあるテーブル」などコレクションにおけるページを切り替えるためのコンポーネントです。 | `smarthr-design-system:pagination` |
| Picker | Picker コンポーネント | `smarthr-design-system:picker` |
| RadioButton | 複数の選択肢から1つだけ選ばせるとき | `smarthr-design-system:radio-button` |
| RadioButtonPanel | パネル型の選択肢の中から単一の値を選択して入力できるコンポーネントです。 | `smarthr-design-system:radio-button-panel` |
| Reel | Every LayoutのReelを参考にしたコンポーネントです。要素を横に均等に並べたいときに使います。幅に収まり切らなくなると水平方向のスクロールが生じます。 | `smarthr-design-system:reel` |
| RemoteDialogTrigger | RemoteDialogTrigger コンポーネント | `smarthr-design-system:remote-dialog-trigger` |
| RequiredLabel | FormControlやFieldsetで入力必須を表すときに利用するコンポーネントです。 | `smarthr-design-system:required-label` |
| ResponseMessage | 操作に対する結果を表すためのコンポーネントです。 | `smarthr-design-system:response-message` |
| Scroller | Scroller コンポーネント | `smarthr-design-system:scroller` |
| SearchInput | SearchInput コンポーネント | `smarthr-design-system:search-input` |
| SectioningContent | header要素やfooter要素、見出しの範囲を定義するためのコンポーネントです。Headingと組み合わせて使うと、見出しレベルを自動計算します。 | `smarthr-design-system:sectioning-content` |
| SegmentedControl | 特定のオブジェクトの異なる状態を切り替えて表示するためのコンポーネントです。 | `smarthr-design-system:segmented-control` |
| Select | select要素の代わりに使用するコンポーネントです。 | `smarthr-design-system:select` |
| Sidebar | Every LayoutのSidebarを参考にしたコンポーネントです。メインコンテンツとサイドコンテンツの2つのコンテンツを配置したいときに使います。 | `smarthr-design-system:sidebar` |
| SideMenu | 複数のページを切り替えるためのコンポーネントです。主にページレイアウト「サイドナビゲーションとコンテンツの2カラム」で使います。 | `smarthr-design-system:side-menu` |
| SideNav | ビューを適切な単位で分割して縦方向に並べ、切り替えるためのコンポーネントです。 | `smarthr-design-system:side-nav` |
| SingleCombobox | SingleCombobox コンポーネント | `smarthr-design-system:single-combobox` |
| SmartHRAILogo | SmartHRAILogo コンポーネント | `smarthr-design-system:smart-hrai-logo` |
| SmartHRLogo | SmartHRLogo コンポーネント | `smarthr-design-system:smart-hr-logo` |
| SortDropdown | 主に表の並べ替え操作を統一するためのコンポーネントです。並べ替え項目と並び順を指定でき、ボタンラベルとアイコンで現在の並び順を表します。 | `smarthr-design-system:sort-dropdown` |
| SpreadsheetTable | 表データを表計算ソフトのように表示します。CSVのインポートなど、利用者にCSVファイルを想像させたい場面で有効です。 | `smarthr-design-system:spreadsheet-table` |
| Stack | Every LayoutのStackを参考にしたコンポーネントです。要素を縦に均等に並べたいときに使います。 | `smarthr-design-system:stack` |
| StatusLabel | オブジェクトの状態を伝えるためのこのコンポーネントです。 | `smarthr-design-system:status-label` |
| StepFormDialog | 複数ステップのフォームをダイアログ内に表示するとき | `smarthr-design-system:step-form-dialog` |
| Stepper | 連続する操作を、操作のステップごとにグルーピングするコンポーネントです。 | `smarthr-design-system:stepper` |
| Switch | オン・オフを切り替えるコンポーネントです。状態の切り替えは即時で反映されます。 | `smarthr-design-system:switch` |
| TabBar | ユーザーの関心が近いものを並列化し、ビューを切り替えるためのコンポーネントです。 | `smarthr-design-system:tab-bar` |
| Table | 表形式でデータを一覧表示するとき、行・列を持つデータを見せるとき | `smarthr-design-system:table` |
| Text | テキストを表示するためのコンポーネントです。タイポグラフィのデザイントークンを使用しています。 | `smarthr-design-system:text` |
| Textarea | テキストなどの情報を複数行入力するためのコンポーネントです。`textarea`の代わりとして使用します。入力文字数を数える機能や入力によって自動で領域が広がる機能を備えています。 | `smarthr-design-system:textarea` |
| TextLink | テキストにリンクを付けるとき、アンカー要素をデザインシステム準拠で使うとき | `smarthr-design-system:text-link` |
| Timeline | 情報を時間の流れに沿って、見やすく整理・表示するコンポーネントです。 | `smarthr-design-system:timeline` |
| Tooltip | UI上のスペースが限られている場合に、補足テキストを一時的に表示するために使うコンポーネントです。 | `smarthr-design-system:tooltip` |
| UpwardLink | 一階層上のコンテンツに戻るためのテキストリンクです。 | `smarthr-design-system:upward-link` |
| VisuallyHiddenText | スクリーンリーダーによる音声読み上げを可能にしながら、テキストを視覚的に隠したい場合に使用するコンポーネントです。 | `smarthr-design-system:visually-hidden-text` |
| WarekiPicker | 和暦の日付を西暦に変換する機能と和暦をプレビューする機能をもった入力要素です。 | `smarthr-design-system:wareki-picker` |

## 利用フロー

1. 実装したい UI 要件を整理する（例: 「フォームを作る」「テーブルを表示する」）
2. 上記の表から該当しそうなコンポーネントを特定する
3. そのコンポーネントの SKILL.md を読み、Props・実装ルール・使い方チェックリストに従って実装する
