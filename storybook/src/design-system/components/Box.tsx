import React, { forwardRef, HTMLAttributes } from 'react';

export type BoxProps = HTMLAttributes<HTMLDivElement> & {
  as?: keyof JSX.IntrinsicElements;
};

export const Box = forwardRef<HTMLElement, BoxProps>(function Box(
  { as = 'div', className = '', style, children, ...rest },
  ref
) {
  const Component: any = as;
  return (
    <Component ref={ref as any} className={`ds-box ${className}`} style={style} {...rest}>
      {children}
    </Component>
  );
});