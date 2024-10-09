import { BaseColumn, WarningIcon } from 'smarthr-ui';

export default function Warning() {
  return (
    <BaseColumn>
      <WarningIcon
        text={
          <span>
            CompactInformationPanelは非推奨です。
            <a href="/products/components/notification-bar/#h4-0">NotificationBar[base="base"]</a>を利用してください。
          </span>
        }
      />
    </BaseColumn>
  );
}
