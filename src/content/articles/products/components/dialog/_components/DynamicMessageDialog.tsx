import { useState } from 'react';
import { Button, MessageDialog } from 'smarthr-ui';

export default function DynamicMessageDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>MessageDialogを開く</Button>
      <MessageDialog
        isOpen={isOpen}
        title="メッセージダイアログタイトル"
        description="本文が入ります。"
        // closeText="閉じる"
        width={480}
        onClickClose={() => setIsOpen(false)}
        onPressEscape={() => setIsOpen(false)}
        id="dialog-message"
      />
    </>
  );
}
