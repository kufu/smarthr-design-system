import { type ReactNode, useEffect, useRef, useState } from 'react';

export type ComponentPreviewProps = {
  background?: keyof typeof backgroundColors;
  canvas?: number;
  children: ReactNode;
};

const backgroundColors = {
  WHITE: {
    color: '#fff',
    image: undefined,
  },
  BACKGROUND: {
    color: '#f8f7f6',
    image: undefined,
  },
  DOT: {
    color: 'rgba(3,3,2,0.5)',
    image: 'radial-gradient(#23221e 1px, transparent 0)',
  },
} as const;

export default function ComponentPreview({ background = 'WHITE', canvas, children }: ComponentPreviewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!canvas) {
      return;
    }
    if (!ref.current) {
      return;
    }
    const { width } = ref.current.getBoundingClientRect();
    setScale(width / canvas);
  }, [canvas]);

  return (
    <div
      style={{
        padding: '1rem',
        marginBlockStart: '0.5em',
        border: background === 'WHITE' ? '1px solid #d6d3d0' : undefined,
        backgroundColor: backgroundColors[background].color ?? undefined,
        backgroundImage: backgroundColors[background].image,
        backgroundSize: '16px 16px',
        fontFamily: 'system-ui, sans-serif',
        // @ts-expect-error CSSObjectの型定義にCSS Variablesがないため
        '--scale': scale,
      }}
    >
      <div style={{ width: '100%', height: 'fit-content' }} ref={ref}>
        <div
          style={{
            width: canvas ? `${canvas}px` : undefined,
            zoom: canvas ? 'var(--scale)' : undefined,
            transformOrigin: 'top left',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
