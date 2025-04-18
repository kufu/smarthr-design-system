import { useState } from 'react';
import { Button, ModelessDialog, Text } from 'smarthr-ui';

export default function DynamicModelessDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        data-test="dialog-trigger"
        aria-haspopup="dialog"
        aria-controls="modeless-dialog"
      >
        ModelessDialogを開く
      </Button>
      <ModelessDialog
        isOpen={isOpen}
        title="モードレスダイアログタイトル"
        footer={<div style={{ padding: '16px 24px' }}> フッター </div>}
        onClickClose={() => setIsOpen(false)}
        onPressEscape={() => setIsOpen(false)}
        width={480}
        right={'10%'}
        id="modeless-dialog-1"
        data-test="dialog"
      >
        <div>
          <Text>本文が入ります。</Text>
        </div>
      </ModelessDialog>
    </>
  );
}
