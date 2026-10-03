import React from 'react';

/** Section eyebrow: 4px accent bar + tracked uppercase label. */
export function SectionHeader({ label, color = 'peach', size = 'sm', style }) {
  const colors = { peach: 'var(--accent-peach)', blue: 'var(--info-blue-soft)', muted: 'var(--text-secondary)' };
  const textColors = { peach: 'var(--text-primary)', blue: 'var(--info-blue-soft)', muted: 'var(--text-secondary)' };
  const big = size === 'lg';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, ...style }}>
      <span style={{ width: 4, height: big ? 24 : 18, borderRadius: 2, background: colors[color] }}></span>
      <span style={{
        fontFamily: 'var(--font-sans)', fontWeight: 700, textTransform: 'uppercase',
        fontSize: big ? 22 : 14, letterSpacing: big ? '0.06em' : '0.18em',
        color: textColors[color],
      }}>{label}</span>
    </div>
  );
}
