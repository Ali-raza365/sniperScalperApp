import React from 'react';

/** Feature tile: nested card with peach icon, tracked uppercase title, short body ("MARKET STRUCTURE"). */
export function FeatureTile({ icon, title, body, style }) {
  return (
    <div style={{
      background: 'var(--surface-card-nested)', borderRadius: 'var(--radius-card-sm)',
      padding: '22px 20px', fontFamily: 'var(--font-sans)', ...style,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
        {icon && <span className="material-symbols-outlined" style={{ fontSize: 26, color: 'var(--accent-peach)' }}>{icon}</span>}
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-primary)' }}>{title}</div>
          <div style={{ fontSize: 15, lineHeight: 1.5, color: 'var(--text-secondary)', marginTop: 8 }}>{body}</div>
        </div>
      </div>
    </div>
  );
}
