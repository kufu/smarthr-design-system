import { FaLinkIcon, Sidebar } from 'smarthr-ui';

import { SEMANTIC_COLORS, type SemanticColorName, hexToRgb } from '@/constants/colorTokens';

import styles from './ColorToken.module.scss';

import type { ReactNode } from 'react';

type Props = {
  /** セマンティックトークン名。色の値は `@/constants/colorTokens` から引く */
  name: SemanticColorName;
  /** トークンの説明（MDX の本文） */
  children?: ReactNode;
};

/**
 * トークン名の見出し・色見本と、説明の本文を Sidebar で横並びにする
 *
 * Sidebar は直下の1つ目と最後の子要素にレイアウト用のクラスを付けるため、
 * Astro コンポーネントのスロット経由ではなく React から2つの子要素を直接渡している
 */
export default function ColorToken({ name, children }: Props) {
  const value = SEMANTIC_COLORS[name];
  const rgb = hexToRgb(value);

  return (
    <Sidebar gap={{ row: 1.5, column: 2 }} className={styles.wrapper}>
      <div className={styles.summary}>
        {/* data-index-nav: ページ内目次（IndexNav）に含める h4 であることを示す */}
        <h4 id={name} className={styles.title} data-index-nav>
          <a href={`#${name}`}>
            <code>{name}</code>
            <FaLinkIcon className={styles.icon} />
          </a>
        </h4>
        <span className={styles.swatch} style={{ backgroundColor: value }} />
        <span className={styles.values}>
          <span>{value}</span>
          {rgb && <span className={styles.sub}>{rgb}</span>}
        </span>
      </div>
      <div className={styles.body}>{children}</div>
    </Sidebar>
  );
}
