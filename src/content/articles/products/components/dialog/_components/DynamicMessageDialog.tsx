import { useState } from 'react';
import { Button, IntlProvider, MessageDialog } from 'smarthr-ui';

export default function DynamicMessageDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <IntlProvider locale="ja">
      <Button onClick={() => setIsOpen(true)}>MessageDialogを開く</Button>
      <MessageDialog
        isOpen={isOpen}
        title="メッセージダイアログタイトル"
        // closeText="閉じる"
        size="XS"
        onClickClose={() => setIsOpen(false)}
        onPressEscape={() => setIsOpen(false)}
        id="dialog-message"
      >
        <p>本文が入ります。</p>
      </MessageDialog>
    </IntlProvider>
  );
}
