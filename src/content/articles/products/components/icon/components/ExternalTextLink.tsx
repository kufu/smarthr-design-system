import { FaUpRightFromSquareIcon, IntlProvider, TextLink } from 'smarthr-ui';

interface ExternalTextLinkProps {
  href: string;
  children: React.ReactNode;
}

export const ExternalTextLink = ({ href, children }: ExternalTextLinkProps) => (
  <IntlProvider locale="ja">
    <TextLink href={href} target="_blank">
      {children}
    </TextLink>
  </IntlProvider>
);
