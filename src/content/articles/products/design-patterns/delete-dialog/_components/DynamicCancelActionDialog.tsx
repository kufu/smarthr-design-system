import { useState } from 'react';
import { ActionDialog, Button, Text } from 'smarthr-ui';

export default function DynamicCancelActionDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>取り消しダイアログを開く</Button>
      <ActionDialog
        isOpen={isOpen}
        title="{操作名}の取り消し"
        actionText="取り消し"
        actionTheme="danger"
        onClickClose={() => {
          setIsOpen(false);
        }}
        onClickAction={() => {
          setIsOpen(false);
        }}
        width={480}
      >
        <Text as="p">
          {'{操作名}を取り消しますか？'}
          <br />
          {'「取り消し」を押すと変更内容が破棄されます。'}
        </Text>
      </ActionDialog>
    </>
  );
}
