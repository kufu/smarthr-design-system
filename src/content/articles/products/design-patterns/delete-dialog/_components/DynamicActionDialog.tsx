import { useState } from 'react';
import {
  ActionDialog,
  BaseColumn,
  Button,
  Checkbox,
  DefinitionList,
  DefinitionListItem,
  IntlProvider,
  ResponseMessage,
  Stack,
  Text,
} from 'smarthr-ui';

export default function DynamicActionDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <IntlProvider locale="ja">
      <Button onClick={() => setIsOpen(true)}>削除ダイアログを開く</Button>
      <ActionDialog
        isOpen={isOpen}
        title="{オブジェクト名}の削除"
        actionText="削除"
        actionTheme="danger"
        onClickClose={() => {
          setIsOpen(false);
        }}
        onClickAction={() => {
          setIsOpen(false);
        }}
        size="S"
      >
        <Stack gap={1.5}>
          <p>{'以下の{オブジェクト名}を削除しますか？　この操作は元に戻せません。'}</p>
          <DefinitionList termStyleType="blockTitle">
            <DefinitionListItem term="削除する{オブジェクト名}">{`{インスタンス名}`}</DefinitionListItem>
          </DefinitionList>
          <Stack gap={0.5}>
            <BaseColumn>
              <ResponseMessage type="warning">
                <Text weight="bold">注意事項</Text>
              </ResponseMessage>
              <ul style={{ marginBottom: 0, paddingLeft: '16px' }}>
                <li>{'{関連するオブジェクト名など}に登録されているデータも削除されます。'}</li>
                <li>{'{選択したオブジェクトのインスタンス名}に含まれる{オブジェクト名}も削除されます。'}</li>
              </ul>
            </BaseColumn>
            <BaseColumn>
              <Checkbox name="delete_confirm">注意事項を確認しました。</Checkbox>
            </BaseColumn>
          </Stack>
        </Stack>
      </ActionDialog>
    </IntlProvider>
  );
}
