import React from 'react';

/** Meta stat: peach icon + muted uppercase label over strong value ("LESSONS / 12 Modules"). */
export function StatPair({ icon, label, value, style }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontFamily: 'var(--font-sans)', ...style }}>
      {icon && <span className="material-symbols-outlined" style={{ fontSize: 26, color: 'var(--accent-peach)' }}>{icon}</span>}
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{label}</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginTop: 2 }}>{value}</div>
      </div>
    </div>
  );
}
