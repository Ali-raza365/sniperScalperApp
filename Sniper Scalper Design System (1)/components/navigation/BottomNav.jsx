import React from 'react';

const DEFAULT_ITEMS = [
  { id: 'home', icon: 'home', label: 'Home' },
  { id: 'charts', icon: 'show_chart', label: 'Charts' },
  { id: 'academy', icon: 'school', label: 'Academy' },
  { id: 'news', icon: 'article', label: 'News' },
  { id: 'settings', icon: 'settings', label: 'Settings' },
];

/** Bottom navigation, 5 destinations. Active item peach with soft pill halo behind icon. */
export function BottomNav({ items = DEFAULT_ITEMS, active = 'home', onSelect, style }) {
  return (
    <nav style={{
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      padding: '10px 8px 14px', background: 'var(--bg-1)',
      borderTop: '1px solid var(--border-subtle)', fontFamily: 'var(--font-sans)', ...style,
    }}>
      {items.map((it) => {
        const isActive = it.id === active;
        return (
          <button key={it.id} onClick={() => onSelect && onSelect(it.id)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            color: isActive ? 'var(--nav-active)' : 'var(--nav-inactive)', minWidth: 64,
          }}>
            <span style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 56, height: 32, borderRadius: 999,
              background: isActive ? 'rgba(246,177,122,0.16)' : 'transparent',
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: 24 }}>{it.icon}</span>
            </span>
            <span style={{ fontSize: 13, fontWeight: isActive ? 700 : 400 }}>{it.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
