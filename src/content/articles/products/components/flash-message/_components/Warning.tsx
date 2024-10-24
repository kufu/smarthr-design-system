import { BaseColumn, WarningIcon } from 'smarthr-ui';

export default function Warning() {
  return (
    <BaseColumn>
      <WarningIcon
        text={
          <span>
            FlashMessageは非推奨です。ユーザーに操作の結果を伝えるUIについては、
            <a href="/products/design-patterns/feedback">フィードバック</a>を参照してください。
          </span>
        }
      />
    </BaseColumn>
  );
}
