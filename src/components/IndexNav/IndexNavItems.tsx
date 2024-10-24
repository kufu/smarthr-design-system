import { Nav } from 'smarthr-ui';

import type { NestedHeading } from '@/lib/getNestedHeadings';

import styles from './IndexNavItems.module.scss';

import type { ReactNode } from 'react';

type Props = {
  nestedHeadings: NestedHeading[];
  indexNavRef?: React.RefObject<HTMLUListElement>;
  currentHeading?: string;
};

export default function IndexNavItems({ nestedHeadings, indexNavRef, currentHeading }: Props) {
  const nestedNavItems = (items: NestedHeading[]) =>
    items.map((item) => (
      <Item key={item.slug} item={item} currentHeading={currentHeading}>
        {item.children.length > 0 && <ul>{nestedNavItems(item.children)}</ul>}
      </Item>
    ));

  return (
    // eslint-disable-next-line smarthr/a11y-heading-in-sectioning-content
    <Nav className={styles.nav}>
      <ul ref={indexNavRef}>{nestedNavItems(nestedHeadings)}</ul>
    </Nav>
  );
}

type ItemProps = {
  item: NestedHeading;
  currentHeading?: string;
  children?: ReactNode;
};

function Item({ item, currentHeading, children }: ItemProps) {
  return (
    <li>
      {item.text && (
        <div className={styles.depthItem}>
          <a href={`#${item.slug}`} aria-current={item.slug === currentHeading}>
            {item.text}
          </a>
        </div>
      )}
      {children}
    </li>
  );
}
