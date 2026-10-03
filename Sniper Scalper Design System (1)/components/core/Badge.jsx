import React from 'react';

/** Small solid badge: level (blue "BEGINNER"), breaking (orange), tag (soft blue text). */
export function Badge({ label, variant = 'level', style }) {
  const variants = {
    level:    { background: 'var(--info-blue)', color: '#fff' },
    breaking: { background: 'var(--accent-peach)', color: 'var(--text-on-accent)' },
    tag:      { background: 'var(--bg-3)', color: 'var(--info-blue-soft)', border: '1px solid var(--border-subtle)' },
    source:   { background: 'transparent', color: 'var(--accent-peach)', border: '1px solid var(--border-accent)' },
  };
  const pill = variant === 'level';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      borderRadius: pill ? 'var(--radius-chip)' : '6px',
      padding: pill ? '8px 18px' : '6px 12px',
      fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700,
      letterSpacing: '0.1em', textTransform: 'uppercase',
      ...variants[variant], ...style,
    }}>
      {label}
    </span>
  );
}
