import React from 'react';

/** Dark pill chip with optional status dot or icon prefix: "● LIVE ENROLLMENT OPEN", "8 HOURS". */
export function Chip({ label, dot = false, icon, style }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '10px',
      background: 'var(--bg-3)', border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-chip)', padding: '10px 20px',
      fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 700,
      letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-primary)',
      ...style,
    }}>
      {dot && <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-orange)' }}></span>}
      {icon && <span className="material-symbols-outlined" style={{ fontSize: 16, color: 'var(--accent-peach)' }}>{icon}</span>}
      {label}
    </span>
  );
}
