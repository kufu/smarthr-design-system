import { IntlProvider, NotFoundErrorScreen } from 'smarthr-ui';

type Props = {
  homeUrl: string;
};

/**
 * NotFoundErrorScreen は react-intl コンテキストが必要なため、サイト全体の Layout 外でも使えるよう包む。
 */
export default function NotFoundPage({ homeUrl }: Props) {
  return (
    <IntlProvider locale="ja">
      <NotFoundErrorScreen homeUrl={homeUrl} />
    </IntlProvider>
  );
}
