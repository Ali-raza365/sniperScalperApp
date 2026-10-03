import React from 'react';

/** Filled pill CTA — peach fill, dark uppercase tracked label. */
export function Button({ label, variant = 'primary', fullWidth = false, disabled = false, onClick, style }) {
  const base = {
    fontFamily: 'var(--font-sans)',
    fontSize: '15px',
    fontWeight: 700,
    letterSpacing: 'var(--type-label-tracking)',
    textTransform: 'uppercase',
    border: 'none',
    borderRadius: 'var(--radius-chip)',
    padding: '16px 40px',
    minHeight: 'var(--hit-min)',
    cursor: disabled ? 'default' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    width: fullWidth ? '100%' : undefined,
    transition: 'opacity var(--dur-fast) var(--ease-standard)',
  };
  const variants = {
    primary: { background: 'var(--cta-bg)', color: 'var(--cta-text)' },
    outline: { background: 'transparent', color: 'var(--accent-peach)', border: '1px solid var(--border-accent)' },
    surface: { background: 'var(--bg-3)', color: 'var(--text-primary)' },
  };
  return (
    <button
      style={{ ...base, ...variants[variant], ...style }}
      disabled={disabled}
      onClick={onClick}
      onMouseDown={(e) => { e.currentTarget.style.opacity = 0.85; }}
      onMouseUp={(e) => { e.currentTarget.style.opacity = disabled ? 0.4 : 1; }}
    >
      {label}
    </button>
  );
}
