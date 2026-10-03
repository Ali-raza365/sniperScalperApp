import React from 'react';
import { Badge } from '../core/Badge.jsx';
import { StatPair } from '../layout/StatPair.jsx';
import { LinkAction } from '../core/LinkAction.jsx';

/** Academy course card: media header with level badge, title with peach bar, body, stats, footer. */
export function CourseCard({ level = 'Beginner', image, title, body, lessons, duration, author, onView, style }) {
  return (
    <div style={{ background: 'var(--surface-card)', borderRadius: 'var(--radius-card)', overflow: 'hidden', fontFamily: 'var(--font-sans)', ...style }}>
      <div style={{ position: 'relative', height: 200, background: 'var(--bg-3)' }}>
        {image
          ? <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: 13, letterSpacing: '0.1em' }}>COURSE IMAGE</div>}
        <Badge label={level} variant="level" style={{ position: 'absolute', top: 16, left: 16 }} />
      </div>
      <div style={{ padding: '24px 22px' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ width: 4, height: 24, borderRadius: 2, background: 'var(--accent-peach)' }}></span>
          <h3 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: 'var(--text-primary)' }}>{title}</h3>
        </div>
        {body && <p style={{ margin: '14px 0 0', fontSize: 16, lineHeight: 1.55, color: 'var(--text-secondary)' }}>{body}</p>}
        <div style={{ display: 'flex', gap: 40, marginTop: 20 }}>
          {lessons && <StatPair icon="menu_book" label="Lessons" value={lessons} />}
          {duration && <StatPair icon="schedule" label="Duration" value={duration} />}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 20, paddingTop: 18, borderTop: '1px solid var(--border-subtle)' }}>
          <span style={{ fontSize: 16, fontWeight: 500, color: 'var(--text-primary)' }}>{author}</span>
          <LinkAction label="View Course" onClick={onView} />
        </div>
      </div>
    </div>
  );
}
