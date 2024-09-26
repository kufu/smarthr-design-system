import { CSS_COLOR, CSS_FONT_SIZE } from '@/constants/style';
import { type FC, useState } from 'react';
import { FaCheckIcon, FaCopyIcon } from 'smarthr-ui';
import styled from 'styled-components';

type CopyButtonProps = {
  text: string;
};

export const CopyButton: FC<CopyButtonProps> = ({ text }) => {
  const [copied, setCopied] = useState(false);
  return (
    <StyledButton
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(text).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        });
      }}
      title={`${text}をクリップボードにコピーする`}
      disabled={copied}
    >
      {copied ? <FaCheckIcon /> : <FaCopyIcon />}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  appearance: none;
  margin: 0;
  padding: 0;
  border: 0;
  color: ${CSS_COLOR.TEXT_GREY};
  background: transparent;
  cursor: pointer;
  font-size: ${CSS_FONT_SIZE.PX_20};
`;
