import type { ComponentPropsWithoutRef } from 'react';

export default function WrapperBase({ children, style, ...props }: ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      style={{
        marginBlockStart: '0.5em',
        border: '1px solid #d6d3d0',
        backgroundColor: '#fff',
        fontFamily: 'system-ui, sans-serif',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
