import clsx from 'clsx';
import { type ReactNode, useState } from 'react';
import { Dialog, FaBarsIcon } from 'smarthr-ui';

import styles from './MobileMenuContainer.module.scss';
import './dialog.scss';

type Props = {
  children: ReactNode;
};

export default function MobileMenuContainer({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={styles.menuContainer}>
        {/* eslint-disable-next-line smarthr/a11y-clickable-element-has-text */}
        <button
          className={styles.openButton}
          type="button"
          onClick={() => {
            setIsOpen(true);
          }}
          title="メニューを開く"
          aria-haspopup="true"
          aria-controls="panel-menu"
        >
          <FaBarsIcon />
        </button>
        {typeof window !== 'undefined' && (
          <Dialog
            className={styles.dialog}
            isOpen={isOpen}
            onPressEscape={() => {
              setIsOpen(false);
            }}
            ariaLabel="メニュー"
            id="panel-menu"
          >
            <div className={styles.contentContainer}>
              {/* eslint-disable-next-line smarthr/a11y-clickable-element-has-text */}
              <button className={styles.closeButton} type="button" title="メニューを閉じる" onClick={() => setIsOpen(false)}>
                <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_1090_7843)">
                    <path
                      d="M6.70542 25.7015C6.19286 25.189 6.23395 24.3168 6.79721 23.7536L22.4351 8.11563C22.9984 7.55238 23.8705 7.51128 24.3831 8.02385L25.0018 8.64256C25.5144 9.15513 25.4733 10.0273 24.91 10.5905L9.27208 26.2284C8.70883 26.7917 7.8367 26.8328 7.32414 26.3202L6.70542 25.7015Z"
                      fill="#23221F"
                    />
                    <path
                      d="M24.3851 25.9665C23.8725 26.479 23.0004 26.4379 22.4372 25.8747L6.79923 10.2367C6.23597 9.67347 6.19488 8.80135 6.70744 8.28878L7.32616 7.67007C7.83872 7.1575 8.71085 7.1986 9.2741 7.76185L24.912 23.3998C25.4753 23.963 25.5164 24.8352 25.0038 25.3477L24.3851 25.9665Z"
                      fill="#23221F"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1090_7843">
                      <rect width="32" height="32" fill="white" transform="translate(0 0.996094)" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
              <div className={styles.linkContainer}>{children}</div>
            </div>
          </Dialog>
        )}
      </div>
      <div className={clsx(styles.overlay, isOpen && styles.isOpen)} />
    </>
  );
}
