type TableField = {
  type: string;
  id: string;
  name: string;
};

type TableView = {
  type: string;
  id: string;
  name: string;
};

type TableResponse = {
  id: string;
  name: string;
  fields: TableField[];
  views: TableView[];
};

// TODO: 不足があるかもしれないので実際に使う際に確認する
type FieldType = {
  name?: string;
  label?: string;
  description?: string;
  discussion?: string;
  source?: string;
  'ng-example'?: string;
  'ok-example'?: string;
  expected?: string;
  reason?: string[];
  record_id?: string;
  order?: number;
};

/**
 * [airtable](https://www.airtable.com/)にあるデータを取得する
 * @param tableView 表示するviewの名前
 * @returns Airtable上のデータ
 */
export async function fetchSdsAirtable(tableView: string): Promise<FieldType[] | undefined> {
  const baseId = import.meta.env.AIRTABLE_BASE_ID;
  const accessToken = import.meta.env.AIRTABLE_PERSONAL_ACCESS_TOKEN;

  // Airtable上にあるテーブルの一覧を取得
  const tablesRes = await fetch(`https://api.airtable.com/v0/meta/bases/${baseId}/tables`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!tablesRes.ok) return;

  const tableData = await tablesRes.json();

  const tables: TableResponse[] = tableData.tables;
  const fields: FieldType[] = [];

  for (const table of tables) {
    // Airtable上で、表示用のviewが設定されていればそれを使う。なければデフォルトのviewを使う。
    const viewOption = table.views.find((view) => view.name === tableView) ? tableView : table.views[0].name;
    const url = `https://api.airtable.com/v0/${baseId}/${table.id}?view=${encodeURIComponent(viewOption)}`;
    const records = [];
    let hasNext = true;
    let offsetId = '';

    while (hasNext) {
      const res = await fetch(`${url}&offset=${offsetId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!res.ok) break;
      const data = await res.json();
      records.push(...data.records);
      offsetId = data.offset;
      if (offsetId === '') hasNext = false;
    }

    for (const record of records) {
      fields.push(record.fields);
    }
  }

  return fields;
}
