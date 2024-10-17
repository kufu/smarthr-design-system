import { FaExternalLinkAltIcon } from 'smarthr-ui';

import styles from './index.module.scss';

import type { ComponentPropsWithoutRef } from 'react';

type Props = {
  href: string;
} & ComponentPropsWithoutRef<'a'>;

// NOTE:
// Astro コンポーネントだと、<slot /> で埋め込んだ文字列の前後に空白文字が追加されるため、
// それを回避するために Reactコンポーネント (JSX) で実装しています
// 詳しくは以下のIssueを参照してください
// Slots render additional character spaces · Issue #6893 · withastro/astro
// https://github.com/withastro/astro/issues/6893

export default function CustomLink({ children, href, ...props }: Props) {
  const isExternal = href.match(/^https?:\/\/(?!smarthr\.design).*?$/) !== null;

  return (
    <a
      {...props}
      className={styles.link}
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
    >
      {children}
      {isExternal && <FaExternalLinkAltIcon />}
    </a>
  );
}
