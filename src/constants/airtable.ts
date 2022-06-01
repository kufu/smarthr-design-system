type airtableSortType = 'NONE' | 'REVERSE' | 'CHARACTER' | 'AIRTABLE'

export type airtableContents = {
  pageTitle: string
  pagePath: string
  tableName: string
  sort: airtableSortType
}

export const AIRTABLE_CONTENTS: airtableContents[] = [
  {
    pageTitle: 'ライティングスタイル',
    pagePath: '/products/contents/writing-style/',
    tableName: '基本的な考え方や表記',
    sort: 'AIRTABLE',
  },
  {
    pageTitle: 'UIテキスト',
    pagePath: '/products/contents/app-writing/',
    tableName: 'UIテキスト',
    sort: 'AIRTABLE',
  },
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
