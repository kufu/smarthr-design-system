import React, { useEffect, useRef, useState } from 'react';

type AnnotationPosition = {
  value: string;
  lineStart: { x: number; y: number };
  lineEnd: { x: number; y: number };
  labelPosition: { x: number; y: number };
  rect: { x: number; y: number; width: number; height: number };
};

// Constants
const ANNOTATION_LINE_LENGTH = 24;
const RECT_PADDING = 4;
const RECT_RADIUS = 4;
const DEBOUNCE_DELAY = 300;
const INITIAL_CALCULATION_DELAYS = [100, 300, 600, 1000];
const ANNOTATION_COLOR = 'rgba(224, 30, 90, 0.5)';

// Calculate annotation position for a single element
const calculateElementPosition = (
  element: HTMLElement,
  contentRect: DOMRect,
  paddingLeft: number,
  paddingTop: number,
): AnnotationPosition | null => {
  const annotationValue = element.getAttribute('data-annotation');
  if (!annotationValue) return null;

  const targetRect = element.getBoundingClientRect();
  const relativeX = targetRect.left - contentRect.left + paddingLeft;
  const relativeY = targetRect.top - contentRect.top + paddingTop;

  const lineStart = {
    x: relativeX - RECT_PADDING,
    y: relativeY + targetRect.height / 2,
  };
  const lineEnd = {
    x: lineStart.x - ANNOTATION_LINE_LENGTH,
    y: lineStart.y,
  };

  return {
    value: annotationValue,
    rect: {
      x: relativeX - RECT_PADDING,
      y: relativeY - RECT_PADDING,
      width: targetRect.width + RECT_PADDING * 2,
      height: targetRect.height + RECT_PADDING * 2,
    },
    lineStart,
    lineEnd,
    labelPosition: { x: lineEnd.x, y: lineEnd.y },
  };
};

export const AnnotatedComponent: React.FC<{
  canvasWidth?: number;
  className?: string;
  children: React.ReactNode;
}> = ({ canvasWidth, children, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [annotationPositions, setAnnotationPositions] = useState<AnnotationPosition[]>([]);
  const [scale, setScale] = useState(1);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const initialTimersRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    if (!containerRef.current || !wrapperRef.current || !contentRef.current) return;

    const calculatePositions = () => {
      const container = containerRef.current;
      const wrapper = wrapperRef.current;
      const content = contentRef.current;
      if (!container || !wrapper || !content) return;

      const containerWidth = wrapper.clientWidth;

      // Temporarily reset transform to measure natural size
      const originalTransform = content.style.transform;
      content.style.transform = 'scale(1)';

      const naturalWidth = content.clientWidth;
      const naturalHeight = content.clientHeight;

      // Retry if dimensions aren't ready
      if (naturalWidth === 0 || containerWidth === 0) {
        content.style.transform = originalTransform;
        setTimeout(calculatePositions, 50);
        return;
      }

      // Calculate and apply scale
      const calculatedScale = containerWidth / (canvasWidth ?? naturalWidth);
      content.style.transform = `scale(${calculatedScale})`;
      setScale(calculatedScale);

      // Measure actual scaled height
      const scaledHeight = content.getBoundingClientRect().height;

      setDimensions({
        width: (canvasWidth ?? naturalWidth) * calculatedScale,
        height: scaledHeight,
      });

      // Calculate annotation positions
      const contentRect = content.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const paddingLeft = contentRect.left - containerRect.left;
      const paddingTop = contentRect.top - containerRect.top;

      const annotatedElements = content.querySelectorAll<HTMLElement>('[data-annotation]');
      const positions: AnnotationPosition[] = [];

      annotatedElements.forEach((element) => {
        const position = calculateElementPosition(element, contentRect, paddingLeft, paddingTop);
        if (position) positions.push(position);
      });

      setAnnotationPositions(positions);
    };

    // Schedule initial calculations at multiple intervals to handle async rendering
    initialTimersRef.current = INITIAL_CALCULATION_DELAYS.map((delay) => setTimeout(calculatePositions, delay));

    // Debounced recalculation for mutations
    const debouncedCalculatePositions = () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = setTimeout(calculatePositions, DEBOUNCE_DELAY);
    };

    // Observe DOM changes
    const observer = new MutationObserver((mutations) => {
      const hasRelevantChanges = mutations.some(
        (mutation) =>
          mutation.type === 'childList' || (mutation.type === 'attributes' && mutation.target !== containerRef.current),
      );
      if (hasRelevantChanges) debouncedCalculatePositions();
    });

    if (contentRef.current) {
      observer.observe(contentRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['data-annotation'],
      });
    }

    window.addEventListener('resize', calculatePositions);

    return () => {
      initialTimersRef.current.forEach(clearTimeout);
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      observer.disconnect();
      window.removeEventListener('resize', calculatePositions);
    };
  }, [canvasWidth]);

  return (
    <div
      className={`annotated-container ${className || ''}`}
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        margin: '0',
        padding: '8px',
        paddingInline: '32px',
        borderRadius: '8px',
        boxSizing: 'border-box',
        minHeight: dimensions.height > 0 ? `${dimensions.height}px` : 'auto',
      }}
    >
      <div
        ref={wrapperRef}
        style={{
          overflow: 'hidden',
          transform: 'none',
          width: '100%',
          boxSizing: 'border-box',
          height: dimensions.height > 0 ? `${dimensions.height}px` : 'auto',
        }}
      >
        <div
          ref={contentRef}
          className="annotated-content"
          style={{
            transformOrigin: 'top left',
            display: 'inline-block',
            pointerEvents: 'none',
            boxSizing: 'border-box',
            width: canvasWidth ? `${canvasWidth}px` : '100%',
          }}
        >
          {children}
        </div>
      </div>

      <div
        className="annotated-layer"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <svg
          width="100%"
          height="100%"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            pointerEvents: 'none',
          }}
        >
          {annotationPositions.map((pos, index) => (
            <g key={index}>
              <rect
                x={pos.rect.x}
                y={pos.rect.y}
                width={pos.rect.width}
                height={pos.rect.height}
                rx={RECT_RADIUS}
                ry={RECT_RADIUS}
                fill="none"
                stroke={ANNOTATION_COLOR}
                strokeWidth="2"
              />
              <line
                x1={pos.lineStart.x}
                y1={pos.lineStart.y}
                x2={pos.lineEnd.x}
                y2={pos.lineEnd.y}
                stroke={ANNOTATION_COLOR}
                strokeWidth="2"
              />
            </g>
          ))}
        </svg>

        {annotationPositions.map((pos, index) => (
          <div
            key={index}
            className="annotated-label"
            style={{
              position: 'absolute',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              alignItems: 'center',
              left: `${pos.labelPosition.x}px`,
              top: `${pos.labelPosition.y}px`,
            }}
          >
            <div
              className="annotated-number"
              style={{
                borderRadius: '50%',
                backgroundColor: '#e01e5a',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '1rem',
                lineHeight: '1',
                flexShrink: 0,
                padding: '4px',
                minWidth: '1rem',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              }}
            >
              {pos.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
