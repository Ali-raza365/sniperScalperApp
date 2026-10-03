import React from 'react';

/** App top bar: back arrow, tracked title (peach), optional trailing avatar/icons. */
export function TopBar({ title, tracked = true, avatar, icons = [], onBack, style }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 18, padding: '18px 20px',
      fontFamily: 'var(--font-sans)', ...style,
    }}>
      {onBack !== null && (
        <span className="material-symbols-outlined" onClick={onBack || undefined}
          style={{ fontSize: 26, color: 'var(--accent-peach)', cursor: 'pointer' }}>arrow_back</span>
      )}
      <span style={{
        flex: 1,
        fontSize: tracked ? 21 : 20, fontWeight: 700,
        letterSpacing: tracked ? '0.12em' : '0.02em', textTransform: tracked ? 'uppercase' : 'none',
        color: tracked ? 'var(--accent-peach)' : 'var(--text-primary)',
      }}>{title}</span>
      {icons.map((ic) => (
        <span key={ic} className="material-symbols-outlined" style={{ fontSize: 24, color: 'var(--text-primary)', cursor: 'pointer' }}>{ic}</span>
      ))}
      {avatar && <img src={avatar} alt="" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />}
    </div>
  );
}
