import { FaCircleXmarkIcon, Input, UnstyledButton, VisuallyHiddenText } from 'smarthr-ui';

export default function SampleInputWithSuffixIcon() {
  return (
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
