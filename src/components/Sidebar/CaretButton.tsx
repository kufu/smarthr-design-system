import { FaChevronDownIcon } from 'smarthr-ui';

import type { ArticleMeta } from '@/types/article';

import styles from './CaretButton.module.scss';

type Props = {
  currentPath: `/${string}`;
  itemLink: ArticleMeta['link'];
  depth: ArticleMeta['depth'];
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

  const isExpanded = currentPath === itemLink || currentPath.startsWith(`${itemLink}/`);

  return (
    <button
      className={styles.caretButton}
      type="button"
      aria-controls={`Depth${depth + 1}Items__${currentIndex}`}
      aria-expanded={isExpanded}
      onClick={onClickCaret}
    >
      <FaChevronDownIcon alt={isExpanded ? '閉じる' : '開く'} />
    </button>
  );
}
