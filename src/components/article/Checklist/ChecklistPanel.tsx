import { Fragment } from 'react';
import {
  Cluster,
  DisclosureContent,
  DisclosureTrigger,
  FaAngleDownIcon,
  FaAngleRightIcon,
  Stack,
  StatusLabel,
  Table,
  Td,
  Text,
  Th,
  UnstyledButton,
  defaultBorder,
  defaultColor,
  defaultSpacing,
} from 'smarthr-ui';

export type ChecklistItemData = {
  severity: 'must' | 'should' | 'avoid';
  text: string;
  source_section: string;
  sub_items?: string[];
};

export type ChecklistGroup = {
  section: string;
  items: ChecklistItemData[];
};

type Variant = 'grouped' | 'table';
// トリガを包む要素のタグ。'span' は見出しにせず目次・見出し階層に含めないために使う。
type HeadingTag = 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';

type Props = {
  groups: ChecklistGroup[];
  variant: Variant;
  /** 見出しアンカー・Disclosure 開閉同期に使う一意な DOM id */
  id: string;
  /** トリガの見出しに表示するコンポーネント名（例: Button） */
  title: string;
  /** トリガ見出しの HTML タグレベル。ページの見出し階層に合わせる */
  headingTag: HeadingTag;
};

// severity の表示マッピング（StatusLabel の type と整合）
const severityConfig = {
  must: { label: 'Must', type: 'red', bold: false },
  should: { label: 'Should', type: 'blue', bold: false },
  avoid: { label: 'Avoid', type: 'grey', bold: true },
} as const;

// showSection=false のときの並び順（必須 → 非推奨 → 推奨）
const severityOrder: Record<ChecklistItemData['severity'], number> = { must: 0, avoid: 1, should: 2 };

const SubList = ({ items, paddingLeft }: { items: string[]; paddingLeft: string }) => (
  <ul
    style={{
      margin: `${defaultSpacing.X3S} 0 0`,
      paddingLeft,
    }}
  >
    {items.map((sub, i) => (
      <Text key={i} as="li" size="S" leading="NORMAL" color="TEXT_GREY">
        {sub}
      </Text>
    ))}
  </ul>
);

const Badge = ({ severity }: { severity: ChecklistItemData['severity'] }) => {
  const sev = severityConfig[severity];
  return (
    <StatusLabel type={sev.type} bold={sev.bold} style={{ minWidth: '3em' }}>
      <Text size="XS">{sev.label}</Text>
    </StatusLabel>
  );
};

// 案A: グループ化リスト（source_section ごとに枠線で区切る）
const GroupedView = ({ groups }: { groups: ChecklistGroup[] }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
    {groups.map((group, gi) => (
      <Stack key={gi} style={{ marginTop: '-1px', padding: '16px 24px', border: defaultBorder.shorthand }}>
        <Text styleType="subSubBlockTitle">
          参照元：
          <Text weight="normal">{group.section}</Text>
        </Text>
        <Stack
          as="ul"
          gap={0.75}
          style={{
            listStyle: 'none',
            paddingInline: 0,
          }}
        >
          {group.items.map((item, ii) => (
            <li key={ii}>
              <Cluster gap={0.75} align="baseline" style={{ flexWrap: 'nowrap' }}>
                <Badge severity={item.severity} />
                <Text leading="NORMAL">{item.text}</Text>
              </Cluster>
              {item.sub_items && <SubList items={item.sub_items} paddingLeft="5.5em" />}
            </li>
          ))}
        </Stack>
      </Stack>
    ))}
  </div>
);

// 案B: テーブル（source_section は colspan の見出し行）
const TableView = ({ groups }: { groups: ChecklistGroup[] }) => (
  <Table borderType="outer" style={{ marginBlockStart: 0 }}>
    <thead>
      <tr>
        <Th style={{ whiteSpace: 'nowrap' }}>区分</Th>
        <Th>チェック項目</Th>
      </tr>
    </thead>
    <tbody>
      {groups.map((group, gi) => (
        <Fragment key={gi}>
          <tr>
            <Th
              colSpan={2}
              style={{
                padding: '8px 16px',
                height: 'auto',
                backgroundColor: defaultColor.OVER_BACKGROUND,
                textAlign: 'left',
              }}
            >
              <Text whiteSpace="normal">{group.section}</Text>
            </Th>
          </tr>
          {group.items.map((item, ii) => (
            <tr key={ii}>
              <Td contentWidth={{ min: '1em' }}>
                <Badge severity={item.severity} />
              </Td>
              <Td>
                {item.text}
                {item.sub_items && <SubList items={item.sub_items} paddingLeft="1.25em" />}
              </Td>
            </tr>
          ))}
        </Fragment>
      ))}
    </tbody>
  </Table>
);

// 開閉に JS が必要なため、ツリー全体を 1 つの React アイランドとして描画する。
export const ChecklistPanel = ({ groups, variant, id, title, headingTag }: Props) => {
  // 見出しは id 参照（URL ハッシュ）のアンカー、Disclosure は別 id で開閉状態を同期する
  const contentId = `${id}-content`;

  // 項目は severity 順（必須 → 非推奨 → 推奨）に並べ替える。
  // showSection=true: セクションごとに並べ替え / showSection=false: source_section でまとめず全体を 1 グループにして並べ替え
  const sortBySeverity = (target: ChecklistItemData[]) =>
    [...target].sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);
  const renderGroups: ChecklistGroup[] = groups.map((group) => ({ ...group, items: sortBySeverity(group.items) }));

  return (
    <Stack>
      <DisclosureTrigger targetId={contentId}>
        {({ expanded }) => (
          // span のときも h3 と同じ見た目
          <Text
            id={id}
            as={headingTag}
            style={{
              display: 'block',
              fontSize: 'var(--font-size-26)',
              lineHeight: 1.38,
              marginBlock: '20px 0',
              scrollMarginTop: '80px',
            }}
          >
            {/* focus-visible は UnstyledButton が内蔵。幅いっぱいを押せるよう block + 100% にする */}
            <UnstyledButton style={{ display: 'block' }}>
              <Text
                leading="TIGHT"
                weight="bold"
                icon={{
                  prefix: expanded ? <FaAngleDownIcon /> : <FaAngleRightIcon />,
                }}
              >
                {title}
              </Text>
            </UnstyledButton>
          </Text>
        )}
      </DisclosureTrigger>
      <DisclosureContent id={contentId} visuallyHidden>
        {variant === 'grouped' ? <GroupedView groups={renderGroups} /> : <TableView groups={renderGroups} />}
      </DisclosureContent>
    </Stack>
  );
};

export default ChecklistPanel;
