import styles from './HitComponent.module.scss';

import type { Hit } from 'algoliasearch';

interface Categories {
  introduction: string;
  foundation: string;
  basics: string;
  products: string;
  accessibility: string;
  communication: string;
  'operational-guideline': string;
}

const categories = {
  introduction: 'はじめに',
  foundation: '基本原則',
  basics: '基本要素',
  products: 'プロダクト',
  accessibility: 'アクセシビリティ',
  communication: 'コミュニケーション',
  'operational-guideline': '運用ガイドライン',
} as Categories;

export default function HitComponent(props: { hit: Hit }) {
  const categoryKey: keyof Categories = props.hit.category;

  return (
    <div className={styles.wrapper}>
      <a href={`/${props.hit.path}`}>
        {props.hit.title}&nbsp;{categories[categoryKey] ? `|${'\u00A0'}${categories[categoryKey]}` : ''}
      </a>
      {props.hit.description && <p className={styles.paragraph}>{props.hit.description}</p>}
    </div>
  );
}
