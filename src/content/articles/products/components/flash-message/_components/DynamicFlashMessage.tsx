import { useState } from 'react';
import { Button, FlashMessage } from 'smarthr-ui';

export default function DynamicFlashMessage() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button onClick={() => setVisible(true)}>FlashMessageを表示</Button>
      <FlashMessage
        type="success"
        text="Hello, FlashMessage."
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
      />
    </>
  );
}
