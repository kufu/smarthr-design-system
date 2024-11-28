import { FaLockIcon, Input } from 'smarthr-ui';

export default function SampleInputWithPrefixIcon() {
  // eslint-disable-next-line smarthr/a11y-input-in-form-control
  return <Input name="exampleprefixicon" type="password" defaultValue="password" prefix={<FaLockIcon />} />;
}
