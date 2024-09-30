import React, { type FC } from 'react';
import { FaExternalLinkAltIcon } from 'smarthr-ui';

import styles from './index.module.css';

type Props = {
  children: React.ReactNode;
  href: string;
};

// 外部リンクの場合に、自動的に`target="_blank"`を付与するためのコンポーネントです。

export const CustomLink: FC<Props> = ({ children, href, ...props }) => {
  const isExternal = href.match(/^https?:\/\/(?!smarthr\.design).*?$/) !== null;
  const attrs: { [key: string]: string } = isExternal
    ? Object.assign(
        { ...props },
        {
          target: '_blank',
          rel: 'noreferrer',
        },
      )
    : props;

  return attrs.target === '_blank' ? (
    <a {...attrs} className={styles.link} href={href}>
      {children}
      {isExternal && <FaExternalLinkAltIcon />}
    </a>
  ) : (
    <a {...attrs} className={styles.link} href={href}>
      {children}
    </a>
  );
};
