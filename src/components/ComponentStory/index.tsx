import clsx from 'clsx';
import { useState } from 'react';
import { AnchorButton, Cluster, FaUpRightFromSquareIcon, Loader, TabBar, TabItem, TextLink } from 'smarthr-ui';

import { SHRUI_CHROMATIC_ID, SHRUI_GITHUB_PATH } from '@/constants/application';
import { UI_COMMIT_HASH, UI_VERSION } from '@/lib/getUIData';
import type { UIStories } from '@/types/ui';

import CodeBlock from '../CodeBlock';
import ResizableContainer from '../ResizableContainer';

import styles from './index.module.scss';

export type ComponentStoryProps = {
  code: string;
  stories: UIStories;
  // MDX内でこのコンポーネントを一番上に置いたとき、アイランドの関係で :first-child でマージンを消す CSS が効かないため
  // これでマージンを消せるように
  noMargin?: boolean;
};

const STORYBOOK_BASE_URL = `https://${UI_COMMIT_HASH}--${SHRUI_CHROMATIC_ID}.chromatic.com/`;

export default function ComponentStory({ code, stories, noMargin = false }: ComponentStoryProps) {
  const [currentIframe, setCurrentIframe] = useState(stories.storyItems.at(0)?.iframeName ?? '');
  const [isLoadedIframe, setIsLoadedIframe] = useState(false);

  const getStoryName = (currentName: string) => stories.storyItems?.find((item) => item?.iframeName === currentName)?.iframeName;

  const storybookUrl = new URL(`?path=/story/${getStoryName(currentIframe)}`, STORYBOOK_BASE_URL);

  const iframeUrl = new URL(`/iframe.html`, STORYBOOK_BASE_URL);
  iframeUrl.searchParams.append('id', getStoryName(currentIframe) ?? '');

  const iframeViewModeUrl = new URL(iframeUrl);
  iframeViewModeUrl.searchParams.append('viewMode', 'story');

  // パスからstories/*.tsxを削除
  const githubSourcePath = stories.filePath.replace(/(stories\/)?[^/]*?\.tsx$/, '');
  const githubUrl = new URL(`v${UI_VERSION}/${githubSourcePath}`, SHRUI_GITHUB_PATH);

  const onClickTabItem = (itemId: string) => {
    if (itemId === currentIframe) {
      return;
    }

    setIsLoadedIframe(false);
    setCurrentIframe(itemId);
  };

  const onIframeLoaded = () => {
    setIsLoadedIframe(true);
  };

  return (
    <div className={clsx(!noMargin && styles.storyWrapper)}>
      <Cluster align="center" justify="space-between" gap={1}>
        <Cluster align="center" as="label">
          <span>SmartHR UI</span>
          <span>{UI_VERSION}</span>
        </Cluster>
        <Cluster>
          <AnchorButton
            href={storybookUrl.toString()}
            target="_blank"
            size="s"
            suffix={<FaUpRightFromSquareIcon />}
            rel="noreferrer"
          >
            Storybook
          </AnchorButton>
          <AnchorButton
            href={githubUrl.toString()}
            target="_blank"
            size="s"
            suffix={<FaUpRightFromSquareIcon />}
            rel="noreferrer"
          >
            GitHub
          </AnchorButton>
        </Cluster>
      </Cluster>

      <TabBar className={styles.tab}>
        {stories.storyItems.map(({ label, iframeName }, index: number) => (
          <TabItem id={iframeName} key={index} onClick={onClickTabItem} selected={iframeName === currentIframe}>
            {label}
          </TabItem>
        ))}
      </TabBar>

      <div className={styles.linkWrapper}>
        <TextLink href={iframeViewModeUrl.toString()} target="_blank">
          別画面で開く
        </TextLink>
      </div>

      <ResizableContainer defaultWidth="100%" defaultHeight="300px">
        {!isLoadedIframe && <Loader className={styles.storyLoader} />}
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <iframe
          className={styles.storyIframe}
          title={stories.storyItems.find((item) => item?.name === currentIframe)?.label || ''}
          src={iframeUrl.toString()}
          onLoad={onIframeLoaded}
        />
      </ResizableContainer>

      <div className={styles.codeWrapper}>
        <CodeBlock code={code} language="tsx" isStorybook />
      </div>
    </div>
  );
}
