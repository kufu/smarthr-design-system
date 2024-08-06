type airtableSortType = 'NONE' | 'REVERSE' | 'CHARACTER' | 'AIRTABLE'

export type airtableContents = {
  pageTitle: string
  pagePath: string
  tableName: string
  sort: airtableSortType
}

export const AIRTABLE_CONTENTS: airtableContents[] = [
  {
    pageTitle: '用字用語一覧',
    pagePath: '/products/contents/idiomatic-usage/data/',
    tableName: '用字用語：索引',
    sort: 'CHARACTER',
  },
  {
    pageTitle: '漢字とひらがなの使いわけ',
    pagePath: '/products/contents/idiomatic-usage/kana-kanji/',
    tableName: '用字一覧：漢字とひらがな',
    sort: 'AIRTABLE',
  },
  {
    pageTitle: 'カタカナ語の表記',
    pagePath: '/products/contents/idiomatic-usage/katakana/',
    tableName: '用字一覧：カタカナ語',
    sort: 'AIRTABLE',
  },
  {
    pageTitle: '数字・数えの表記',
    pagePath: '/products/contents/idiomatic-usage/number/',
    tableName: '用字一覧：数字・数え',
    sort: 'AIRTABLE',
  },
  {
    pageTitle: '記号の表記',
    pagePath: '/products/contents/idiomatic-usage/mark/',
    tableName: '用字一覧：記号',
    sort: 'AIRTABLE',
  },
  {
    pageTitle: 'SmartHRの用語',
    pagePath: '/products/contents/idiomatic-usage/smarthr/',
    tableName: '用語一覧：SmartHRの用語',
    sort: 'AIRTABLE',
  },
  {
    pageTitle: 'ユーザーインターフェースの呼び方',
    pagePath: '/products/contents/idiomatic-usage/ui/',
    tableName: '用語一覧：コンポーネント',
    sort: 'AIRTABLE',
  },
  {
    pageTitle: '操作を表す用語',
    pagePath: '/products/contents/idiomatic-usage/action/',
    tableName: '用語一覧：操作',
    sort: 'AIRTABLE',
  },
  {
    pageTitle: 'その他類似する用語の使いわけ',
    pagePath: '/products/contents/idiomatic-usage/others/',
    tableName: '用語一覧：その他',
    sort: 'AIRTABLE',
  },
]

export const AIRTABLE_MOCK_DATA = AIRTABLE_CONTENTS.map((content) => ({
  table: content.tableName,
  data: {
    record_id: 'recMOCKDATA',
    name: '項目名',
    description: '項目の説明文',
    discussion: '項目の議事録',
    source: '項目の出典',
    label: '項目のラベル',
    ng_example: '表記のNG事例',
    ok_example: '表記のOK事例',
    expected: '-',
    order: 0,
  },
}))
