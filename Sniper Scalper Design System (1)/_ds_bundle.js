/* @ds-bundle: {"format":4,"namespace":"SniperScalperDesignSystem_1bcd68","components":[{"name":"CourseCard","sourcePath":"components/content/CourseCard.jsx"},{"name":"NewsCard","sourcePath":"components/content/NewsCard.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Chip","sourcePath":"components/core/Chip.jsx"},{"name":"LinkAction","sourcePath":"components/core/LinkAction.jsx"},{"name":"SectionHeader","sourcePath":"components/core/SectionHeader.jsx"},{"name":"Toggle","sourcePath":"components/core/Toggle.jsx"},{"name":"Card","sourcePath":"components/layout/Card.jsx"},{"name":"FeatureTile","sourcePath":"components/layout/FeatureTile.jsx"},{"name":"ListRow","sourcePath":"components/layout/ListRow.jsx"},{"name":"StatPair","sourcePath":"components/layout/StatPair.jsx"},{"name":"BottomNav","sourcePath":"components/navigation/BottomNav.jsx"},{"name":"TopBar","sourcePath":"components/navigation/TopBar.jsx"}],"sourceHashes":{"components/content/CourseCard.jsx":"e71e15dd17c9","components/content/NewsCard.jsx":"f4799f057816","components/core/Badge.jsx":"1cf4ece401d6","components/core/Button.jsx":"c6f21265c0a1","components/core/Chip.jsx":"944b404c4d5a","components/core/LinkAction.jsx":"fdb540a021d3","components/core/SectionHeader.jsx":"a14f50ab7a47","components/core/Toggle.jsx":"b0b8805f1354","components/layout/Card.jsx":"d119ebee3bdd","components/layout/FeatureTile.jsx":"243504e4fe87","components/layout/ListRow.jsx":"7c81a10c310a","components/layout/StatPair.jsx":"5d97462bd99c","components/navigation/BottomNav.jsx":"ccc709e6a885","components/navigation/TopBar.jsx":"5679197319e0","ui_kits/sniper-scalper-app/screens.jsx":"ff5f5038ba83"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.SniperScalperDesignSystem_1bcd68 = window.SniperScalperDesignSystem_1bcd68 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
/** Small solid badge: level (blue "BEGINNER"), breaking (orange), tag (soft blue text). */
function Badge({
  label,
  variant = 'level',
  style
}) {
  const variants = {
    level: {
      background: 'var(--info-blue)',
      color: '#fff'
    },
    breaking: {
      background: 'var(--accent-peach)',
      color: 'var(--text-on-accent)'
    },
    tag: {
      background: 'var(--bg-3)',
      color: 'var(--info-blue-soft)',
      border: '1px solid var(--border-subtle)'
    },
    source: {
      background: 'transparent',
      color: 'var(--accent-peach)',
      border: '1px solid var(--border-accent)'
    }
  };
  const pill = variant === 'level';
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      borderRadius: pill ? 'var(--radius-chip)' : '6px',
      padding: pill ? '8px 18px' : '6px 12px',
      fontFamily: 'var(--font-sans)',
      fontSize: '12px',
      fontWeight: 700,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      ...variants[variant],
      ...style
    }
  }, label);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
/** Filled pill CTA — peach fill, dark uppercase tracked label. */
function Button({
  label,
  variant = 'primary',
  fullWidth = false,
  disabled = false,
  onClick,
  style
}) {
  const base = {
    fontFamily: 'var(--font-sans)',
    fontSize: '15px',
    fontWeight: 700,
    letterSpacing: 'var(--type-label-tracking)',
    textTransform: 'uppercase',
    border: 'none',
    borderRadius: 'var(--radius-chip)',
    padding: '16px 40px',
    minHeight: 'var(--hit-min)',
    cursor: disabled ? 'default' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    width: fullWidth ? '100%' : undefined,
    transition: 'opacity var(--dur-fast) var(--ease-standard)'
  };
  const variants = {
    primary: {
      background: 'var(--cta-bg)',
      color: 'var(--cta-text)'
    },
    outline: {
      background: 'transparent',
      color: 'var(--accent-peach)',
      border: '1px solid var(--border-accent)'
    },
    surface: {
      background: 'var(--bg-3)',
      color: 'var(--text-primary)'
    }
  };
  return /*#__PURE__*/React.createElement("button", {
    style: {
      ...base,
      ...variants[variant],
      ...style
    },
    disabled: disabled,
    onClick: onClick,
    onMouseDown: e => {
      e.currentTarget.style.opacity = 0.85;
    },
    onMouseUp: e => {
      e.currentTarget.style.opacity = disabled ? 0.4 : 1;
    }
  }, label);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Chip.jsx
try { (() => {
/** Dark pill chip with optional status dot or icon prefix: "● LIVE ENROLLMENT OPEN", "8 HOURS". */
function Chip({
  label,
  dot = false,
  icon,
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      background: 'var(--bg-3)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-chip)',
      padding: '10px 20px',
      fontFamily: 'var(--font-sans)',
      fontSize: '13px',
      fontWeight: 700,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--text-primary)',
      ...style
    }
  }, dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: 'var(--accent-orange)'
    }
  }), icon && /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined",
    style: {
      fontSize: 16,
      color: 'var(--accent-peach)'
    }
  }, icon), label);
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Chip.jsx", error: String((e && e.message) || e) }); }

