import React from 'react';

/** Surface card — 24px (lg) or 16px (sm) radius raised dark surface. */
export function Card({ children, size = 'lg', nested = false, style }) {
  return (
    <div style={{
      background: nested ? 'var(--surface-card-nested)' : 'var(--surface-card)',
      borderRadius: size === 'lg' ? 'var(--radius-card)' : 'var(--radius-card-sm)',
      overflow: 'hidden',
      ...style,
    }}>
      {children}
    </div>
  );
}
