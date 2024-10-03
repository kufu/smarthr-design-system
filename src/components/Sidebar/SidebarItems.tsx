import { Fragment } from 'react';
import { FaChevronDownIcon, Nav } from 'smarthr-ui';
import styles from './SidebarItems.module.css';

export type SidebarItem = {
  link: `/${string}`;
  order: number;
  title: string;
  depth: number;
  children: SidebarItem[];
};

type Props = {
  path: `/${string}`;
  nestedSidebarItems: SidebarItem[];
  showDepth1Item?: boolean;
};

export default function SidebarItems({ path, nestedSidebarItems, showDepth1Item = false }: Props) {
  const onClickCaret = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const clicked = event.currentTarget;
    const isOpen = clicked.getAttribute('aria-expanded') === 'true';
    const targetId = clicked.getAttribute('aria-controls');
    const targetItems = document.querySelectorAll(`[data-items-id="${targetId}"]`);

    Array.from(targetItems).forEach((targetUl) => {
      targetUl.setAttribute('aria-hidden', isOpen ? 'true' : 'false');
    });

    clicked.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
  };

  return (
    <Nav className={styles.sidebarNav}>
      {nestedSidebarItems.map((depth1Item) => (
        <Fragment key={depth1Item.link}>
          {/* 第1階層 */}
          {showDepth1Item && (
            <h2 className={styles.depth1Heading}>
              <a href={depth1Item.link} aria-current={path === depth1Item.link}>
                {depth1Item.title}
              </a>
            </h2>
          )}

          {/* 第2階層 */}
          {depth1Item.children.length > 0 && (
            <ul>
              {depth1Item.children.map((depth2Item, depth2Index) => (
                <li key={depth2Item.link}>
                  <div className={styles.depth2Item}>
                    <a href={depth2Item.link} aria-current={path === depth2Item.link}>
                      {depth2Item.title}
                    </a>
                    {depth2Item.children.length > 0 && (
                      <button
                        className={styles.caretButton}
                        aria-controls={`Depth3Items__${depth2Index}`}
                        aria-expanded={path.includes(depth2Item.link)}
                        onClick={onClickCaret}
                      >
                        <FaChevronDownIcon alt={path.includes(depth2Item.link) ? '閉じる' : '開く'} />
                      </button>
                    )}
                  </div>

                  {/* 第3階層 */}
                  {depth2Item.children.length > 0 && (
                    <ul data-items-id={`Depth3Items__${depth2Index}`} aria-hidden={!path.includes(depth2Item.link)}>
                      {depth2Item.children.map((depth3Item, depth3Index) => (
                        <li key={depth3Item.link}>
                          <div className={styles.depth3Item}>
                            <a href={depth3Item.link} aria-current={path === depth3Item.link}>
                              {depth3Item.title}
                            </a>
                            {depth3Item.children.length > 0 && (
                              <button
                                className={styles.caretButton}
                                aria-controls={`Depth4Items__${depth2Index}__${depth3Index}`}
                                aria-expanded={path.includes(depth3Item.link)}
                                onClick={onClickCaret}
                              >
                                <FaChevronDownIcon alt={path.includes(depth3Item.link) ? '閉じる' : '開く'} />
                              </button>
                            )}
                          </div>

                          {/* 第4階層 */}
                          {depth3Item.children.length > 0 && (
                            <ul
                              data-items-id={`Depth4Items__${depth2Index}__${depth3Index}`}
                              aria-hidden={!path.includes(depth3Item.link)}
                            >
                              {depth3Item.children.map((depth4Item) => (
                                <li key={depth4Item.link}>
                                  <div className={styles.depth4Item}>
                                    <a href={depth4Item.link} aria-current={path === depth4Item.link}>
                                      {depth4Item.title}
                                    </a>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </Fragment>
      ))}
    </Nav>
  );
}
