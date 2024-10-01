import { type FC, useState } from 'react';
import { FaCheckIcon, FaCopyIcon } from 'smarthr-ui';
import styles from './CopyButton.module.css';

type CopyButtonProps = {
  text: string;
};

export const CopyButton: FC<CopyButtonProps> = ({ text }) => {
  const [copied, setCopied] = useState(false);
  return (
    <button
      className={styles.button}
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
    </button>
  );
};
