import { Suspense, lazy } from 'react';
import { Loader } from 'smarthr-ui';

import ComponentPreview from '../ComponentPreview/ComponentPreview';

import styles from './LiveContainer.module.scss';

import type { LiveContainerInternalProps } from './types';

type Props = LiveContainerInternalProps;

// react-live の scope に渡すため、実装側では smarthr-ui 全体を名前空間 import している。
// 静的に読み込むと（FileViewer 経由の pdfjs を含む）smarthr-ui 全体が全ページ共通のチャンクに入ってしまうため、
// ライブエディタを表示するときだけ読み込まれるよう動的 import する。
const LiveContainerInner = lazy(() => import('./LiveContainerInner'));

export default function LiveContainer(props: Props) {
  return (
    <Suspense
      fallback={
        <ComponentPreview background={props.background} canvas={props.canvas}>
          <div className={styles.loading}>
            <Loader size="S" alt="実行結果を読み込み中" />
          </div>
        </ComponentPreview>
      }
    >
      <LiveContainerInner {...props} />
    </Suspense>
  );
}
