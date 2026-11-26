import { useState } from 'react';
import { FaCheckIcon, FaCopyIcon } from 'smarthr-ui';

import styles from './CopyButton.module.scss';

type Props = {
  text: string;
};

export default function CopyButton({ text }: Props) {
  const [copied, setCopied] = useState(false);
  const label = copied ? 'コピーしました' : 'コードをコピー';

  return (
    // disabled にするとフォーカスが外れるので使わず、コピー済みの間のクリックは onClick で無視する
    <button
      className={styles.button}
      type="button"
      onClick={() => {
        if (copied) return;
        navigator.clipboard.writeText(text).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        });
      }}
      aria-label={label}
      title={label}
    >
      {copied ? <FaCheckIcon /> : <FaCopyIcon />}
    </button>
  );
}
