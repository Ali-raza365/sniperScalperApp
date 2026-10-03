import React from 'react';

/** Settings-style list row: peach Material icon, label, trailing control or chevron. Stack inside a Card; rows separated by hairlines. */
export function ListRow({ icon, label, trailing = 'chevron', onClick, divider = false, children }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 20,
        padding: '22px 24px', minHeight: 'var(--hit-min)',
        borderTop: divider ? '1px solid var(--border-subtle)' : 'none',
        cursor: onClick ? 'pointer' : 'default',
        fontFamily: 'var(--font-sans)',
      }}
    >
      {icon && <span className="material-symbols-outlined" style={{ fontSize: 26, color: 'var(--accent-peach)' }}>{icon}</span>}
      <span style={{ flex: 1, fontSize: 18, color: 'var(--text-primary)' }}>{label}</span>
      {children}
      {trailing === 'chevron' && !children && (
        <span className="material-symbols-outlined" style={{ fontSize: 22, color: 'var(--text-muted)' }}>chevron_right</span>
      )}
    </div>
  );
}
