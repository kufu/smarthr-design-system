import { FaCircleXmarkIcon, Input, UnstyledButton, VisuallyHiddenText } from 'smarthr-ui';

export default function SampleInputWithSuffixIcon() {
  return (
    // eslint-disable-next-line smarthr/a11y-input-in-form-control
    <Input
      name="examplesuffixicon"
      defaultValue="テキスト"
      suffix={
        <UnstyledButton>
          <VisuallyHiddenText>入力内容を削除</VisuallyHiddenText>
          <FaCircleXmarkIcon style={{ display: 'block' }} />
        </UnstyledButton>
      }
    />
  );
}
