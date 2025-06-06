import { useState } from 'react';
import { ActionDialog, Button, IntlProvider, Text } from 'smarthr-ui';

export default function DynamicActionDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <IntlProvider locale="ja">
      <Button onClick={() => setIsOpen(true)}>ActionDialogを開く</Button>
      <ActionDialog
        isOpen={isOpen}
        title="アクションダイアログタイトル"
        // closeText="キャンセル"
        actionText="実行"
        actionTheme="primary"
        width={480}
        onClickClose={() => {
          setIsOpen(false);
        }}
        onPressEscape={() => setIsOpen(false)}
        onClickAction={() => {
          setIsOpen(false);
        }}
      >
        <Text>本文が入ります。</Text>
      </ActionDialog>
    </IntlProvider>
  );
}
