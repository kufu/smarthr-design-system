import { BaseColumn, ResponseMessage } from 'smarthr-ui';

export default function Warning() {
  return (
    <BaseColumn>
      <ResponseMessage type="warning">
        Tooltipはユーザーが能動的に表示しなければならない、拡大表示時に領域外に表示されてしまうなどの課題があるため、安易な使用はお勧めしません。基本的にはTooltip以外のUIを使用することを検討してください。
      </ResponseMessage>
    </BaseColumn>
  );
}
