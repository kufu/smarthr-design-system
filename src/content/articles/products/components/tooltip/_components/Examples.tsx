import {
  Button,
  Cluster,
  FaCircleInfoIcon,
  FaCirclePlusIcon,
  FaFileIcon,
  FaUserLargeIcon,
  Text,
  TextLink,
  Tooltip,
  WarningIcon,
} from 'smarthr-ui';

export const TextAndIcon = () => (
  <Tooltip message="補足テキストがはいります。" triggerType="icon">
    <Text
      icon={{
        prefix: <FaCircleInfoIcon color="TEXT_GREY" />,
        gap: 0.25,
      }}
    >
      編集済み
    </Text>
  </Tooltip>
);

export const IconOnly = () => (
  <Cluster>
    <Tooltip message="ユーザーの名前" triggerType="icon">
      <FaUserLargeIcon color="TEXT_LINK" />
    </Tooltip>
    <Tooltip message="書類の名称" triggerType="icon">
      <FaFileIcon color="TEXT_LINK" />
    </Tooltip>
  </Cluster>
);

export const TextWithIcon = () => (
  <Cluster gap={1}>
    <Cluster align="center" gap={0.25}>
      <Text color="TEXT_BLACK">テキスト</Text>
      <Tooltip message="補足テキストがはいります。" triggerType="icon">
        <FaCircleInfoIcon color="TEXT_GREY" />
      </Tooltip>
    </Cluster>
    <Cluster align="center" gap={0.25}>
      <Text color="TEXT_BLACK" weight="bold">
        タイトル
      </Text>
      <Tooltip message="補足テキストがはいります。" triggerType="icon">
        <FaCircleInfoIcon color="TEXT_GREY" />
      </Tooltip>
    </Cluster>
  </Cluster>
);

export const StatusSupplement = () => (
  <Cluster gap={1}>
    <Cluster align="center" gap={0.25}>
      <Tooltip message="ステータスがはいります。" triggerType="icon">
        <WarningIcon color="WARNING" />
      </Tooltip>
      <TextLink href="#">警告</TextLink>
    </Cluster>
    <Cluster align="center" gap={0.25}>
      <Tooltip message="ステータスがはいります。" triggerType="icon">
        <FaCircleInfoIcon color="DANGER" />
      </Tooltip>
      <TextLink href="#">エラー</TextLink>
    </Cluster>
  </Cluster>
);

export const IconButton = () => (
  <Tooltip message="ラベルがはいります。" triggerType="icon">
    <Button>
      <FaCirclePlusIcon alt="追加" />
    </Button>
  </Tooltip>
);

export const EllipsisText = () => (
  <Tooltip message="省略されたすべてのテキストがはいります。">
    <Text color="TEXT_BLACK">テキストを省略...</Text>
  </Tooltip>
);
