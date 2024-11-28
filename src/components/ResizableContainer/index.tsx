import React, { useEffect, useRef, useState } from 'react';
import { FaGripLinesIcon, FaGripLinesVerticalIcon } from 'smarthr-ui';
import styled from 'styled-components';

import { CSS_COLOR } from '@/constants/style';

type Props = {
  defaultWidth?: string;
  defaultHeight?: string;
  children: React.ReactNode;
};

export default function ResizableContainer({ defaultWidth, defaultHeight, children }: Props) {
  const [pointerPosition, setPointerPosition] = useState<{ x: number | null; y: number | null }>({ x: null, y: null });
  const pointerPositionRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });
  pointerPositionRef.current = pointerPosition;

  const [boxSize, setBoxSize] = useState<{ width: number | null; height: number | null }>({ width: null, height: null });
  const boxSizeRef = useRef<{ width: number | null; height: number | null }>({ width: null, height: null });
  boxSizeRef.current = boxSize;

  const container = useRef<HTMLDivElement>(null);

  const handleVerticalPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    setPointerPosition({ x: event.clientX, y: null });
    if (typeof window !== 'undefined') {
      document.addEventListener('pointermove', handlePointerMove, false);
      document.addEventListener('pointerup', handlePointerUp, false);
    }
  };

  const handleHorizontalPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    setPointerPosition({ x: null, y: event.clientY });
    if (typeof window !== 'undefined') {
      document.addEventListener('pointermove', handlePointerMove, false);
      document.addEventListener('pointerup', handlePointerUp, false);
    }
  };

  const handlePointerUp = () => {
    setPointerPosition({ x: null, y: null });
    if (typeof window !== 'undefined') {
      document.removeEventListener('pointermove', handlePointerMove, false);
      document.removeEventListener('pointerup', handlePointerUp, false);
    }

    // コンテナ幅 - 20pxまで近づいていたらコンテナと同じ幅に吸着させる
    if (container.current === null || boxSizeRef.current.width === null) return;
    if (container.current.offsetWidth - boxSizeRef.current.width < 20) {
      setBoxSize({ width: container.current.offsetWidth, height: boxSizeRef.current.height });
    }
  };

  const handlePointerMove = (event: PointerEvent) => {
    if (container.current === null) return;
    //幅変更の場合
    if (pointerPositionRef.current.x !== null) {
      const containerWidth = container.current.offsetWidth;
      const newWidth = (boxSizeRef.current.width || containerWidth) - (pointerPositionRef.current.x - event.clientX);
      if (containerWidth < newWidth) return;
      setPointerPosition({ x: event.clientX, y: null });
      setBoxSize({ width: newWidth, height: boxSizeRef.current.height });
    }

    //高さ変更の場合
    if (pointerPositionRef.current.y !== null) {
      const containerHeight = container.current.offsetHeight;
      const newHeight = (boxSizeRef.current.height || containerHeight) - (pointerPositionRef.current.y - event.clientY);
      setPointerPosition({ x: null, y: event.clientY });
      setBoxSize({ width: boxSizeRef.current.width, height: newHeight });
    }
  };

  const handleWindowResize = () => {
    if (container.current === null || boxSizeRef.current.width === null) return;

    //中身の横幅がコンテナより長くなった場合は、デフォルトに戻す
    if (boxSizeRef.current.width !== null && container.current.offsetWidth < boxSizeRef.current.width) {
      setBoxSize({ width: null, height: boxSizeRef.current.height });
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleWindowResize);
    }

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <Container ref={container}>
      <ResizeArea
        style={{
          width: boxSize.width === null ? defaultWidth || '100%' : `${boxSize.width}px`,
          height: boxSize.height === null ? defaultHeight || '300px' : `${boxSize.height}px`,
        }}
        // ドラッグ中かどうかのフラグ。中身のiframeに`pointer-events: none`を追加しないとマウスイベントが取れなくなるため。
        data-resizing={pointerPosition.x || pointerPosition.y ? 'true' : 'false'}
      >
        {children}
        <VerticalResizeHandler onPointerDown={handleVerticalPointerDown}>
          <FaGripLinesVerticalIcon alt="ドラッグして幅を変更" />
        </VerticalResizeHandler>
        <HorizontalResizeHandler onPointerDown={handleHorizontalPointerDown}>
          <FaGripLinesIcon alt="ドラッグして高さを変更" />
        </HorizontalResizeHandler>
      </ResizeArea>
    </Container>
  );
}

const Container = styled.div`
  user-select: none;
`;

const ResizeArea = styled.div`
  position: relative;
  max-width: 100%;
  margin-block: 8px 0;
  padding: 0 16px 16px 0;
  border: solid 1px ${CSS_COLOR.LIGHT_GREY_1};
  border-bottom: 0;
  box-sizing: border-box;
  overflow: hidden;
  &[data-resizing='true'] {
    iframe {
      pointer-events: none;
    }
  }
`;

const VerticalResizeHandler = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 16px;
  height: 100%;
  top: 0;
  right: 0;
  background: ${CSS_COLOR.LIGHT_GREY_1};
  color: ${CSS_COLOR.TEXT_GREY};
  cursor: col-resize;
`;

const HorizontalResizeHandler = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 16px;
  bottom: 0;
  left: 0;
  background: ${CSS_COLOR.LIGHT_GREY_1};
  color: ${CSS_COLOR.TEXT_GREY};
  cursor: row-resize;
`;
