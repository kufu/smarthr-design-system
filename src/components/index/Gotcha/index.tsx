import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import { FaArrowRotateRightIcon } from 'smarthr-ui';

import { CLOUDINARY_CLOUD_NAME } from '@/constants/application';
import gotchaItemJson from '@/data/gotchaItem.json';

import styles from './index.module.scss';

const BUTTON_TEXT: string = 'GOTCHA!'; // アニメーションするため、css、reactのどちらでも必要なのでここで

const CLOUDINARY_URL = new URL(`/${CLOUDINARY_CLOUD_NAME}/image/upload/`, 'https://res.cloudinary.com/').toString();

type GotchaItem = {
  image: string;
  title: string;
  alt: string;
  links: Array<{ text: string; url: string }>;
};

const gotchaItem = gotchaItemJson as GotchaItem[];

export default function Gotcha() {
  // ランダムな画像＋説明文の表示をするため、ビルド時と表示内容が異なる可能性があり、コンソールにエラーが出る。
  // エラー回避のためビルド時はindexを固定し、CSR時のみ実行される`useEffect`内でランダムアイテムの選択を行う。
  const [currentItemIndex, setCurrentItemIndex] = useState(-1);
  const [nextItemIndex, setNextItemIndex] = useState(-1);

  useEffect(() => {
    const initialIndex = getRandomNum(gotchaItem.length, -1);
    setCurrentItemIndex(initialIndex);
    setNextItemIndex(getRandomNum(gotchaItem.length, initialIndex));
  }, []);

  const [isAnimated, setIsAnimated] = useState(false);

  let currentImgIsReady = false;
  let nextImgIsReady = false;

  const shouldDisabled: boolean = useMemo(() => currentImgIsReady && nextImgIsReady, [currentImgIsReady, nextImgIsReady]);

  if (gotchaItem.length === 0) {
    return null;
  }

  const runGotcha = (): void => {
    //ボタンが押されたらアニメーションする
    setIsAnimated(true);
  };

  const finishAnimation = (): void => {
    setCurrentItemIndex(nextItemIndex);

    //画像の入れ替えが終わっていないとチラつくことがあるので、200ms待つ。
    setTimeout(() => {
      //アニメーション開始位置に要素を戻しておく
      setIsAnimated(false);

      //次の画像を読み込んでおく
      loadNextImage();
    }, 200);
  };

  const loadNextImage = (): void => {
    const randomNum = getRandomNum(gotchaItem.length, nextItemIndex);
    const nextImg = new Image();

    nextImg.onload = () => {
      nextImgIsReady = true;
    };

    nextImgIsReady = false;

    nextImg.srcset = createSrcSet(randomNum);
    nextImg.src = createSrc(randomNum);
    nextImg.sizes = '(min-width: 1024px) 2720px, 100vw';

    setNextItemIndex(randomNum);
  };

  const currentImgOnLoad = (): void => {
    currentImgIsReady = true;
  };

  const nextImgOnload = (): void => {
    nextImgIsReady = true;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.gotchaMain}>
        <div className={clsx(styles.imageContainer, isAnimated && styles.runAnimation)} aria-busy={isAnimated}>
          {/* 次の画像 */}
          {nextItemIndex > -1 && (
            <img
              srcSet={createSrcSet(nextItemIndex)}
              src={createSrc(nextItemIndex)}
              width="1272"
              height="352"
              sizes="(min-width: 1024px) 2720px, 100vw"
              alt={gotchaItem[nextItemIndex].alt}
              aria-hidden="true"
              onLoad={() => nextImgOnload()}
            />
          )}
          {/* 表示中の画像 */}
          {currentItemIndex > -1 && (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <img
              srcSet={createSrcSet(currentItemIndex)}
              src={createSrc(currentItemIndex)}
              sizes="(min-width: 1024px) 2720px, 100vw"
              width="1272"
              height="352"
              alt={gotchaItem[currentItemIndex].alt}
              onAnimationEnd={() => finishAnimation()}
              onLoad={() => currentImgOnLoad()}
            />
          )}
        </div>
        {/* ガチャボタン */}
        <button className={styles.gotchaButton} type="button" onClick={() => runGotcha()} disabled={shouldDisabled}>
          <FaArrowRotateRightIcon />
          <span className={styles.animatedText}>
            {Array.from(BUTTON_TEXT).map((letter, index) => (
              <span
                key={index}
                className={styles.animatedLetter}
                style={{
                  transitionDelay: `${index / 35}s`,
                }}
              >
                {letter}
              </span>
            ))}
          </span>
        </button>

        {/* 活用事例ラベル */}
        <p className={styles.label}>活用事例</p>
      </div>

      {/* 関連リンク */}
      {currentItemIndex > -1 && (
        <div className={styles.gotchaLinks}>
          <p>{gotchaItem[currentItemIndex].title}</p>
          <ul>
            {gotchaItem[currentItemIndex].links.map((link, index) => (
              <li key={index}>
                <a href={link.url}>{link.text}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/**
 * 0 ~ length未満の整数を返す
 * @param length 乱数の最大値
 * @param currentNum 前回の乱数
 * @returns 乱数
 */
function getRandomNum(length: number, currentNum: number): number {
  if (length === 0) return 0;
  if (length === 1) return 0;

  let randomNum = Math.floor(Math.random() * length); // 0 ~ length未満の整数

  // 前回と同じ番号は避ける
  while (randomNum === currentNum) {
    randomNum = getRandomNum(length, currentNum);
  }

  return randomNum;
}

/**
 * srcsetを生成する
 * @param index 画像のインデックス
 * @returns srcset
 */
function createSrcSet(index: number) {
  return `
    ${createSrc(index, '2720')} 2720w,
    ${createSrc(index, '1536')} 1536w,
    ${createSrc(index, '768')} 768w
  `;
}

/**
 * srcを生成する
 * @param index 画像のインデックス
 * @param width 画像の幅
 * @returns src
 */
function createSrc(index: number, width?: string) {
  return width
    ? `${CLOUDINARY_URL}f_auto/w_${width}/sds/${gotchaItem[index].image}`
    : `${CLOUDINARY_URL}f_auto/sds/${gotchaItem[index].image}`;
}
