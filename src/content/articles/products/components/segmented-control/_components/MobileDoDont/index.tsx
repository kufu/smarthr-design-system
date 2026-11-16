import { IntlProvider, Reel, SegmentedControl } from 'smarthr-ui';

import styles from './index.module.scss';

export const Dont = () => (
  <IntlProvider locale="ja">
    <SegmentedControl
      value="button2"
      options={[
        { value: 'button1', content: 'ボタン1' },
        { value: 'button2', content: '長いラベルのボタン2' },
        { value: 'button3', content: 'ボタン3' },
      ]}
    />
  </IntlProvider>
);

export const DoWithWrap = () => (
  <IntlProvider locale="ja">
    <SegmentedControl
      value="button2"
      options={[
        { value: 'button1', content: 'ボタン1' },
        { value: 'button2', content: '長いラベルのボタン2' },
        { value: 'button3', content: 'ボタン3' },
      ]}
      className={styles.doWithWrap}
    />
  </IntlProvider>
);

export const DoWithReel = () => (
  <IntlProvider locale="ja">
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
  </IntlProvider>
);
