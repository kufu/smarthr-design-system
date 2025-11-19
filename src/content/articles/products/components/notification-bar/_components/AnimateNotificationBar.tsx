import { useState } from 'react';
import { Button, NotificationBar, Stack } from 'smarthr-ui';

export default function Animation() {
  const [visible, setVisible] = useState(false);

  return (
    <Stack style={{ width: '100%', background: '#f8f7f6', padding: '8px' }}>
      {visible && (
        <NotificationBar type="success" bold animate onClose={() => setVisible(!visible)}>
          タスクの登録に成功しました。
        </NotificationBar>
      )}
      <Button onClick={() => setVisible(!visible)}>NotificationBarを{visible ? '隠す' : '表示'}</Button>
    </Stack>
  );
}
