import React from 'react';
import { Badge } from '../core/Badge.jsx';
import { LinkAction } from '../core/LinkAction.jsx';

/** News feed card: source + timestamp header, media, headline, excerpt, SAVE/SHARE/FULL REPORT footer. */
export function NewsCard({ source, timestamp, tag = '$Business', image, headline, excerpt, style }) {
  const act = { display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)', fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' };
  return (
    <div style={{ background: 'var(--surface-card)', borderRadius: 'var(--radius-card-sm)', padding: 20, fontFamily: 'var(--font-sans)', ...style }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Badge label={source} variant="source" />
        <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{timestamp}</span>
        <Badge label={tag} variant="tag" style={{ marginLeft: 'auto' }} />
      </div>
      <div style={{ position: 'relative', height: 180, background: 'var(--bg-3)', borderRadius: 'var(--radius-media)', margin: '16px 0', overflow: 'hidden' }}>
        {image
          ? <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: 13, letterSpacing: '0.1em' }}>ARTICLE IMAGE</div>}
      </div>
      <h3 style={{ margin: 0, fontSize: 21, fontWeight: 700, lineHeight: 1.3, color: 'var(--text-primary)' }}>{headline}</h3>
      {excerpt && <p style={{ margin: '10px 0 0', fontSize: 15, lineHeight: 1.55, color: 'var(--text-secondary)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{excerpt}</p>}
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: 18, paddingTop: 16, borderTop: '1px solid var(--border-subtle)' }}>
        <span style={act}><span className="material-symbols-outlined" style={{ fontSize: 18 }}>bookmark</span>Save</span>
        <span style={act}><span className="material-symbols-outlined" style={{ fontSize: 18 }}>share</span>Share</span>
        <LinkAction label="Full Report" style={{ marginLeft: 'auto', fontSize: 13 }} />
      </div>
    </div>
  );
}
