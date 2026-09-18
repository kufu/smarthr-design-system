import { useState } from 'react';
import { Button, ControlledMessageDialog, IntlProvider } from 'smarthr-ui';

export default function DynamicMessageDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <IntlProvider locale="ja">
      <Button onClick={() => setIsOpen(true)}>MessageDialogを開く</Button>
      <ControlledMessageDialog
        isOpen={isOpen}
        heading="メッセージダイアログタイトル"
        // closeText="閉じる"
        size="XS"
        onClickClose={() => setIsOpen(false)}
        onPressEscape={() => setIsOpen(false)}
        id="dialog-message"
      >
        <p>本文が入ります。</p>
      </ControlledMessageDialog>
    </IntlProvider>
  );
}
