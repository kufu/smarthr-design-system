import { FaLockIcon, Input, IntlProvider } from 'smarthr-ui';

export default function SampleInputWithPrefixIcon() {
  return (
    <IntlProvider locale="ja">
      {/* eslint-disable-next-line smarthr/a11y-input-in-form-control */}
      <Input name="exampleprefixicon" type="password" defaultValue="password" prefix={<FaLockIcon />} />
    </IntlProvider>
  );
}
