import { Nav } from 'smarthr-ui';

import type { NestedHeading } from '@/lib/getNestedHeadings';

import styles from './IndexNavItems.module.scss';

import type { ReactNode } from 'react';

export type IndexNavItemsProps = {
  headings: NestedHeading[];
  indexNavRef?: React.RefObject<HTMLUListElement>;
} & Pick<ItemProps, 'currentHeadingId'>;

export default function IndexNavItems({ headings, indexNavRef, currentHeadingId }: IndexNavItemsProps) {
  const nestedNavItems = (items: NestedHeading[]) =>
    items.map((item) => (
      <Item key={item.slug} heading={item} currentHeadingId={currentHeadingId}>
        {item.children.length > 0 && <ul>{nestedNavItems(item.children)}</ul>}
      </Item>
    ));

  return (
    // eslint-disable-next-line smarthr/a11y-heading-in-sectioning-content
    <Nav className={styles.nav}>
      <ul ref={indexNavRef}>{nestedNavItems(headings)}</ul>
    </Nav>
  );
}

type ItemProps = {
  heading: NestedHeading;
  currentHeadingId?: string;
  children?: ReactNode;
};

function Item({ heading: item, currentHeadingId, children }: ItemProps) {
  return (
    <li>
      {item.text && (
        <div className={styles.depthItem}>
          <a href={`#${item.slug}`} aria-current={item.slug === currentHeadingId}>
            {item.text}
          </a>
        </div>
      )}
      {children}
    </li>
  );
}
