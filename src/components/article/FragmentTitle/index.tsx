import React, { type FC } from 'react';
import { FaLinkIcon } from 'smarthr-ui';

import styles from './index.module.css';

type HeadingTagTypes = 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';

type Props = {
  children: React.ReactNode;
  id: string;
  tag?: HeadingTagTypes;
};

export const FragmentTitle: FC<Props> = ({ tag = 'h2', id, children }) => {
  const Wrapper = tag as keyof JSX.IntrinsicElements;

  return (
    <Wrapper className={styles.wrapper} id={id}>
      <a href={`#${id}`}>
        <FaLinkIcon className={styles.icon} />
        {children}
      </a>
    </Wrapper>
  );
};
