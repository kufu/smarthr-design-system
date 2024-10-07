import { useEffect, useRef, useState } from 'react';
import type { MarkdownHeading } from 'astro';
import { AccordionPanel, AccordionPanelContent, AccordionPanelItem, AccordionPanelTrigger } from 'smarthr-ui';
import { throttle } from '@/lib/throttle';
import styles from './index.module.scss';
import IndexNavItems from './IndexNavItems';

type Props = {
  targetId: string;
  headings: MarkdownHeading[];
  ignoreH3Nav?: boolean;
};

export default function IndexNav({ targetId, headings, ignoreH3Nav = false }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const indexNavRef = useRef<HTMLUListElement>(null);
  const [currentHeading, setCurrentHeading] = useState<string>('');

  useEffect(() => {
    // スクロール時に現在地を示すための処理
    const handleScroll = throttle(() => {
      const target = document.getElementById(targetId);
      if (!target) return;

      const headingList = Array.from(target.querySelectorAll('h2, h3')).filter(
        (element) => !(element.tagName === 'H3' && ignoreH3Nav),
      );

      const _currentHeading = headingList.find((element, index) => {
        const elementTop = element.getBoundingClientRect().top;
        const nextItemTop = headingList[index + 1]?.getBoundingClientRect().top;
        // 200pxより上にあり、かつ次の見出しがが200pxより下にあるものを現在地とする
        //（最後の見出しの場合は、200pxより上にあれば現在地とする）
        return elementTop < 200 && (nextItemTop === undefined || nextItemTop > 200);
      });

      setCurrentHeading(_currentHeading?.getAttribute('id') || '');
    }, 200);
    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [targetId, ignoreH3Nav]);

  useEffect(() => {
    // 現在地が移動した際、その見出しが表示範囲内に入るようにスクロールする処理
    const currentItem = indexNavRef.current?.querySelector(`a[aria-current="true"]`);
    const wrapperElement = wrapperRef.current;
    if (!(currentItem instanceof HTMLElement) || !wrapperElement) return;

    // 表示されている範囲の上端・下端の取得
    const navAreaTop = wrapperElement.scrollTop;
    const navAreaBottom = navAreaTop + wrapperElement.clientHeight;
    // 表示範囲に入っていれば何もしない
    if (currentItem.offsetTop > navAreaTop && currentItem.offsetTop < navAreaBottom) return;

    // 現在地が表示範囲の中央に来るようにスクロールする
    wrapperElement.scrollTop = currentItem.offsetTop - wrapperElement.clientHeight / 2;
  }, [currentHeading, indexNavRef]);

  return (
    <>
      {/* PC表示 */}
      <div className={styles.navWrapper} ref={wrapperRef}>
        <IndexNavItems headings={headings} indexNavRef={indexNavRef} currentHeading={currentHeading} />
      </div>

      {/* SP表示 */}
      {headings.length > 0 && (
        <div className={styles.spWrapper}>
          <AccordionPanel iconPosition="right">
            <AccordionPanelItem name="spIndexNav">
              <AccordionPanelTrigger>ページ内目次</AccordionPanelTrigger>
              <AccordionPanelContent>
                <IndexNavItems headings={headings} currentHeading={currentHeading} />
              </AccordionPanelContent>
            </AccordionPanelItem>
          </AccordionPanel>
        </div>
      )}
    </>
  );
}
