import { BaseColumn, IntlProvider, WarningIcon } from 'smarthr-ui';

export default function Warning() {
  return (
    <IntlProvider locale="ja">
      <BaseColumn>
        <WarningIcon
          text={
            <span>
              MessageScreenコンポーネントは非推奨です。<a href="/products/components/error-screen/">ErrorScreen</a>
              コンポーネントを使用してください。
            </span>
          }
        />
      </BaseColumn>
    </IntlProvider>
  );
}
