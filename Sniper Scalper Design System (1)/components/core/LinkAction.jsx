import React from 'react';

/** Uppercase peach text-action with trailing arrow: "VIEW COURSE →" / "FULL REPORT →" */
export function LinkAction({ label, arrow = true, onClick, style }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'none', border: 'none', cursor: 'pointer', padding: 0,
        fontFamily: 'var(--font-sans)', fontSize: '15px', fontWeight: 700,
        letterSpacing: '0.1em', textTransform: 'uppercase',
        color: 'var(--accent-peach)', display: 'inline-flex', alignItems: 'center', gap: '8px',
        ...style,
      }}
    >
      {label}{arrow && <span aria-hidden="true">→</span>}
    </button>
  );
}
