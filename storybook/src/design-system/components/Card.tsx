import React, { HTMLAttributes } from 'react';

export function Card({ className = '', style, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`ds-card ${className}`} style={{ padding: 16, ...(style || {}) }} {...rest}>
      {children}
    </div>
  );
}

export function CardHeader({ className = '', style, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={className} style={{ marginBottom: 12, ...(style || {}) }} {...rest}>
      {children}
    </div>
  );
}

export function CardFooter({ className = '', style, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={className} style={{ marginTop: 12, ...(style || {}) }} {...rest}>
      {children}
    </div>
  );
}