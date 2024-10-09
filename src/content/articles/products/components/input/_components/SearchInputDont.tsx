import { useState } from 'react';
import { Base, Button, Cluster, EmptyTableBody, SearchInput, Table, Td, Text, Th } from 'smarthr-ui';

export default function SearchInputDont() {
  const objects = ['オブジェクト 1', 'オブジェクト 2', 'オブジェクト 3'];
  const [query, setQuery] = useState('hello');
  const [result, setResult] = useState<string[]>([]);
  const search = (q: string) => {
    setResult(objects.filter((object) => object.includes(q)));
  };

  return (
    <Base overflow="auto">
      <Cluster justify="space-between" align="center" className="shr-p-1">
        <form role="search" onSubmit={(e) => e.preventDefault()}>
          <Cluster align="center" gap={1}>
            <Cluster gap={0.5}>
              <SearchInput
                tooltipMessage="オブジェクト名で検索できます。"
                value={query}
                name="search"
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
              />
              <Button
                onClick={() => {
                  search(query);
                }}
              >
                検索
              </Button>
            </Cluster>
          </Cluster>
        </form>
      </Cluster>
      <Table style={{ margin: 0 }}>
        <thead>
          <tr>
            <Th>オブジェクト</Th>
          </tr>
        </thead>
        {result.length === 0 ? (
          <EmptyTableBody>
            <Text>
              該当するオブジェクトはありません。
              <br />
              別の条件を試してください。
            </Text>
          </EmptyTableBody>
        ) : (
          <tbody>
            {result.map((object, index) => (
              <tr key={index}>
                <Td>{object}</Td>
              </tr>
            ))}
          </tbody>
        )}
      </Table>
    </Base>
  );
}
