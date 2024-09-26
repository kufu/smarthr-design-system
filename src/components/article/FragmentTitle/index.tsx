import { CSS_FONT_SIZE } from '@/constants/style';
import React, { type FC } from 'react';
import { FaLinkIcon } from 'smarthr-ui';
import styled from 'styled-components';

type Props = {
  children: React.ReactNode;
  id: string;
  tag?: HeadingTagTypes;
};

type HeadingTagTypes = 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';

export const FragmentTitle: FC<Props> = ({ tag = 'h2', id, children }) => (
  <Wrapper as={tag} id={id}>
    <a href={`#${id}`}>
      <FaLinkIcon className="icon" />
      {children}
    </a>
  </Wrapper>
);

const Wrapper = styled.div`
  position: relative;
  scroll-margin-top: 80px;

  .icon {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    left: -24px;
    visibility: hidden;
    font-size: ${CSS_FONT_SIZE.PX_16};
  }

  a {
    color: inherit;
    text-decoration: none;

    &:hover,
    &:focus {
      text-decoration: underline;

      .icon {
        visibility: visible;
      }
    }
  }
`;
