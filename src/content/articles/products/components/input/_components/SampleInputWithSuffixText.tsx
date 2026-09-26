import { CurrencyInput } from 'smarthr-ui';

export default function SampleInputWithSuffixText() {
  // eslint-disable-next-line smarthr/a11y-input-in-form-control
  return <CurrencyInput name="examplesuffixtext" defaultValue="1000" suffix="円" />;
}
