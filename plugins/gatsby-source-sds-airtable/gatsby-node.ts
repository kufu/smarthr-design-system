import { SourceNodesArgs } from 'gatsby'

const NODE_TYPE = `SdsAirtable`

type TableField = {
  type: string
  id: string
  name: string
}

type TableView = {
  type: string
  id: string
  name: string
}

type TableResponse = {
  id: string
  name: string
  fields: TableField[]
  views: TableView[]
}

exports.sourceNodes = async (
  { actions, createContentDigest, createNodeId }: SourceNodesArgs,
  { personalAccessToken, baseId, tableView }: { personalAccessToken: string; baseId: string; tableView: string },
) => {
  const { createNode } = actions

  // Airtable上にあるテーブルの一覧を取得
  const tablesRes = await fetch(`https://api.airtable.com/v0/meta/bases/${baseId}/tables`, {
    headers: {
      Authorization: `Bearer ${personalAccessToken}`,
    },
  })

  if (!tablesRes.ok) return

  const tableData = await tablesRes.json()

  const tables: TableResponse[] = tableData.tables

  for (const table of tables) {
    // Airtable上で、表示用のviewが設定されていればそれを使う。なければデフォルトのviewを使う。
    const viewOption = table.views.find((view) => view.name === tableView) ? tableView : table.views[0].name
    const url = `https://api.airtable.com/v0/${baseId}/${table.id}?view=${encodeURIComponent(viewOption)}`
    const records = []
    let hasNext = true
    let offsetId = ''
    while (hasNext) {
      const res = await fetch(`${url}&offset=${offsetId}`, {
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN}`,
        },
      })
      if (!res.ok) break
      const data = await res.json()
      records.push(...data.records)
      offsetId = data.offset
      if (offsetId === '') hasNext = false
    }

    for (const record of records) {
      createNode({
        id: createNodeId(record.id),
        internal: {
          type: NODE_TYPE,
          contentDigest: createContentDigest(record.fields),
        },
        table: table.name,
        data: record.fields,
      })
    }
  }

  return
}
