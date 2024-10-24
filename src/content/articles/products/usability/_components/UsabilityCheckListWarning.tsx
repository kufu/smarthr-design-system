import { BaseColumn, WarningIcon } from 'smarthr-ui';

export default function UsabilityCheckListWarning() {
  return (
      <BaseColumn>
        <WarningIcon
          text={
              <span>
              コンテンツの「No.19 SmartHRの基本的な概念（用語）に合わせた命名をしているか」および「No.20
            操作の導線やアクション名が基準に沿っているか」のチェックは任意とします。（現時点では確認作業が大きくなりすぎる可能性があるため）
            </span>
        }
      />
    </BaseColumn>
  );
}
