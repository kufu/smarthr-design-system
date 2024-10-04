import { FaChevronDownIcon } from 'smarthr-ui';
import styles from './CaretButton.module.scss';
import type { SidebarItem } from './type';

type Props = {
  currentPath: `/${string}`;
  itemLink: SidebarItem['link'];
  depth: SidebarItem['depth'];
  currentIndex: string;
};

export default function CaretButton({ currentPath, itemLink, depth, currentIndex }: Props) {
  const onClickCaret = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const clicked = event.currentTarget;
    const isOpen = clicked.getAttribute('aria-expanded') === 'true';
    const targetId = clicked.getAttribute('aria-controls');
    const targetItems = document.querySelectorAll(`[data-items-id="${targetId}"]`);

    for (const targetUl of targetItems) {
      targetUl.setAttribute('aria-hidden', isOpen ? 'true' : 'false');
    }

    clicked.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
  };

  const isExpanded = currentPath.includes(itemLink);

  return (
    <button
      className={styles.caretButton}
      aria-controls={`Depth${depth + 1}Items__${currentIndex}`}
      aria-expanded={isExpanded}
      onClick={onClickCaret}
    >
      <FaChevronDownIcon alt={isExpanded ? '閉じる' : '開く'} />
    </button>
  );
}
