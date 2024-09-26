// CustomLink
import React, { type FC } from 'react';
import { FaExternalLinkAltIcon } from 'smarthr-ui';
import styled from 'styled-components';

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
    <StyledLink {...attrs} href={href}>
      {children}
      {isExternal && <FaExternalLinkAltIcon />}
    </StyledLink>
  ) : (
    <a {...attrs} href={href}>
      {children}
    </a>
  );
};

const StyledLink = styled.a`
  svg {
    margin-inline: 0.25em;
  }
`;
