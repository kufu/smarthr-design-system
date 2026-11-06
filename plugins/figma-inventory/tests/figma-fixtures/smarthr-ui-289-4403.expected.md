# Figma インベントリ（smarthr-ui-289-4403.raw.json）

凡例: «レイヤー名» はコンポーネント外のフレーム。フレームの `|` の後ろは見た目の値（固定の寸法・角丸・背景・境目）。`→ guide:` は Code Connect の import 先から解決したcomponent-guidelines のガイド。`Figma:` は Figma のプロパティ値そのまま（smarthr-ui の props ではない）。Code Connect のあるコンポーネントの見た目（色・形・大きさ）は出ないので、スクリーンショットで確かめる。「アセット画像（Code Connect なし）」は Figma に置かれた画像で、smarthr-ui のアイコンとして紐づいていない。省略したもの: ノード ID・インスタンススワップの ID、false のブール、Variant の -/False/Off/default/enabled/false/normal/off、オフのスロットの値、import 名（レイヤー名由来）。

⚠ component-guidelines のガイド一覧が見つからず、ガイド名を確認できていない（smarthr-design-system プラグインを入れると付く）。

## 共通値（全インスタンスで同じ値。各行からは省略）

- AppNaviButton（5 件）: content=closed text=ナビゲーション
- Checkbox（11 件）: type=unchecked
- Td（80 件）: borderType=horizontal text2=テーブル内容 text3=テーブル内容
- Th（8 件）: borderType=horizontal

## 構造

