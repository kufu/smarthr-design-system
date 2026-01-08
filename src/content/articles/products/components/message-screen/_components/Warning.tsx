import { BaseColumn, ResponseMessage, Text } from 'smarthr-ui';

export default function Warning() {
  return (
    <BaseColumn>
      <ResponseMessage type="warning">
        <Text>
          MessageScreenコンポーネントは非推奨です。<a href="/products/components/error-screen/">ErrorScreen</a>
          コンポーネントを使用してください。
        </Text>
      </ResponseMessage>
    </BaseColumn>
  );
}
