import React, { HTMLAttributes } from 'react';

type TextVariant = 'body' | 'muted' | 'heading' | 'subheading' | 'caption';

type TextProps = HTMLAttributes<HTMLParagraphElement> & {
  as?: keyof JSX.IntrinsicElements;
  variant?: TextVariant;
};

export function Text({ as = 'p', variant = 'body', className = '', style, children, ...rest }: TextProps) {
  const Component: any = as;
  const stylesByVariant: Record<TextVariant, React.CSSProperties> = {
    body: { fontSize: 'var(--text-md)', lineHeight: 1.6 },
    muted: { fontSize: 'var(--text-md)', color: 'var(--color-text-muted)', lineHeight: 1.6 },
    heading: { fontSize: 'var(--text-2xl)', fontWeight: 700, lineHeight: 1.3 },
    subheading: { fontSize: 'var(--text-xl)', fontWeight: 600, lineHeight: 1.4 },
    caption: { fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' },
  };
  return (
    <Component className={className} style={{ margin: 0, ...(stylesByVariant[variant] || {}), ...(style || {}) }} {...rest}>
      {children}
    </Component>
  );
}