- «collection» 縦 align=center | 幅1400px
  - DesktopHeader → guide: なし（AppHeader/components/desktop/DesktopHeader.tsx） | Figma: mediaQuery=Desktop
    - SmartHRLogo → guide: なし（SmartHRLogo/SmartHRLogo.tsx） | Figma: type=logoMark color=white
    - HeaderDropdownMenuButton → guide: なし（Header/HeaderDropdownMenuButton.tsx） | Figma: type=closed
      - Button → guide: なし（Button/Button.tsx） | Figma: variant=skeleton size=M suffixIcon=FaCaretDown | 「株式会社SmartHR」
    - AppLauncher → guide: なし（Header/AppLauncher/AppLauncher.tsx） | Figma: type=closed
      - Button → guide: なし（Button/Button.tsx） | Figma: variant=skeleton size=M prefixIcon=FaToolbox | 「アプリ」
    - HeaderLink → guide: なし（Header/HeaderLink.tsx） | Figma: showPrefixIcon icons=FaGraduationCap | 「スクール」
    - HeaderLink → guide: なし（Header/HeaderLink.tsx） | Figma: showPrefixIcon icons=FaCircleQuestion | 「ヘルプ」
    - LanguageSwitcher → guide: なし（Header/LanguageSwitcher/LanguageSwitcher.tsx） | Figma: narrow type=closed icons=FaGlobe,FaCaretDown
    - HeaderDropdownMenuButton → guide: なし（Header/HeaderDropdownMenuButton.tsx） | Figma: type=closed
      - Button → guide: なし（Button/Button.tsx） | Figma: variant=skeleton size=M suffixIcon=FaCaretDown | 「須磨 栄子（SHR0001）」
    - AppNavi → guide: なし（AppNavi/AppNavi.tsx） | Figma: showReleaseNoteButton
      - StatusLabel → guide: なし（StatusLabel/StatusLabel.tsx） | Figma: type=grey | 「機能名」
      - AppNaviButton → guide: なし（AppNavi/AppNaviButton.tsx） | Figma: type=button state=current
      - AppNaviButton → guide: なし（AppNavi/AppNaviButton.tsx） | Figma: type=button（×3 同一）
      - AppNaviButton → guide: なし（AppNavi/AppNaviButton.tsx） | Figma: type=dropdown icons=FaCaretDown
      - Spacer（import 無し）
      - ReleaseNotesDropdown → guide: なし（AppHeader/components/desktop/ReleaseNotesDropdown.tsx） | Figma: content=closed icons=FaCaretDown
  - «Container» > «group» 縦 gap=32px(token 2) | 幅1184px | «Container»: 余白32px
    - «group» 縦 gap=24px(token 1.5)
      - «headingArea» 縦 gap=16px(token 1)
        - UpwardLink → guide: なし（TextLink/UpwardLink/UpwardLink.tsx） | Figma: indent=true
          - TextLink → guide: なし（TextLink/TextLink.tsx） | Figma: underline=true size=M prefixIcon=FaArrowLeft | 「一覧に戻る」
        - Heading → guide: なし（Heading/Heading.tsx） | Figma: type=sectionTitle size=XL | 「タイトルテキスト」
        - 「画面説明テキスト×56」
      - InformationPanel → guide: なし（InformationPanel/InformationPanel.tsx） | Figma: toggleable open=true type=info | 「内容テキスト×57」
        - ResponseMessage → guide: なし（ResponseMessage/ResponseMessage.tsx） | Figma: type=info size=M icons=FaCircleInfo | 「パネル見出し」
        - Button → guide: なし（Button/Button.tsx） | Figma: variant=secondary size=S suffixIcon=FaCaretUp | 「閉じる」
    - 未紐づけ «ListStatusSummary» 縦 gap=16px(token 1)
      - Heading → guide: なし（Heading/Heading.tsx） | Figma: type=sectionTitle size=L | 「一覧ステータスサマリ」
      - «Contents» 縦 gap=24px(token 1.5) | 余白24px 角丸8px 背景=white 影
        - 「件数を押すと該当する条件で絞り込みます。」
        - «Statuses» 横 gap=16px(token 1)
          - «Status 1» 横 gap=8px(token 0.5) align=center
            - StatusLabel → guide: なし（StatusLabel/StatusLabel.tsx） | Figma: type=grey | 「ステータス」
            - 「99件」 文字色=text_link
          - «Status 2» 横 gap=8px(token 0.5) align=center
            - StatusLabel → guide: なし（StatusLabel/StatusLabel.tsx） | Figma: type=blue | 「ステータス」
            - 「99件」 文字色=text_link
          - «Status 3» 横 gap=8px(token 0.5) align=center
            - StatusLabel → guide: なし（StatusLabel/StatusLabel.tsx） | Figma: type=green | 「ステータス」
            - 「99件」 文字色=text_link
          - «Status 4» 横 gap=8px(token 0.5) align=center
            - StatusLabel → guide: なし（StatusLabel/StatusLabel.tsx） | Figma: type=red | 「ステータス」
            - 「99件」 文字色=text_link
          - «Status 5» 横 gap=8px(token 0.5) align=center
            - StatusLabel → guide: なし（StatusLabel/StatusLabel.tsx） | Figma: type=grey bold=true | 「ステータス」
            - 「99件」 文字色=text_link
          - «Status 6» 横 gap=8px(token 0.5) align=center
            - StatusLabel → guide: なし（StatusLabel/StatusLabel.tsx） | Figma: type=blue bold=true | 「ステータス」
            - 「99件」 文字色=text_link
          - «Status 7» 横 gap=8px(token 0.5) align=center
            - StatusLabel → guide: なし（StatusLabel/StatusLabel.tsx） | Figma: type=green bold=true | 「ステータス」
            - 「99件」 文字色=text_link
          - «Status 8» 横 gap=8px(token 0.5) align=center
            - StatusLabel → guide: なし（StatusLabel/StatusLabel.tsx） | Figma: type=red bold=true | 「ステータス」
            - 「99件」 文字色=text_link
    - «よくあるテーブル» 縦 gap=16px(token 1)
      - «Title» 横 align=center
        - Heading → guide: なし（Heading/Heading.tsx） | Figma: type=sectionTitle size=L | 「一覧見出し」
        - «spacer»（空）
        - Button → guide: なし（Button/Button.tsx） | Figma: variant=secondary size=M prefixIcon=FaCirclePlus | 「新規追加」
      - «Base» 縦 | 角丸8px 背景=white 影
        - 未紐づけ «ListSearchField» 横 gap=16px(token 1) align=center | 余白16px
          - «search buttons» 横 gap=16px(token 1)
            - «SearchForm» 横 gap=8px(token 0.5)
              - SearchInput → guide: なし（Input/SearchInput/SearchInput.tsx）
                - Input → guide: なし（Input/Input.tsx） | Figma: mins=00 hours=12 day=01 month=01 year=1970 isChrome showPrefix type=text icons=FaMagnifyingGlass | 「 」
              - Button → guide: なし（Button/Button.tsx） | Figma: variant=secondary size=M | 「検索」
            - FilterDropdown → guide: なし（Dropdown/FilterDropdown/FilterDropdown.tsx） | Figma: type=closed triggerSize=M
              - Button → guide: なし（Button/Button.tsx） | Figma: variant=secondary size=M suffixIcon=FaFilter | 「絞り込み」
            - Button → guide: なし（Button/Button.tsx） | Figma: variant=secondary size=M prefixIcon=FaCloudArrowDown | 「ダウンロード」
          - Spacer（import 無し）
          - Pagination → guide: なし（Pagination/Pagination.tsx） | Figma: type=pageNumbers withoutNumbers=true
            - PageCounter → guide: なし（PageCounter/PageCounter.tsx） | Figma: end=「50」 showTotal start=「1」 total=「5,000」
            - Button → guide: なし（Button/Button.tsx） | Figma: variant=secondary size=S state=disabled square=True icons=FaAnglesLeft | 「ボタン」
            - Button → guide: なし（Button/Button.tsx） | Figma: variant=secondary size=S state=disabled square=True icons=FaAngleLeft | 「ボタン」
            - Button → guide: なし（Button/Button.tsx） | Figma: variant=secondary size=S square=True icons=FaAngleRight | 「ボタン」
            - Button → guide: なし（Button/Button.tsx） | Figma: variant=secondary size=S square=True icons=FaAnglesRight | 「ボタン」
        - «Table» 縦
          - «Head» 横 Th 行: type=checkbox 「テーブル見出し」 [Checkbox] / 「ステータス」 / 「社員番号」 / 「氏名」 / 「部署」 / 「役職」 / 「雇用形態」 / 「入社年月日」
          - BulkActionRow → guide: なし（Table/BulkActionRow.tsx） | Figma: showWakuWakuButton showButtons state=disabled
            - Button → guide: なし（Button/Button.tsx） | Figma: variant=secondary size=S state=disabled | 「ボタン」（×4 同一）
          - «tr» 横 Td 行: type=checkbox 「テーブル内容」 [Checkbox] / type=statusLabel 「テーブル内容」 [StatusLabel | Figma: type=grey | 「ステータス」] / type=text 「SHR0001」 / type=link 「須磨栄子」 / type=text 「営業部」 / type=text 「部長」 / type=text 「正社員」 / type=text 「2021/12/12」（×10 同一）
      - «Pagination» 縦 align=center
        - Pagination → guide: なし（Pagination/Pagination.tsx） | Figma: type=firstHalf
          - Button → guide: なし（Button/Button.tsx） | Figma: variant=secondary size=S state=disabled square=True icons=FaAnglesLeft | 「ボタン」
          - Button → guide: なし（Button/Button.tsx） | Figma: variant=secondary size=S state=disabled square=True icons=FaAngleLeft | 「ボタン」
          - PaginationItemButton → guide: なし（Pagination/PaginationItemButton.tsx） | Figma: state=current
            - Button → guide: なし（Button/Button.tsx） | Figma: variant=primary size=S | 「1」
          - PaginationItemButton → guide: なし（Pagination/PaginationItemButton.tsx）（同じ形 ×4。2 件目以降は文言のみ）
            - Button → guide: なし（Button/Button.tsx） | Figma: variant=secondary size=S | 「2」
            - 2〜4 件目の文言（1 件目と同じ順）:
              - 「3」
              - 「4」
              - 「5」
          - PaginationItemButton → guide: なし（Pagination/PaginationItemButton.tsx） | Figma: state=dots
          - PaginationItemButton → guide: なし（Pagination/PaginationItemButton.tsx）
            - Button → guide: なし（Button/Button.tsx） | Figma: variant=secondary size=S | 「99」
          - Button → guide: なし（Button/Button.tsx） | Figma: variant=secondary size=S square=True icons=FaAngleRight | 「ボタン」
          - Button → guide: なし（Button/Button.tsx） | Figma: variant=secondary size=S square=True icons=FaAnglesRight | 「ボタン」

