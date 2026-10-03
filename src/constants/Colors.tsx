// ============================================================
//  SNIPER SCALPER — Design System tokens
//  Aligned with Sniper Scalper Design System (1)/tokens/colors.css
// ============================================================

export enum Colors {
  // Primary Brand — Peach / Orange accent ramp
  theme            = '#F6B17A',   // accent-peach
  primary          = '#F6B17A',   // headings, icons, CTA fill
  primaryContainer = '#F5820D',   // accent-orange (toggles, active, links)

  // Secondary — soft blue (news tags / info)
  secondary          = '#AECBFA', // info-blue-soft
  secondaryContainer = '#1A6CE0', // info-blue (level badge)

  // Tertiary — market / alert (use sparingly; red is market-down)
  tertiary          = '#EF5350', // down
  tertiaryContainer = '#26A69A', // up (teal)

  // Surface Hierarchy (warm near-blacks)
  background             = '#121212', // bg-1
  surface                = '#121212',
  surfaceContainerLowest = '#0D0D0D', // bg-chart
  surfaceContainerLow    = '#1C1A18', // bg-2 card
  surfaceContainer       = '#1C1A18',
  surfaceContainerHigh   = '#262320', // bg-3 nested
  surfaceContainerHighest= '#262320',
  surfaceBright          = '#262320',

  // Text
  text            = '#ECEAE7',  // text-primary
  onSurfaceVariant= '#C9B8A4',  // text-secondary / warm tan
  lightText       = '#C9B8A4',
  textMuted       = '#8A8078',
  textOnAccent    = '#1C1207',

  // Borders
  border          = 'rgba(255,255,255,0.08)',
  outline         = '#8A8078',

  // Semantic market
  up   = '#26A69A',
  down = '#EF5350',

  // Utility
  white           = '#FFFFFF',
  black           = '#000000',
  inactive_tint   = '#8A8078',
  disabled        = '#8A8078',
  light_gray      = '#C9B8A4',
  like            = '#EF5350',
  card            = '#1C1A18',
}
