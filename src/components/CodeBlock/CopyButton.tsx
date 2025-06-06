import { useState } from 'react';
import { FaCheckIcon, FaCopyIcon, IntlProvider } from 'smarthr-ui';

import styles from './CopyButton.module.scss';

type Props = {
  text: string;
};

export default function CopyButton({ text }: Props) {
  const [copied, setCopied] = useState(false);

  return (
    <IntlProvider locale="ja">
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
    </IntlProvider>
  );
}
