import { FaLockIcon, Input } from 'smarthr-ui';

export default function SampleInputWithPrefixIcon() {
  return <Input name="exampleprefixicon" type="password" defaultValue="password" prefix={<FaLockIcon />} />;
}
