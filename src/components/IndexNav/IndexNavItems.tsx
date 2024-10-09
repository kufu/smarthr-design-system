import type { ReactNode } from 'react';
import type { MarkdownHeading } from 'astro';
import { Nav } from 'smarthr-ui';
import styles from './IndexNavItems.module.scss';

type Props = {
  headings: MarkdownHeading[];
  indexNavRef?: React.RefObject<HTMLUListElement>;
  currentHeading?: string;
};

export default function IndexNavItems({ headings, indexNavRef, currentHeading }: Props) {
  return (
    <Nav className={styles.nav}>
      <ul ref={indexNavRef}>
        {headings.map((item, i, headings) => {
          if (item.depth !== 2) {
            return null;
          }

          const nextIndex = i + 1;
          const nextItem = headings.at(nextIndex);
          const depth3Items: ReactNode[] = [];

          if (nextItem && nextItem.depth === 3) {
            for (const subItem of headings.slice(nextIndex)) {
              if (subItem.depth !== 3) {
                break;
              }

              depth3Items.push(<Item key={subItem.slug} item={subItem} currentHeading={currentHeading} />);
            }
          }

          return (
            <Item key={item.slug} item={item} currentHeading={currentHeading}>
              {depth3Items.length > 0 && <ul>{depth3Items}</ul>}
            </Item>
          );
        })}
      </ul>
    </Nav>
  );
}

type ItemProps = {
  item: MarkdownHeading;
  currentHeading?: string;
  children?: ReactNode;
};

function Item({ item, currentHeading, children }: ItemProps) {
  return (
    <li>
      <div className={styles.depthItem}>
        <a href={`#${item.slug}`} aria-current={item.slug === currentHeading}>
          {item.text}
        </a>
      </div>
      {children}
    </li>
  );
}