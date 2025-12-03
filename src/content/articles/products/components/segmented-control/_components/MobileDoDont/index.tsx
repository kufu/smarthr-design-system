import { Reel, SegmentedControl } from 'smarthr-ui';

import styles from './index.module.scss';

export const Dont = () => (
  <SegmentedControl
    value="button2"
    options={[
      { value: 'button1', content: 'ボタン1' },
      { value: 'button2', content: '長いラベルのボタン2' },
      { value: 'button3', content: 'ボタン3' },
    ]}
  />
);

export const DoWithWrap = () => (
  <SegmentedControl
    value="button2"
    options={[
      { value: 'button1', content: 'ボタン1' },
      { value: 'button2', content: '長いラベルのボタン2' },
      { value: 'button3', content: 'ボタン3' },
    ]}
    className={styles.doWithWrap}
  />
);

export const DoWithReel = () => (
  <Reel>
    <SegmentedControl
      value="button2"
      options={[
        { value: 'button1', content: 'ボタン1' },
        { value: 'button2', content: '長いラベルのボタン2' },
        { value: 'button3', content: 'ボタン3' },
      ]}
    />
  </Reel>
);
