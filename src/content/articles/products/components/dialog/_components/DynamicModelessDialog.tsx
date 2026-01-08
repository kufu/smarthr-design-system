import { useState } from 'react';
import { Button, IntlProvider, ModelessDialog, Text } from 'smarthr-ui';

export default function DynamicModelessDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <IntlProvider locale="ja">
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
        size="S"
        right={'10%'}
        id="modeless-dialog-1"
        data-test="dialog"
      >
        <div>
          <Text>本文が入ります。</Text>
        </div>
      </ModelessDialog>
    </IntlProvider>
  );
}
