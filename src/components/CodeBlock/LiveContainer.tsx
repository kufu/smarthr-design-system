import { Suspense, lazy } from 'react';

import type { LiveContainerInternalProps } from './types';

type Props = LiveContainerInternalProps;

// react-live の scope に渡すため、実装側では smarthr-ui 全体を名前空間 import している。
// 静的に読み込むと（FileViewer 経由の pdfjs を含む）smarthr-ui 全体が全ページ共通のチャンクに入ってしまうため、
// ライブエディタを表示するときだけ読み込まれるよう動的 import する。
const LiveContainerInner = lazy(() => import('./LiveContainerInner'));

export default function LiveContainer(props: Props) {
  // TODO: fallback の見た目を用意する
  return (
    <Suspense fallback={null}>
      <LiveContainerInner {...props} />
    </Suspense>
  );
}
