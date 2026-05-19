---
name: component-selector
description: "smarthr-ui のどのコンポーネントを使うべきかの選定ガイド。フォームを作る、テーブルを表示する、ボタンを置く、ダイアログを開く、通知を出すなど、何らかの UI を実装しようとしているときに使う。具体的なコンポーネントの SKILL.md を呼ぶ前にまず読む。 主なシナリオ: Button（ボタンを置くとき、クリックで操作を実行させるとき、リンクをボタン風に表示するとき）、Input（テキスト・数値を1行で入力させるとき、フォームに入力欄を追加するとき）、Table（表形式でデータを一覧表示するとき、行・列を持つデータを見せるとき）、ActionDialog（ユーザーに操作や入力を求めるダイアログを表示するとき、確認・実行ダイアログを作るとき）、TextLink（テキストにリンクを付けるとき、アンカー要素をデザインシステム準拠で使うとき）。"
paths:
  - "**/*.tsx"
  - "**/*.jsx"
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
| AccordionPanel | 縦に積まれた見出しのリストで、関連する詳細の表示・非表示を切り替えられるコンポーネントです。情報量が多い場合に表示内容を絞るときに使います。 | `smarthr-design-system:accordion-panel` |
| ActionDialog | ユーザーに確認や単純な操作を求めるためのダイアログコンポーネントです。フォーム要素を含まない確認・実行のダイアログを表示するときに使います。 | `smarthr-design-system:action-dialog` |
| AppHeader | 画面上部に配置するSmartHR共通ヘッダーコンポーネントです。HeaderとAppNaviを結合し、各アプリケーションの表示を共通化します。 | `smarthr-design-system:app-header` |
| ⚠️ AppLauncher（非推奨） | 【非推奨】Header内に配置されるSmartHRの複数のアプリケーション間を遷移するためのランチャーコンポーネントです。 | `smarthr-design-system:app-launcher` |
| AppNavi | アプリケーション内の主要機能を切り替えるグローバルナビゲーションコンポーネントです。機能間を行き来するとき、機能切替以外でアプリ全体に関わる頻繁な操作を常設するときに使います。 | `smarthr-design-system:app-navi` |
| AuthErrorScreen | 認証フローで問題が発生したことを表示する全画面コンポーネントです。SSOやOAuthなどログイン処理に失敗したときに使います。 | `smarthr-design-system:auth-error-screen` |
| Badge | 件数などの数値を視覚的に表すためのコンポーネントです。Iconなどの視覚情報が少ない要素に変化が発生していることを通知バッジとして知らせるときにも使います。 | `smarthr-design-system:badge` |
| Balloon | 吹き出し風の補足説明を表示するとき | `smarthr-design-system:balloon` |
| Base | 矩形で視覚的に要素をグルーピングするコンポーネントです。ページ背景上でコンテンツを囲んで「セクション」領域として示すときに使います。 | `smarthr-design-system:base` |
| BaseColumn | BaseやDialogの内部で視覚的に要素をグルーピングするコンポーネントです。Base内やダイアログコンテンツ内でコンテンツを囲んで「ブロック」領域として示すときに使います。 | `smarthr-design-system:base-column` |
| ⚠️ BottomFixedArea（非推奨） | 【非推奨】画面下部に固定表示する領域のためのコンポーネントです。 | `smarthr-design-system:bottom-fixed-area` |
| Browser | 階層構造を持つデータを選択するためのコンポーネントです。カテゴリや組織、フォルダなどのツリー状のデータをドリルダウンで選択するときに使います。 | `smarthr-design-system:browser` |
| BulkActionRow | テーブル内に一括操作UIを配置する行コンポーネントです。「テーブル内の一括操作」パターンにおいて、複数行を選択した状態でまとめて操作するときに使います。 | `smarthr-design-system:bulk-action-row` |
| Button | button要素の代替として操作や処理を実行するコンポーネントです。ユーザーに操作を促すとき、フォームを送信するとき、アクションを選択するときに使います。 | `smarthr-design-system:button` |
| Calendar | カレンダーを表示し日付を選択するためのコンポーネントです。基本的にDatePickerやWarekiPickerの内部部品として使われるため、単独では使用しません。 | `smarthr-design-system:calendar` |
| Center | 要素を上下左右中央に配置するためのレイアウトコンポーネントです。コンテンツを画面中央に置くとき、ボックス内に中央寄せをするときに使います。 | `smarthr-design-system:center` |
| Checkbox | input[type='checkbox']要素の代替としてオン/オフや真偽の状態を入力させるコンポーネントです。5個以下の選択肢から複数の値を選択させるとき、即時反映ではなく送信ボタンで確定させるときに使います。 | `smarthr-design-system:checkbox` |
| Chip | テキストをタグのように装飾して表示するためのコンポーネントです。 | `smarthr-design-system:chip` |
| Cluster | 要素を水平方向に並べるためのレイアウトコンポーネントです。幅に収まり切らない場合は折り返します。ボタンやテキストなどあらゆる要素を横並びで配置するときに使います。 | `smarthr-design-system:cluster` |
| Container | ページの主要コンテンツの横幅と外側のパディングを制御するレイアウトコンポーネントです。すべてのページで本文領域の最大幅と上下左右の余白を設定するときに使います。 | `smarthr-design-system:container` |
| ControlledActionDialog | ActionDialogの開閉状態を外部stateで制御する派生コンポーネントです。開閉状態をアプリケーション側で管理するときに使います。 | `smarthr-design-system:controlled-action-dialog` |
| ControlledFormDialog | FormDialogの開閉状態を外部stateで制御する派生コンポーネントです。開閉状態をアプリケーション側で管理するときに使います。 | `smarthr-design-system:controlled-form-dialog` |
| ControlledMessageDialog | MessageDialogの開閉状態を外部stateで制御する派生コンポーネントです。開閉状態をアプリケーション側で管理するときに使います。 | `smarthr-design-system:controlled-message-dialog` |
| ControlledStepFormDialog | StepFormDialogの開閉状態を外部stateで制御する派生コンポーネントです。開閉状態をアプリケーション側で管理するときに使います。 | `smarthr-design-system:controlled-step-form-dialog` |
| CurrencyInput | 金額を入力させるためのコンポーネントです。給与・税額など金額値を入力させるときに使います。 | `smarthr-design-system:currency-input` |
| ⚠️ DatePicker（非推奨） | 【非推奨】ユーザーに日付を指定させる際に使用するコンポーネントです。フォーカスするとCalendarが開き、視覚的に日付を選択できます。 | `smarthr-design-system:date-picker` |
| ⚠️ DatetimeLocalPicker（非推奨） | 【非推奨】ユーザーに日付と時刻を指定させる際に使用するコンポーネントです。 | `smarthr-design-system:datetime-local-picker` |
| DefinitionList | 見出しと説明をペアで並べる定義リストコンポーネントです。フォーム入力内容の確認画面や編集不要のデータ表示など、ラベルと値のペアを参照用に並べるときに使います。 | `smarthr-design-system:definition-list` |
| Dialog | ページ前面に表示されるダイアログ領域のプリミティブコンポーネントです。ActionDialog/MessageDialog/ModelessDialog/FormDialog/StepFormDialogで実現できない独自のダイアログを提供するときに使います。 | `smarthr-design-system:dialog` |
| Disclosure | トリガーやコンテンツに装飾を持たない、コンテンツの表示・非表示を切り替えるためのプリミティブコンポーネントです。開閉動作だけを提供するとき、AccordionPanelで実現できない独自の開閉UIを提供するときに使います。 | `smarthr-design-system:disclosure` |
| Dropdown | ボタンを押すとパネルが開く動作を提供するプリミティブコンポーネントです。DropdownMenuButton/FilterDropdown/SortDropdownで実現できない独自のドロップダウンUIを提供するときに使います。 | `smarthr-design-system:dropdown` |
| DropdownMenuButton | 同じ対象に関連する複数の操作をまとめてドロップダウン表示するメニューボタンコンポーネントです。編集・複製・削除など、オブジェクトに対する複数アクションをまとめるときに使います。 | `smarthr-design-system:dropdown-menu-button` |
| DropZone | ドラッグアンドドロップでのファイル選択を主目的としたコンポーネントです。広いドロップ領域でファイルをアップロードさせるときに使います。 | `smarthr-design-system:drop-zone` |
| EmptyTableBody | テーブルにデータがない場合に空状態を表示するtbodyコンポーネントです。空状態のメッセージを提示するときに使います。 | `smarthr-design-system:empty-table-body` |
| ErrorScreen | エラーを全画面で表示するためのプリミティブコンポーネントです。Auth/Forbidden/NotFound/Unauthorized/Unexpectedの各ErrorScreenで実現できない独自のエラー画面を提供するときに使います。 | `smarthr-design-system:error-screen` |
| Fieldset | fieldset要素の代替として複数の入力要素をグルーピングするコンポーネントです。関連する入力欄を1つの見出しでまとめるときに使います。 | `smarthr-design-system:fieldset` |
| FileViewer | 画像やPDFファイルを表示・拡大縮小・回転できるファイルビューアーコンポーネントです。ファイルの内容をプレビューするときに使います。 | `smarthr-design-system:file-viewer` |
| FilterDropdown | 「よくあるテーブル」などで絞り込み条件を入力するためのドロップダウンコンポーネントです。Checkbox/RadioButton/日付などの入力要素をドロップダウンパネル内に配置し、絞り込みの適用・解除を提供するときに使います。 | `smarthr-design-system:filter-dropdown` |
| FloatArea | 画面内に固定表示する領域のためのコンポーネントです。スクロール位置によらずフォーム送信ボタンや主要アクションを常時見せるときに使います。 | `smarthr-design-system:float-area` |
| ForbiddenErrorScreen | アクセス権限がないことを表示する全画面コンポーネントです。403相当の権限エラーを伝えるときに使います。 | `smarthr-design-system:forbidden-error-screen` |
| FormControl | 単一の入力要素にラベル、ヘルプ/エラー/補足のメッセージテキスト、入力必須か否かを紐づけるためのコンポーネントです。1つの入力欄にラベル付けするとき、入力欄にエラーや補足メッセージを表示するときに使います。 | `smarthr-design-system:form-control` |
| FormDialog | フォーム要素を内包し、ユーザーに入力や選択などの操作を求めるためのActionDialog派生のダイアログコンポーネントです。ダイアログ内で入力フォームを送信するとき、Enterキーでの送信が必要なときに使います。 | `smarthr-design-system:form-dialog` |
| Header | アカウント設定やアプリ切替などSmartHR共通の横断機能を提供するヘッダーコンポーネントです。基本はAppHeaderの利用を推奨し、独自のヘッダー構成が必要なときのみHeader単体で使います。 | `smarthr-design-system:header` |
| Heading | 見出し要素の代替として直後のコンテンツの見出しを示すコンポーネントです。「セクション」や「ブロック」に見出しをつけるときに使います。 | `smarthr-design-system:heading` |
| HelpLink | ヘルプページを開くためのテキストリンクコンポーネントです。SmartHRのヘルプセンターへ誘導するリンクを置くときに使います。 | `smarthr-design-system:help-link` |
| InformationPanel | ユーザーに伝えたい情報を視覚的に目立たせるパネルコンポーネントです。複数行のテキストや複数項目の不備一覧など、ResponseMessageやNotificationBarでは収まらない量のフィードバック情報などを表示するときに使います。 | `smarthr-design-system:information-panel` |
| Input | input[type='text']やinput[type='number']などの代替としてテキストや数値を1行で入力させるコンポーネントです。テキスト・数値を1行で入力させるとき、フォームに入力欄を追加するときに使います。 | `smarthr-design-system:input` |
| InputFile | input[type='file']要素の代替としてファイルを選択させるコンポーネントです。ファイルをアップロードさせるときに使います。 | `smarthr-design-system:input-file` |
| LanguageSwitcher | 表示言語を切り替えるためのコンポーネントです。多言語対応したアプリケーションで利用者に言語選択UIを提供するときに使います。 | `smarthr-design-system:language-switcher` |
| LineClamp | テキストが指定幅・高さを超えるときに省略表示しTooltipで全文を見せるためのコンポーネントです。長い文字列を行数制限で省略させるときに使います。 | `smarthr-design-system:line-clamp` |
| Loader | 読み込み中や処理中であることを伝えるためのコンポーネントです。 | `smarthr-design-system:loader` |
| MessageDialog | ユーザーに情報を提示するためのダイアログコンポーネントです。入力などの操作を伴わずにメッセージや情報をダイアログで提示するときに使います。 | `smarthr-design-system:message-dialog` |
| ModelessDialog | 背面の画面操作を妨げないモードレスダイアログコンポーネントです。ダイアログと背面の画面を同時並行で閲覧・操作するときに使います。 | `smarthr-design-system:modeless-dialog` |
| ⚠️ MonthPicker（非推奨） | 【非推奨】ユーザーに年と月を入力させる際に使用するコンポーネントです。 | `smarthr-design-system:month-picker` |
| MultiCombobox | 選択肢から複数の値を選択しつつテキスト入力での絞り込みや値追加もできる選択コンポーネントです。6個以上の選択肢から検索しながら複数を選択するときに使います。 | `smarthr-design-system:multi-combobox` |
| NotFoundErrorScreen | 存在しないページであることを表示する全画面コンポーネントです。404相当のエラーを伝えるときに使います。 | `smarthr-design-system:not-found-error-screen` |
| NotificationBar | システムからの通知を表示するためのコンポーネントです。操作結果のフィードバックを表示するとき、ページ全体や特定領域に重要な状態を伝えるときに使います。 | `smarthr-design-system:notification-bar` |
| PageCounter | 「よくあるテーブル」などの一覧の総件数と現在ページの件数を表示するためのコンポーネントです。Paginationと併用し件数を提示するときに使います。 | `smarthr-design-system:page-counter` |
| PageHeading | 画面全体の最上位見出しを表示するためのコンポーネントです。h1要素として画面タイトルを示すときに使います。 | `smarthr-design-system:page-heading` |
| Pagination | 「よくあるテーブル」などの一覧のページを切り替えるためのコンポーネントです。大量データを分割表示し、ページ単位で前後移動させるときに使います。 | `smarthr-design-system:pagination` |
| RadioButton | input[type='radio']要素の代替として選択肢から1つだけ選ばせる選択コンポーネントです。5個以下の選択肢をラベル短く一覧で見せるときに使います。 | `smarthr-design-system:radio-button` |
| RadioButtonPanel | RadioButtonをパネル型に視覚的強化した単一選択コンポーネントです。選択肢に説明やステータスを付加するとき、視覚的に強調して操作領域を確保するときに使います。 | `smarthr-design-system:radio-button-panel` |
| Reel | 要素を水平方向に並べ、はみ出した場合は水平方向にスクロールさせるレイアウトコンポーネントです。複数の要素を水平方向にスクロールさせて見せるときに使います。 | `smarthr-design-system:reel` |
| RemoteDialogTrigger | 別コンポーネント階層から離れた位置のダイアログを開くためのトリガーコンポーネントです。ボタン配置とダイアログ定義を分離して管理するときに使います。 | `smarthr-design-system:remote-dialog-trigger` |
| RequiredLabel | FormControlやFieldsetで入力必須を表すためのラベルコンポーネントです。フォーム項目に必須アイコンをつけるときに使います。 | `smarthr-design-system:required-label` |
| ResponseMessage | システムからの通知を表示するためのアイコン付きテキストコンポーネントです。要素の状態や操作結果のフィードバックを要素の近くに表示するときに使います。 | `smarthr-design-system:response-message` |
| Scroller | コンテンツをスクロール可能な領域に収めるためのコンポーネントです。広いテーブルや要素群を限られた領域に収めて任意方向にスクロール表示するときに使います。 | `smarthr-design-system:scroller` |
| SearchInput | 検索キーワードを入力させるためのコンポーネントです。検索フォームで検索語句を入力させるときに使います。 | `smarthr-design-system:search-input` |
| SectioningContent | header、footer、section、articleなどのセクショニング要素を表現するためのコンポーネントです。Headingと組み合わせて見出しレベルを自動計算するときに使います。 | `smarthr-design-system:sectioning-content` |
| SegmentedControl | 同一オブジェクトの異なる状態や視点を切り替えるためのコンポーネントです。リスト表示とカード表示の切替など、選択と同時に即座に表示を変えるときに使います。 | `smarthr-design-system:segmented-control` |
| Select | select要素の代替として選択肢から1つの値を選ばせるドロップダウンコンポーネントです。6個以上の選択肢を検索不要で効率よくレイアウトするときに使います。 | `smarthr-design-system:select` |
| Sidebar | メインコンテンツとサイドコンテンツの2カラムを配置するためのレイアウトコンポーネントです。「コレクションとシングルの2カラム」ページレイアウトなど、メインとサブの関係がある要素を左右に並べるときに使います。 | `smarthr-design-system:sidebar` |
| SideMenu | 複数のページを切り替えるためのサイドナビゲーションコンポーネントです。「サイドナビゲーションとコンテンツの2カラム」ページレイアウトで、AppNaviの下層に多数のページ項目を配置するときに使います。 | `smarthr-design-system:side-menu` |
| SideNav | 同一画面内のビューを縦方向に並べて切り替えるためのナビゲーションコンポーネントです。「コレクションとシングルの2カラム」ページレイアウトのコレクション領域で一覧から選んだオブジェクトの詳細を切り替えるとき、設定画面などで1つの画面内に並ぶビューを切り替えるときに使います。 | `smarthr-design-system:side-nav` |
| SingleCombobox | 選択肢から1つの値を選択しつつテキスト入力での絞り込みや値追加もできる選択コンポーネントです。6個以上の選択肢から検索しながら1つを選択するときに使います。 | `smarthr-design-system:single-combobox` |
| SmartHRAILogo | SmartHRのAI関連の機能ラベルを表示するためのコンポーネントです。 | `smarthr-design-system:smarthr-ai-logo` |
| SmartHRLogo | SmartHRのロゴを表示するためのコンポーネントです。 | `smarthr-design-system:smarthr-logo` |
| SortDropdown | コレクションの並べ替えを提供するためのドロップダウンコンポーネントです。主にテーブル以外のリストやカード一覧の並べ替え項目と並び順を設定するときに使います。 | `smarthr-design-system:sort-dropdown` |
| SpreadsheetTable | 表データを表計算ソフト風に表示するためのコンポーネントです。CSVインポート画面などで利用者にスプレッドシートを想像させるときに使います。 | `smarthr-design-system:spreadsheet-table` |
| Stack | 要素を垂直方向に並べるためのレイアウトコンポーネントです。ページの「セクション」や「ブロック」、段落、フォーム項目などあらゆる要素を垂直に積み重ねて配置するときに使います。 | `smarthr-design-system:stack` |
| StatusLabel | オブジェクトの状態を短いラベルで伝えるためのコンポーネントです。Table内のステータス欄や、オブジェクト詳細の画面タイトルで状態を提示するときに使います。 | `smarthr-design-system:status-label` |
| StepFormDialog | 複数ステップに分けたフォームを内包するダイアログコンポーネントです。ウィザード形式で複数の操作を順に進めるタスクをダイアログで提供するときに使います。 | `smarthr-design-system:step-form-dialog` |
| Stepper | 複数ステップに分かれた操作の進行状況を示すコンポーネントです。手続きの現在位置や全体ステップ数を可視化するときに使います。 | `smarthr-design-system:stepper` |
| Switch | オン/オフを即時に切り替えるスイッチコンポーネントです。機能の有効/無効や表示切替をユーザー操作で即座にシステムに反映させるときに使います。 | `smarthr-design-system:switch` |
| TabBar | 異なるオブジェクトやビューを横方向のタブで切り替えるためのコンポーネントです。同一画面内で並列関係にあるビューを切り替えるとき、影響範囲を下線で明確にしながらタブを並べるときに使います。 | `smarthr-design-system:tab-bar` |
| Table | table要素の代替として表形式でデータを表示するためのコンポーネントです。データを行列で一覧表示するとき、レコードを並べて比較するビューを提示するときに使います。 | `smarthr-design-system:table` |
| Td | td要素の代替としてテーブルのデータセルを表すコンポーネントです。 | `smarthr-design-system:td` |
| TdCheckbox | Checkboxを内包するデータセル（Td）の派生コンポーネントです。「テーブル内の一括操作」パターンにおいて、テーブル各行を選択するときに使います。 | `smarthr-design-system:td-checkbox` |
| TdRadioButton | RadioButtonを内包するデータセル（Td）の派生コンポーネントです。テーブル各行から1行だけ選ばせるときに使います。 | `smarthr-design-system:td-radio-button` |
| Text | タイポグラフィのデザイントークンを使ってテキストを表示するためのコンポーネントです。本文や説明文、ラベルテキストにデザイントークン準拠のフォントサイズ・ウェイト・色・行送り・見出しスタイルなどを適用するときに使います。 | `smarthr-design-system:text` |
| Textarea | textarea要素の代替としてテキストを複数行で入力させるコンポーネントです。長文を入力させるとき、文字数カウンタが必要なときに使います。 | `smarthr-design-system:textarea` |
| TextLink | a要素の代わりに使用する汎用テキストリンクコンポーネントです。本文中にリンクを置くとき、HelpLinkやUpwardLinkで表現できないテキストリンクを提供するときに使います。 | `smarthr-design-system:text-link` |
| Th | th要素の代替としてテーブルの列見出しセルを表すコンポーネントです。 | `smarthr-design-system:th` |
| ThCheckbox | Checkboxを内包する列見出しセル（Th）の派生コンポーネントです。「テーブル内の一括操作」パターンにおいて、テーブル全行の一括選択UIを列見出しに配置するときに使います。 | `smarthr-design-system:th-checkbox` |
| Timeline | 情報を時間の流れに沿って整理・表示するためのコンポーネントです。操作履歴や更新履歴を時系列で見せるときに使います。 | `smarthr-design-system:timeline` |
| ⚠️ TimePicker（非推奨） | 【非推奨】ユーザーに時刻（時と分、任意で秒）を入力させる際に使用するコンポーネントです。 | `smarthr-design-system:time-picker` |
| Tooltip | 補足説明テキストをホバーやフォーカスで一時的に表示するためのツールチップコンポーネントです。アイコンのみボタンへのラベル付け、LineClampで省略したテキストの全文表示など、限られたスペースで補足情報を添えるときに使います。 | `smarthr-design-system:tooltip` |
| UnauthorizedErrorScreen | セッション切れなど認証が必要な状態を伝える全画面コンポーネントです。401相当のエラーで再ログインが必要なときに使います。 | `smarthr-design-system:unauthorized-error-screen` |
| UnexpectedErrorScreen | 予期しないエラーが発生したことを表示する全画面コンポーネントです。500相当のサーバーエラーを伝えるときに使います。 | `smarthr-design-system:unexpected-error-screen` |
| UpwardLink | 一階層上のコンテンツに戻るためのテキストリンクコンポーネントです。詳細画面から一覧画面など親階層へ戻る導線を置くときに使います。 | `smarthr-design-system:upward-link` |
| VisuallyHiddenText | 視覚的には隠しつつスクリーンリーダーには読み上げさせたいテキスト用のコンポーネントです。見出しやラベルが自明で、表示すると視覚的に冗長になるときなどに使います。 | `smarthr-design-system:visually-hidden-text` |
| WarekiPicker | 和暦で日付を入力させ西暦に変換する機能を備えた入力コンポーネントです。和暦の日付入力が必要なときに使います。 | `smarthr-design-system:wareki-picker` |

## 利用フロー

1. 実装したい UI 要件を整理する（例: 「フォームを作る」「テーブルを表示する」）
2. 上記の表から該当しそうなコンポーネントを特定する
3. そのコンポーネントの SKILL.md を読み、Props・実装ルール・使い方チェックリストに従って実装する