// components/core/LinkAction.jsx
try { (() => {
/** Uppercase peach text-action with trailing arrow: "VIEW COURSE →" / "FULL REPORT →" */
function LinkAction({
  label,
  arrow = true,
  onClick,
  style
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 0,
      fontFamily: 'var(--font-sans)',
      fontSize: '15px',
      fontWeight: 700,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--accent-peach)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      ...style
    }
  }, label, arrow && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\u2192"));
}
Object.assign(__ds_scope, { LinkAction });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/LinkAction.jsx", error: String((e && e.message) || e) }); }

// components/content/NewsCard.jsx
try { (() => {
/** News feed card: source + timestamp header, media, headline, excerpt, SAVE/SHARE/FULL REPORT footer. */
function NewsCard({
  source,
  timestamp,
  tag = '$Business',
  image,
  headline,
  excerpt,
  style
}) {
  const act = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    color: 'var(--text-secondary)',
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    cursor: 'pointer'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-card-sm)',
      padding: 20,
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    label: source,
    variant: "source"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, timestamp), /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    label: tag,
    variant: "tag",
    style: {
      marginLeft: 'auto'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 180,
      background: 'var(--bg-3)',
      borderRadius: 'var(--radius-media)',
      margin: '16px 0',
      overflow: 'hidden'
    }
  }, image ? /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-muted)',
      fontSize: 13,
      letterSpacing: '0.1em'
    }
  }, "ARTICLE IMAGE")), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 21,
      fontWeight: 700,
      lineHeight: 1.3,
      color: 'var(--text-primary)'
    }
  }, headline), excerpt && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '10px 0 0',
      fontSize: 15,
      lineHeight: 1.55,
      color: 'var(--text-secondary)',
      display: '-webkit-box',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    }
  }, excerpt), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 24,
      marginTop: 18,
      paddingTop: 16,
      borderTop: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: act
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined",
    style: {
      fontSize: 18
    }
  }, "bookmark"), "Save"), /*#__PURE__*/React.createElement("span", {
    style: act
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined",
    style: {
      fontSize: 18
    }
  }, "share"), "Share"), /*#__PURE__*/React.createElement(__ds_scope.LinkAction, {
    label: "Full Report",
    style: {
      marginLeft: 'auto',
      fontSize: 13
    }
  })));
}
Object.assign(__ds_scope, { NewsCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/NewsCard.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionHeader.jsx
try { (() => {
/** Section eyebrow: 4px accent bar + tracked uppercase label. */
function SectionHeader({
  label,
  color = 'peach',
  size = 'sm',
  style
}) {
  const colors = {
    peach: 'var(--accent-peach)',
    blue: 'var(--info-blue-soft)',
    muted: 'var(--text-secondary)'
  };
  const textColors = {
    peach: 'var(--text-primary)',
    blue: 'var(--info-blue-soft)',
    muted: 'var(--text-secondary)'
  };
  const big = size === 'lg';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 4,
      height: big ? 24 : 18,
      borderRadius: 2,
      background: colors[color]
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 700,
      textTransform: 'uppercase',
      fontSize: big ? 22 : 14,
      letterSpacing: big ? '0.06em' : '0.18em',
      color: textColors[color]
    }
  }, label));
}
Object.assign(__ds_scope, { SectionHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionHeader.jsx", error: String((e && e.message) || e) }); }

// components/core/Toggle.jsx
try { (() => {
const {
  useState
} = React;
/** Material switch — orange track when on, gray-brown when off. */
function Toggle({
  checked,
  defaultChecked = false,
  onChange,
  style
}) {
  const [internal, setInternal] = useState(defaultChecked);
  const on = checked !== undefined ? checked : internal;
  return /*#__PURE__*/React.createElement("button", {
    role: "switch",
    "aria-checked": on,
    onClick: () => {
      const v = !on;
      if (checked === undefined) setInternal(v);
      onChange && onChange(v);
    },
    style: {
      width: 64,
      height: 36,
      borderRadius: 'var(--radius-chip)',
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      position: 'relative',
      background: on ? 'var(--toggle-on)' : '#6b5f55',
      transition: 'background var(--dur-base) var(--ease-standard)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 3,
      left: on ? 31 : 3,
      width: 30,
      height: 30,
      borderRadius: '50%',
      background: on ? '#e8e6e3' : '#a89a8d',
      transition: 'left var(--dur-base) var(--ease-standard), background var(--dur-base)'
    }
  }));
}
Object.assign(__ds_scope, { Toggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Toggle.jsx", error: String((e && e.message) || e) }); }

// components/layout/Card.jsx
try { (() => {
/** Surface card — 24px (lg) or 16px (sm) radius raised dark surface. */
function Card({
  children,
  size = 'lg',
  nested = false,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: nested ? 'var(--surface-card-nested)' : 'var(--surface-card)',
      borderRadius: size === 'lg' ? 'var(--radius-card)' : 'var(--radius-card-sm)',
      overflow: 'hidden',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Card.jsx", error: String((e && e.message) || e) }); }

// components/layout/FeatureTile.jsx
try { (() => {
/** Feature tile: nested card with peach icon, tracked uppercase title, short body ("MARKET STRUCTURE"). */
function FeatureTile({
  icon,
  title,
  body,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card-nested)',
      borderRadius: 'var(--radius-card-sm)',
      padding: '22px 20px',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 14
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined",
    style: {
      fontSize: 26,
      color: 'var(--accent-peach)'
    }
  }, icon), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--text-primary)'
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      lineHeight: 1.5,
      color: 'var(--text-secondary)',
      marginTop: 8
    }
  }, body))));
}
Object.assign(__ds_scope, { FeatureTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/FeatureTile.jsx", error: String((e && e.message) || e) }); }

// components/layout/ListRow.jsx
try { (() => {
/** Settings-style list row: peach Material icon, label, trailing control or chevron. Stack inside a Card; rows separated by hairlines. */
function ListRow({
  icon,
  label,
  trailing = 'chevron',
  onClick,
  divider = false,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      padding: '22px 24px',
      minHeight: 'var(--hit-min)',
      borderTop: divider ? '1px solid var(--border-subtle)' : 'none',
      cursor: onClick ? 'pointer' : 'default',
      fontFamily: 'var(--font-sans)'
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined",
    style: {
      fontSize: 26,
      color: 'var(--accent-peach)'
    }
  }, icon), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 18,
      color: 'var(--text-primary)'
    }
  }, label), children, trailing === 'chevron' && !children && /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined",
    style: {
      fontSize: 22,
      color: 'var(--text-muted)'
    }
  }, "chevron_right"));
}
Object.assign(__ds_scope, { ListRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/ListRow.jsx", error: String((e && e.message) || e) }); }

// components/layout/StatPair.jsx
try { (() => {
/** Meta stat: peach icon + muted uppercase label over strong value ("LESSONS / 12 Modules"). */
function StatPair({
  icon,
  label,
  value,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined",
    style: {
      fontSize: 26,
      color: 'var(--accent-peach)'
    }
  }, icon), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      color: 'var(--text-primary)',
      marginTop: 2
    }
  }, value)));
}
Object.assign(__ds_scope, { StatPair });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/StatPair.jsx", error: String((e && e.message) || e) }); }

// components/content/CourseCard.jsx
try { (() => {
/** Academy course card: media header with level badge, title with peach bar, body, stats, footer. */
function CourseCard({
  level = 'Beginner',
  image,
  title,
  body,
  lessons,
  duration,
  author,
  onView,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-card)',
      overflow: 'hidden',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 200,
      background: 'var(--bg-3)'
    }
  }, image ? /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-muted)',
      fontSize: 13,
      letterSpacing: '0.1em'
    }
  }, "COURSE IMAGE"), /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    label: level,
    variant: "level",
    style: {
      position: 'absolute',
      top: 16,
      left: 16
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '24px 22px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 4,
      height: 24,
      borderRadius: 2,
      background: 'var(--accent-peach)'
    }
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 24,
      fontWeight: 700,
      color: 'var(--text-primary)'
    }
  }, title)), body && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '14px 0 0',
      fontSize: 16,
      lineHeight: 1.55,
      color: 'var(--text-secondary)'
    }
  }, body), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 40,
      marginTop: 20
    }
  }, lessons && /*#__PURE__*/React.createElement(__ds_scope.StatPair, {
    icon: "menu_book",
    label: "Lessons",
    value: lessons
  }), duration && /*#__PURE__*/React.createElement(__ds_scope.StatPair, {
    icon: "schedule",
    label: "Duration",
    value: duration
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 20,
      paddingTop: 18,
      borderTop: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      fontWeight: 500,
      color: 'var(--text-primary)'
    }
  }, author), /*#__PURE__*/React.createElement(__ds_scope.LinkAction, {
    label: "View Course",
    onClick: onView
  }))));
}
Object.assign(__ds_scope, { CourseCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/CourseCard.jsx", error: String((e && e.message) || e) }); }

// components/navigation/BottomNav.jsx
try { (() => {
const DEFAULT_ITEMS = [{
  id: 'home',
  icon: 'home',
  label: 'Home'
}, {
  id: 'charts',
  icon: 'show_chart',
  label: 'Charts'
}, {
  id: 'academy',
  icon: 'school',
  label: 'Academy'
}, {
  id: 'news',
  icon: 'article',
  label: 'News'
}, {
  id: 'settings',
  icon: 'settings',
  label: 'Settings'
}];

/** Bottom navigation, 5 destinations. Active item peach with soft pill halo behind icon. */
function BottomNav({
  items = DEFAULT_ITEMS,
  active = 'home',
  onSelect,
  style
}) {
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '10px 8px 14px',
      background: 'var(--bg-1)',
      borderTop: '1px solid var(--border-subtle)',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, items.map(it => {
    const isActive = it.id === active;
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      onClick: () => onSelect && onSelect(it.id),
      style: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        color: isActive ? 'var(--nav-active)' : 'var(--nav-inactive)',
        minWidth: 64
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 56,
        height: 32,
        borderRadius: 999,
        background: isActive ? 'rgba(246,177,122,0.16)' : 'transparent'
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "material-symbols-outlined",
      style: {
        fontSize: 24
      }
    }, it.icon)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        fontWeight: isActive ? 700 : 400
      }
    }, it.label));
  }));
}
Object.assign(__ds_scope, { BottomNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/BottomNav.jsx", error: String((e && e.message) || e) }); }

// components/navigation/TopBar.jsx
try { (() => {
/** App top bar: back arrow, tracked title (peach), optional trailing avatar/icons. */
function TopBar({
  title,
  tracked = true,
  avatar,
  icons = [],
  onBack,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 18,
      padding: '18px 20px',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, onBack !== null && /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined",
    onClick: onBack || undefined,
    style: {
      fontSize: 26,
      color: 'var(--accent-peach)',
      cursor: 'pointer'
    }
  }, "arrow_back"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: tracked ? 21 : 20,
      fontWeight: 700,
      letterSpacing: tracked ? '0.12em' : '0.02em',
      textTransform: tracked ? 'uppercase' : 'none',
      color: tracked ? 'var(--accent-peach)' : 'var(--text-primary)'
    }
  }, title), icons.map(ic => /*#__PURE__*/React.createElement("span", {
    key: ic,
    className: "material-symbols-outlined",
    style: {
      fontSize: 24,
      color: 'var(--text-primary)',
      cursor: 'pointer'
    }
  }, ic)), avatar && /*#__PURE__*/React.createElement("img", {
    src: avatar,
    alt: "",
    style: {
      width: 40,
      height: 40,
      borderRadius: '50%',
      objectFit: 'cover'
    }
  }));
}
Object.assign(__ds_scope, { TopBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/TopBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sniper-scalper-app/screens.jsx
try { (() => {
const DS = window.SniperScalperDesignSystem_1bcd68;
const {
  Button,
  LinkAction,
  Chip,
  Badge,
  Toggle,
  SectionHeader,
  Card,
  ListRow,
  StatPair,
  FeatureTile,
  TopBar,
  BottomNav,
  CourseCard,
  NewsCard
} = DS;
const AVATAR = '../../assets/avatar-fx-ramzan.png';
const CHART_PHOTO = '../../assets/course-chart-photo.png';
const NEWS1 = '../../assets/news-sample-1.png';
const NEWS2 = '../../assets/news-sample-2.png';
function StatusBar() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 24px 4px',
      color: 'var(--text-primary)',
      fontSize: 14,
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement("span", null, "12:42"), /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined",
    style: {
      fontSize: 16
    }
  }, "signal_wifi_4_bar"));
}
function SplashScreen() {
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "Splash",
    style: {
      height: '100%',
      background: 'var(--bg-chart)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 14,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 130,
      height: 130,
      borderRadius: 34,
      background: 'var(--bg-2)',
      border: '1px solid var(--border-subtle)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 40
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined",
    style: {
      fontSize: 56,
      color: 'var(--accent-peach)',
      fontVariationSettings: "'FILL' 1"
    }
  }, "shield")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 34,
      fontWeight: 500,
      letterSpacing: '0.06em'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent-peach)'
    }
  }, "SNIPER"), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-primary)'
    }
  }, "SCALPER")), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-muted)',
      fontSize: 12,
      fontWeight: 500,
      letterSpacing: '0.3em'
    }
  }, "PRECISION TRADING TERMINAL"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '80%',
      height: 1,
      background: 'var(--accent-peach)',
      marginTop: 70
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--accent-orange)',
      fontSize: 13,
      fontWeight: 700,
      letterSpacing: '0.2em'
    }
  }, "CONNECTING TO SERVER"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 36,
      left: 28,
      right: 28,
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-muted)',
      letterSpacing: '0.15em'
    }
  }, "SERVER STATUS"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-primary)',
      fontSize: 15,
      letterSpacing: '0.1em',
      marginTop: 4
    }
  }, "OPTIMAL")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-muted)',
      letterSpacing: '0.15em'
    }
  }, "PROTOCOL"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-primary)',
      fontSize: 15,
      letterSpacing: '0.1em',
      marginTop: 4
    }
  }, "V.4.22.8"))));
}
function AcademyScreen({
  onOpenCourse
}) {
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "Academy",
    style: {
      padding: '0 20px 24px'
    }
  }, /*#__PURE__*/React.createElement(TopBar, {
    title: "Academy",
    avatar: AVATAR,
    style: {
      padding: '14px 0'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--accent-peach)',
      fontSize: 13,
      fontWeight: 700,
      letterSpacing: '0.28em',
      marginTop: 14
    }
  }, "INSTITUTIONAL TRAINING"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '14px 0 0',
      color: 'var(--text-primary)',
      fontSize: 56,
      fontWeight: 500,
      lineHeight: 1.02
    }
  }, "Courses"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '18px 0 0',
      color: 'var(--text-secondary)',
      fontSize: 17,
      lineHeight: 1.55
    }
  }, "Access three professional trading courses designed to build a complete trading system, taught with an institutional approach to the markets."), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '20px 0 0'
    }
  }, /*#__PURE__*/React.createElement(Chip, {
    label: "Live Enrollment Open",
    dot: true
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '16px 0 0',
      color: 'var(--text-muted)',
      fontSize: 13.5,
      lineHeight: 1.5
    }
  }, "For educational purposes only. Not financial advice \u2014 trading involves risk of loss."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(CourseCard, {
    level: "Beginner",
    image: CHART_PHOTO,
    title: "Smart Money Concepts (SMC)",
    body: "Master the mechanics of institutional liquidity and order flow. Understand how major players move price and learn to identify high-probability setups.",
    lessons: "12 Modules",
    duration: "8 Hours",
    author: "FX Ramzan",
    onView: onOpenCourse
  }), /*#__PURE__*/React.createElement(CourseCard, {
    level: "Intermediate",
    image: NEWS1,
    title: "Precision Scalping System",
    body: "A complete intraday execution framework: entries, risk, and trade management.",
    lessons: "10 Modules",
    duration: "6 Hours",
    author: "FX Ramzan",
    onView: onOpenCourse
  })));
}
function CourseDetailScreen({
  onBack,
  onEnroll
}) {
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "Course Detail"
  }, /*#__PURE__*/React.createElement(TopBar, {
    title: "Academy",
    tracked: false,
    onBack: onBack,
    style: {
      justifyContent: 'center'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: CHART_PHOTO,
    alt: "",
    style: {
      width: '100%',
      height: 300,
      objectFit: 'cover',
      display: 'block',
      opacity: 0.85
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(180deg, rgba(13,13,13,0.25), rgba(13,13,13,0.92))'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      padding: '18px 20px',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    label: "Beginner",
    variant: "level"
  }), /*#__PURE__*/React.createElement(Chip, {
    label: "8 Hours",
    style: {
      padding: '8px 16px',
      fontSize: 12
    }
  }), /*#__PURE__*/React.createElement(Chip, {
    label: "12 Modules",
    style: {
      padding: '8px 16px',
      fontSize: 12
    }
  })), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 'auto 0 0',
      color: 'var(--accent-peach)',
      fontSize: 34,
      fontWeight: 700,
      lineHeight: 1.1
    }
  }, "Smart Money Concepts (SMC)"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-secondary)',
      fontStyle: 'italic',
      fontSize: 16,
      marginTop: 8
    }
  }, "Led by FX Ramzan"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '24px 20px 28px'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    label: "Enroll Now",
    onClick: onEnroll,
    style: {
      padding: '16px 56px'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    label: "The Protocol",
    size: "lg"
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '16px 0 0',
      color: 'var(--text-secondary)',
      fontSize: 16.5,
      lineHeight: 1.6
    }
  }, "Deconstruct the financial matrix. This program is an Architectural Protocol designed to rewire your perception of liquidity. We move beyond retail noise, focusing exclusively on how institutional algorithms deliver price through the lens of Smart Money Concepts."), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '28px 0 0',
      color: 'var(--accent-peach)',
      fontSize: 13,
      fontWeight: 700,
      letterSpacing: '0.18em'
    }
  }, "SYSTEM ARCHITECTURE"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 14,
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(FeatureTile, {
    icon: "account_tree",
    title: "Market Structure",
    body: "Identify the true narrative behind price swings."
  }), /*#__PURE__*/React.createElement(FeatureTile, {
    icon: "water_drop",
    title: "Liquidity",
    body: "Locate the fuel that drives institutional moves."
  }), /*#__PURE__*/React.createElement(FeatureTile, {
    icon: "grid_view",
    title: "Order Blocks",
    body: "Pinpoint the footprints of large institutional orders."
  }), /*#__PURE__*/React.createElement(FeatureTile, {
    icon: "alt_route",
    title: "FVG",
    body: "Exploit Fair Value Gaps and algorithmic inefficiencies."
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(Button, {
    label: "Enroll Now",
    fullWidth: true,
    onClick: onEnroll
  }))));
}
function NewsScreen() {
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "News"
  }, /*#__PURE__*/React.createElement(TopBar, {
    title: "Sniper Scalper",
    avatar: AVATAR,
    icons: ["refresh", "menu"],
    style: {
      padding: '14px 20px'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'stretch',
      background: 'var(--bg-2)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'var(--accent-peach)',
      color: 'var(--text-on-accent)',
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: '0.15em',
      padding: '16px 18px',
      display: 'flex',
      alignItems: 'center'
    }
  }, "BREAKING"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-primary)',
      fontSize: 14,
      fontWeight: 600,
      letterSpacing: '0.04em',
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'center'
    }
  }, "BITGET LAUNCHES CRYPTO INDUSTRY'S FIRST EVER US STOCK OPTIONS TRADING \xB7")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 20px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(NewsCard, {
    source: "Pakistan News Express",
    timestamp: "22h ago",
    image: NEWS1,
    headline: "Bitget Launches Crypto Industry's First Ever US Stock Options Trading",
    excerpt: "VICTORIA, Seychelles, July 03, 2026 (GLOBE NEWSWIRE) \u2014 Bitget, the world's largest Universal Exchange, expands access to US equity options."
  }), /*#__PURE__*/React.createElement(NewsCard, {
    source: "Riauone.com | Berita Nusantara Terkini",
    timestamp: "23h ago",
    image: NEWS2,
    headline: "From Crypto to Gold: UEX Launches First Cross-Asset Trading Tournament",
    excerpt: "VICTORIA, Seychelles, July 01, 2026 (GLOBE NEWSWIRE) \u2014 the world's first cross-asset trading tournament spanning crypto, gold and indices."
  })));
}
function SettingsScreen() {
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "Settings",
    style: {
      padding: '0 20px 24px'
    }
  }, /*#__PURE__*/React.createElement(TopBar, {
    title: "Sniper Scalper",
    avatar: AVATAR,
    style: {
      padding: '14px 0'
    }
  }), /*#__PURE__*/React.createElement(Card, {
    size: "sm",
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      padding: '24px 22px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: AVATAR,
    alt: "",
    style: {
      width: 80,
      height: 80,
      borderRadius: '50%',
      objectFit: 'cover'
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--accent-peach)',
      fontSize: 26,
      fontWeight: 700
    }
  }, "FX Ramzan"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-secondary)',
      fontSize: 16,
      marginTop: 4
    }
  }, "Founder & Lead Strategist")))), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '28px 0 14px'
    }
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    label: "Notification Preferences",
    color: "blue"
  })), /*#__PURE__*/React.createElement(Card, {
    size: "sm"
  }, /*#__PURE__*/React.createElement(ListRow, {
    icon: "notifications",
    label: "Signal Alerts",
    trailing: "none"
  }, /*#__PURE__*/React.createElement(Toggle, {
    defaultChecked: true
  })), /*#__PURE__*/React.createElement(ListRow, {
    icon: "newspaper",
    label: "Market News Updates",
    trailing: "none",
    divider: true
  }, /*#__PURE__*/React.createElement(Toggle, null)), /*#__PURE__*/React.createElement(ListRow, {
    icon: "mail",
    label: "Newsletter & Insights",
    trailing: "none",
    divider: true
  }, /*#__PURE__*/React.createElement(Toggle, {
    defaultChecked: true
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '28px 0 14px'
    }
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    label: "Information",
    color: "muted"
  })), /*#__PURE__*/React.createElement(Card, {
    size: "sm"
  }, /*#__PURE__*/React.createElement(ListRow, {
    icon: "info",
    label: "About Us"
  }), /*#__PURE__*/React.createElement(ListRow, {
    icon: "help",
    label: "Contact & Support",
    divider: true
  }), /*#__PURE__*/React.createElement(ListRow, {
    icon: "quiz",
    label: "FAQs & Knowledge Base",
    divider: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      marginTop: 36,
      color: 'var(--text-muted)',
      fontSize: 15,
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined",
    style: {
      fontSize: 18
    }
  }, "location_on"), "Office: Ahmadpur East"));
}
function ChartsPlaceholder() {
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "Charts",
    style: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 14,
      padding: '0 40px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined",
    style: {
      fontSize: 44,
      color: 'var(--accent-peach)'
    }
  }, "show_chart"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-primary)',
      fontSize: 18,
      fontWeight: 700,
      letterSpacing: '0.08em'
    }
  }, "XAUUSD \xB7 15M"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'var(--text-muted)',
      fontSize: 14,
      lineHeight: 1.5
    }
  }, "The live chart screen embeds a third-party TradingView widget \u2014 intentionally not recreated in this kit."));
}
Object.assign(window, {
  StatusBar,
  SplashScreen,
  AcademyScreen,
  CourseDetailScreen,
  NewsScreen,
  SettingsScreen,
  ChartsPlaceholder
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sniper-scalper-app/screens.jsx", error: String((e && e.message) || e) }); }

__ds_ns.CourseCard = __ds_scope.CourseCard;

__ds_ns.NewsCard = __ds_scope.NewsCard;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.LinkAction = __ds_scope.LinkAction;

__ds_ns.SectionHeader = __ds_scope.SectionHeader;

__ds_ns.Toggle = __ds_scope.Toggle;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.FeatureTile = __ds_scope.FeatureTile;

__ds_ns.ListRow = __ds_scope.ListRow;

__ds_ns.StatPair = __ds_scope.StatPair;

__ds_ns.BottomNav = __ds_scope.BottomNav;

__ds_ns.TopBar = __ds_scope.TopBar;

})();
