import React, { useState } from 'react';

/** Material switch — orange track when on, gray-brown when off. */
export function Toggle({ checked, defaultChecked = false, onChange, style }) {
  const [internal, setInternal] = useState(defaultChecked);
  const on = checked !== undefined ? checked : internal;
  return (
    <button
      role="switch"
      aria-checked={on}
      onClick={() => { const v = !on; if (checked === undefined) setInternal(v); onChange && onChange(v); }}
      style={{
        width: 64, height: 36, borderRadius: 'var(--radius-chip)', border: 'none', padding: 0,
        cursor: 'pointer', position: 'relative',
        background: on ? 'var(--toggle-on)' : '#6b5f55',
        transition: 'background var(--dur-base) var(--ease-standard)',
        ...style,
      }}
    >
      <span style={{
        position: 'absolute', top: 3, left: on ? 31 : 3,
        width: 30, height: 30, borderRadius: '50%',
        background: on ? '#e8e6e3' : '#a89a8d',
        transition: 'left var(--dur-base) var(--ease-standard), background var(--dur-base)',
      }}></span>
    </button>
  );
}
