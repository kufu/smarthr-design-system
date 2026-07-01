import {
  Cluster,
  FaAngleRightIcon,
  FaArrowUpIcon,
  Stack,
  StatusLabel,
  Text,
  TextLink,
  defaultBorder,
  defaultSpacing,
} from 'smarthr-ui';

import styles from './ChecklistPanel.module.scss';

export type ChecklistItemData = {
  severity: 'must' | 'should' | 'avoid';
  text: string;
  source_section: string;
  sub_items?: string[];
};

export type ChecklistGroup = {
  section: string;
  /** source_section を解決した本文見出しの id（例: 'h3-1'）。未解決ならリンクを出さない */
  sectionId?: string;
  items: ChecklistItemData[];
};

// 見出しを包む要素のタグ。'span' は見出しにせず目次・見出し階層に含めないために使う。
type HeadingTag = 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';

type Props = {
  groups: ChecklistGroup[];
  /** 見出しアンカーに使う一意な DOM id */
  id: string;
  /** 見出しに表示するコンポーネント名（例: Button） */
  title: string;
  /** 見出しの HTML タグレベル。ページの見出し階層に合わせる */
  headingTag: HeadingTag;
};

// severity の表示マッピング（StatusLabel の type と整合）
const severityConfig = {
  must: { label: 'Must', type: 'red', bold: false },
  should: { label: 'Should', type: 'blue', bold: false },
  avoid: { label: 'Avoid', type: 'grey', bold: true },
} as const;

// severity の並び順（必須 → 非推奨 → 推奨）
const severityOrder: Record<ChecklistItemData['severity'], number> = { must: 0, avoid: 1, should: 2 };

const SubList = ({ items }: { items: string[] }) => (
  <ul
    style={{
      paddingLeft: '1em',
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
    <StatusLabel type={sev.type} bold={sev.bold} style={{ minWidth: '3.5em' }}>
      <Text size="XS">{sev.label}</Text>
    </StatusLabel>
  );
};

// source_section ごとに枠線で区切ったリスト
const GroupedView = ({ groups }: { groups: ChecklistGroup[] }) => (
  <div>
    {groups.map((group, gi) => (
      <Stack key={gi} style={{ marginTop: '-1px', padding: '16px 24px', border: defaultBorder.shorthand }}>
        <Text size="S">
          <Text styleType="subSubBlockTitle">参照元：</Text>
          {group.section}
          {group.sectionId && (
            <>
              {' '}
              <TextLink href={`#${group.sectionId}`} title={`「${group.section}」の本文へ移動`} style={{ boxShadow: 'none' }}>
                <FaArrowUpIcon alt={`「${group.section}」の本文へ移動`} style={{ verticalAlign: 'text-bottom' }} />
              </TextLink>
            </>
          )}
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
              <Cluster gap={0.75} align="baseline" className={styles.severity}>
                <Badge severity={item.severity} />
                <Stack gap={0.5}>
                  <Text leading="NORMAL" style={{ overflowWrap: 'anywhere' }}>
                    {item.text}
                  </Text>
                  {item.sub_items && <SubList items={item.sub_items} />}
                </Stack>
              </Cluster>
            </li>
          ))}
        </Stack>
      </Stack>
    ))}
  </div>
);

/**
 * チェックリスト本体。開閉はネイティブ <details>/<summary> で行う（JS 不要・1 ページ複数配置でも独立）。
 * React コンポーネントだが Astro 側で client 指定なく静的に描画され、ハイドレーションは発生しない。
 */
export const ChecklistPanel = ({ groups, id, title, headingTag }: Props) => {
  // 項目は severity 順（必須 → 非推奨 → 推奨）に並べ替える
  const sortBySeverity = (target: ChecklistItemData[]) =>
    [...target].sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);
  const renderGroups: ChecklistGroup[] = groups.map((group) => ({ ...group, items: sortBySeverity(group.items) }));

  return (
    <Stack as="details" style={{ marginTop: '20px' }}>
      <summary className={styles.summary}>
        {/* 見出しは id 参照（URL ハッシュ）のアンカー。span のときも h3 と同じ見た目 */}
        <Text
          as={headingTag}
          id={id}
          weight="bold"
          icon={{
            prefix: <FaAngleRightIcon className={styles.caret} />,
          }}
          style={{
            margin: 0,
            fontSize: 'var(--font-size-26)',
            lineHeight: 1.38,
            scrollMarginTop: '80px',
          }}
        >
          {title}
        </Text>
      </summary>
      <GroupedView groups={renderGroups} />
    </Stack>
  );
};

export default ChecklistPanel;
