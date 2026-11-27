import { FaLockOpenIcon, Input } from 'smarthr-ui';

export default function SampleInputWithSuffixIcon() {
  // eslint-disable-next-line smarthr/a11y-input-in-form-control
  return <Input name="examplesuffixicon" defaultValue="テキスト" suffix={<FaLockOpenIcon />} />;
}
