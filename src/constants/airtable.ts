type airtableSortType = 'NONE' | 'REVERSE' | 'CHARACTER' | 'AIRTABLE'

export type airtableContents = {
  pageTitle: string
  pagePath: string
  tableName: string
  sort: airtableSortType
}

export const AIRTABLE_CONTENTS: airtableContents[] = [
  {
    pageTitle: '用字用語：一覧',
    pagePath: '/products/contents/idiomatic-usage/data/',
    tableName: '用字用語：一覧',
    sort: 'CHARACTER',
  },
  {
    pageTitle: '用字用語：理由',
    pagePath: '/products/contents/idiomatic-usage/usage/',
    tableName: '用字用語：理由',
    sort: 'AIRTABLE',
  },
]

export const AIRTABLE_MOCK_DATA = AIRTABLE_CONTENTS.map((content) => {
  return {
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
      reason: 'recMOCKDATA',
      data: '-',
      order: 0,
    },
  }
})
