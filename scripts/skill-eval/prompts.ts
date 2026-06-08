/**
 * テストプロンプト 12 件 (Notion Phase 1 ドラフトを確定したもの)。
 *
 * - direct (直球サニティ 4 件): オラクルは「正解 doc のみ」を単一注入。
 * - boundary (境界・使い分け 8 件): オラクルは「競合候補 doc + component-selector.md」を候補セット注入。
 *
 * フィールド:
 * - expected: 機械チェックの「期待コンポーネント使用有無」で正解とみなす許容集合。
 * - preferred: デザインシステム的に最も妥当な単一コンポーネント (Judge / 集計の参考。
 *   非推奨を避ける等の使い分けが問われる境界では「望ましい解」を指す)。
 * - oracleDocs: with_skill 条件で context に注入する components/<Name>.md のベース名。
 * - injectSelector: with_skill 条件で component-selector.md も注入するか (境界は true)。
 */
export type Category = 'direct' | 'boundary';

export type TestPrompt = {
  id: string;
  category: Category;
  prompt: string;
  expected: string[];
  preferred: string;
  oracleDocs: string[];
  injectSelector: boolean;
};

export const PROMPTS: TestPrompt[] = [
  // ---- 直球サニティ (単一注入) ----
  {
    id: 'd1-primary-button',
    category: 'direct',
    prompt: '保存処理を実行する primary なボタンを1つ画面に配置してください。',
    expected: ['Button'],
    preferred: 'Button',
    oracleDocs: ['Button'],
    injectSelector: false,
  },
  {
    id: 'd2-user-table',
    category: 'direct',
    prompt: 'ユーザーの一覧（氏名・メールアドレス・部署）を表形式で表示してください。',
    expected: ['Table'],
    preferred: 'Table',
    oracleDocs: ['Table'],
    injectSelector: false,
  },
  {
    id: 'd3-definition-list',
    category: 'direct',
    prompt: '確認画面で、氏名・所属・入社日を「項目名と値のペア」の定義リストとして表示してください。',
    expected: ['DefinitionList'],
    preferred: 'DefinitionList',
    oracleDocs: ['DefinitionList'],
    injectSelector: false,
  },
  {
    id: 'd4-labeled-input',
    category: 'direct',
    prompt: 'ラベルとエラーメッセージ付きの、1行テキスト入力欄（メールアドレス）を作ってください。',
    expected: ['FormControl', 'Input'],
    preferred: 'FormControl',
    oracleDocs: ['FormControl', 'Input'],
    injectSelector: false,
  },

  // ---- 境界・使い分け (候補セット注入) ----
  {
    id: 'b1-success-notification',
    category: 'boundary',
    prompt: '保存処理が成功したことを、画面上部に通知として表示してください。',
    expected: ['NotificationBar', 'ResponseMessage'],
    preferred: 'NotificationBar',
    oracleDocs: ['NotificationBar', 'ResponseMessage', 'InformationPanel'],
    injectSelector: true,
  },
  {
    id: 'b2-navigation-button',
    category: 'boundary',
    prompt: '別ページ（設定画面）へ遷移させるためのボタンを配置してください。',
    expected: ['AnchorButton', 'TextLink'],
    preferred: 'AnchorButton',
    oracleDocs: ['Button', 'TextLink'],
    injectSelector: true,
  },
  {
    id: 'b3-delete-confirm-dialog',
    category: 'boundary',
    prompt: 'データ削除の確認ダイアログを表示し、実行ボタンを危険操作として赤色にしてください。',
    expected: ['ActionDialog'],
    preferred: 'ActionDialog',
    oracleDocs: ['ActionDialog', 'MessageDialog'],
    injectSelector: true,
  },
  {
    id: 'b4-multi-action-button',
    category: 'boundary',
    prompt: '1つの対象に対する「編集・複製・削除」の複数アクションを、1つのボタンにまとめてください。',
    expected: ['DropdownMenuButton'],
    preferred: 'DropdownMenuButton',
    oracleDocs: ['DropdownMenuButton', 'Button'],
    injectSelector: true,
  },
  {
    id: 'b5-group-inputs',
    category: 'boundary',
    prompt: 'フォーム内で、関連する複数の入力欄（住所の都道府県・市区町村・番地）を1つの見出しでグループ化してください。',
    expected: ['Fieldset'],
    preferred: 'Fieldset',
    oracleDocs: ['Fieldset', 'FormControl'],
    injectSelector: true,
  },
  {
    id: 'b6-date-input',
    category: 'boundary',
    // DatePicker は非推奨。ガイドは Input[type=date] へ誘導するはず。
    prompt: 'ユーザーに日付（入社日）を選択・入力させる入力欄を作ってください。',
    expected: ['Input'],
    preferred: 'Input',
    oracleDocs: ['DatePicker', 'Input'],
    injectSelector: true,
  },
  {
    id: 'b7-danger-button',
    category: 'boundary',
    prompt: 'アカウントを完全に削除する、取り消し不可能な危険操作のボタンを配置してください。',
    expected: ['Button'],
    preferred: 'Button',
    oracleDocs: ['Button'],
    injectSelector: true,
  },
  {
    id: 'b8-remote-trigger-dialog',
    category: 'boundary',
    prompt: 'ボタンの配置場所とダイアログの定義を別々の階層に分けたうえで、ボタンを押すと確認ダイアログが開くようにしてください。',
    expected: ['RemoteDialogTrigger'],
    preferred: 'RemoteDialogTrigger',
    oracleDocs: ['RemoteDialogTrigger', 'ActionDialog'],
    injectSelector: true,
  },
];
