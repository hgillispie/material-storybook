import React, { CSSProperties, HTMLAttributes } from 'react';

type Direction = 'row' | 'column' | 'row-reverse' | 'column-reverse';

type StackProps = HTMLAttributes<HTMLDivElement> & {
  direction?: Direction;
  gap?: number | string;
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  wrap?: CSSProperties['flexWrap'];
};

export function Stack({
  direction = 'row',
  gap = 12,
  align,
  justify,
  wrap,
  style,
  className = '',
  children,
  ...rest
}: StackProps) {
  return (
    <div
      className={`ds-stack ${className}`}
      style={{
        display: 'flex',
        flexDirection: direction,
        gap,
        alignItems: align,
        justifyContent: justify,
        flexWrap: wrap,
        ...(style || {}),
      }}
      {...rest}
    >
      {children}
    </div>
  );
}