import { Reel, SegmentedControl } from 'smarthr-ui';

import styles from './index.module.scss';

export const Dont = () => (
  <SegmentedControl
    value="button2"
    options={[
      { value: 'button1', content: 'ボタン' },
      { value: 'button2', content: '長いラベルのボタン' },
      { value: 'button3', content: 'ボタン' },
    ]}
  />
);

export const DoWithWrap = () => (
  <SegmentedControl
    value="button2"
    options={[
      { value: 'button1', content: 'ボタン' },
      { value: 'button2', content: '長いラベルのボタン' },
      { value: 'button3', content: 'ボタン' },
    ]}
    className={styles.doWithWrap}
  />
);

export const DoWithReel = () => (
  <Reel>
    <SegmentedControl
      value="button2"
      options={[
        { value: 'button1', content: 'ボタン' },
        { value: 'button2', content: '長いラベルのボタン' },
        { value: 'button3', content: 'ボタン' },
      ]}
    />
  </Reel>
);
