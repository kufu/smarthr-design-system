import styles from './TypeTag.module.css';

const TYPE_COLOR = {
  string: '#1376a0',
  number: '#378445',
  boolean: '#a53f3f',
  literal: '#6e4ca6',
  func: '#76533e',
  other: '#4e4c49',
} as const;

const pickType = (typeValue: string): keyof typeof TYPE_COLOR => {
  if (typeValue === 'string') return 'string';
  if (typeValue === 'number') return 'number';
  if (typeValue === 'true' || typeValue === 'false') return 'boolean';
  if (/^".*"$/g.test(typeValue)) return 'literal';
  if (/^\(.*\)\s*=>\s*.+$/g.test(typeValue)) return 'func'; // 予約語を避けるため、これのみ省略
  return 'other';
};

const pickTypeColor = (value: string): string => TYPE_COLOR[pickType(value)];

type Props = {
  content: string;
};

export default function TypeTag({ content }: Props) {
  return (
    <span
      className={styles.typeTag}
      style={{
        backgroundColor: pickTypeColor(content),
      }}
    >
      {content}
    </span>
  );
}