## 要確認（スクリプトでは判断しない）

- 未紐づけ（Code Connect なし。レイヤー名と構造のみ）: «ListStatusSummary»、«ListSearchField»
- ガイドに解決できなかった import: SmartHRLogo/SmartHRLogo.tsx、Button/Button.tsx（×26）、Header/HeaderDropdownMenuButton.tsx（×2）、Header/AppLauncher/AppLauncher.tsx、Header/HeaderLink.tsx（×2）、Header/LanguageSwitcher/LanguageSwitcher.tsx、StatusLabel/StatusLabel.tsx（×19）、AppNavi/AppNaviButton.tsx（×5）、Spacer（×2）、AppHeader/components/desktop/ReleaseNotesDropdown.tsx、AppNavi/AppNavi.tsx、AppHeader/components/desktop/DesktopHeader.tsx、TextLink/TextLink.tsx、TextLink/UpwardLink/UpwardLink.tsx、Heading/Heading.tsx（×3）、ResponseMessage/ResponseMessage.tsx、InformationPanel/InformationPanel.tsx、Input/Input.tsx、Input/SearchInput/SearchInput.tsx、Dropdown/FilterDropdown/FilterDropdown.tsx、PageCounter/PageCounter.tsx、Pagination/Pagination.tsx（×2）、Checkbox/Checkbox.tsx（×11）、Table/BulkActionRow.tsx、Pagination/PaginationItemButton.tsx（×7）
- 二重 import を props の名前で判別した（同じレスポンス内の別インスタンスと照合）: Button3 → Button/Button.tsx（props 12 個が一致）（×2）、Button4 → Button/Button.tsx（props 12 個が一致）（×2）、Button3 → Pagination/PaginationItemButton.tsx（props 1 個が一致）、Button4 → Pagination/PaginationItemButton.tsx（props 1 個が一致）

## 次にすること（スクリプトでは判断していないこと）

- スクリーンショットと照合し、インベントリに無い文言（プロパティとして公開されていないテキストの上書き）を拾う
- ブールだけでアイコン名が無いもの（prefixIcon など）は、スクリーンショットでアイコンの形を確かめる
- 「要確認」の各項目は、スクリーンショットで見た目を確かめてから判断する。ここでは解決しない
- 「ボタン」「テーブル内容」のような Figma の既定の文言は、スクリーンショットでも同じか確かめる。勝手に置き換えない
- props への変換は、component-guidelines の該当ガイド（`→ guide:` の名前）を読んでから行う。Figma の構造よりガイドの実装ルールを優先する。プロジェクトの smarthr-ui のバージョンがガイドと違うときは d.ts を正とする
