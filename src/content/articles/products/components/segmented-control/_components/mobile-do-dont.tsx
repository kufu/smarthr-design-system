import { Reel, SegmentedControl, Text } from 'smarthr-ui';

export const Dont = () => (
  <SegmentedControl
    value="button2"
    options={[
      { value: 'button1', content: 'ボタン' },
      { value: 'button2', content: 'ながいラベルのボタン' },
      { value: 'button3', content: 'もっとながいラベルのボタン' },
    ]}
  />
);

export const DoWithWrap = () => (
  <SegmentedControl
    value="button2"
    options={[
      { value: 'button1', content: <Text>ボタン</Text> },
      { value: 'button2', content: <Text>ながいラベルのボタン</Text> },
      { value: 'button3', content: <Text>ボタン</Text> },
    ]}
  />
);

export const DoWithReel = () => (
  <Reel>
    <SegmentedControl
      value="button2"
      options={[
        { value: 'button1', content: 'ボタン' },
        { value: 'button2', content: 'ながいラベルのボタン' },
        { value: 'button3', content: 'もっとながいラベルのボタン' },
      ]}
    />
  </Reel>
);
