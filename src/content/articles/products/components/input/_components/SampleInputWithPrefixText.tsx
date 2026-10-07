import { CurrencyInput } from 'smarthr-ui';

export default function SampleInputWithPrefixText() {
  // eslint-disable-next-line smarthr/a11y-input-in-form-control
  return <CurrencyInput name="exampleprefixtext" defaultValue="1000" prefix="$" />;
}
