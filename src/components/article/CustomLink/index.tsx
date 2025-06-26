import { TextLink } from 'smarthr-ui';

import type { ComponentPropsWithoutRef } from 'react';

type Props = {
  href: string;
} & ComponentPropsWithoutRef<typeof TextLink>;

// NOTE:
// Astro コンポーネントだと改行による空白文字が削除されず <slot /> (children) の前後に空白文字が入るため、
// それを回避する目的で Reactコンポーネント (JSX) で実装しています
// 詳しくは以下のIssueを参照してください
// Slots render additional character spaces · Issue #6893 · withastro/astro
// https://github.com/withastro/astro/issues/6893

export default function CustomLink({ children, href, ...rest }: Props) {
  const isExternal = href.match(/^https?:\/\/(?!smarthr\.design).*?$/) !== null;

  return (
    <TextLink {...rest} href={href} target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noreferrer' : undefined}>
      {children}
    </TextLink>
  );
}
