import { useState } from 'react';
import { Button, ControlledActionDialog, IntlProvider } from 'smarthr-ui';

export default function DynamicActionDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <IntlProvider locale="ja">
      <Button onClick={() => setIsOpen(true)}>ActionDialogを開く</Button>
      <ControlledActionDialog
        isOpen={isOpen}
        heading="アクションダイアログタイトル"
        // closeText="キャンセル"
        actionButton={{ text: '実行', theme: 'primary' }}
        size="XS"
        onClickClose={() => setIsOpen(false)}
        onPressEscape={() => setIsOpen(false)}
        onClickAction={(_e, { close }) => close()}
      >
        <p>本文が入ります。</p>
      </ControlledActionDialog>
    </IntlProvider>
  );
}
