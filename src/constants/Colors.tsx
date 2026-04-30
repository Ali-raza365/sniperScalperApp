// ============================================================
//  SNIPER SCALPER — "Institutional Archive" Design System
//  Colors aligned with DESIGN.md and all design HTML files
// ============================================================

export enum Colors {
  // Primary Brand — Gold/Orange
  theme            = '#FFB77D',   // primary
  primary          = '#FFB77D',   // primary
  primaryContainer = '#FF8C00',   // primary-container (deeper orange)

  // Secondary — Blue (Bullish signals)
  secondary          = '#AFC6FF', // secondary
  secondaryContainer = '#045DD0', // secondary-container

  // Tertiary — Pink/Rose (Bearish signals)
  tertiary          = '#FFB1C4', // tertiary
  tertiaryContainer = '#FF82A7', // tertiary-container

  // Surface Hierarchy (nested layers — dark canvas)
  background             = '#131313', // surface / background / canvas
  surface                = '#131313',
  surfaceContainerLowest = '#0E0E0E',
  surfaceContainerLow    = '#1B1B1B', // card (primary content blocks)
  surfaceContainer       = '#1F1F1F',
  surfaceContainerHigh   = '#2A2A2A', // interactive cards / data modules
  surfaceContainerHighest= '#353535', // lifted/floating elements
  surfaceBright          = '#393939', // glassmorphic panels

  // Text
  text            = '#E2E2E2',  // on-surface — never pure white
  onSurfaceVariant= '#DDC1AE',  // warm beige — secondary text
  lightText       = '#DDC1AE',

  // Borders (ghost borders only — 15% opacity in practice)
  border          = '#564334',  // outline-variant
  outline         = '#A48C7A',  // outline

  // Utility
  white           = '#FFFFFF',
  black           = '#000000',
  inactive_tint   = '#DDC1AE', // at 60% opacity for inactive tabs
  disabled        = '#D9D9D9',
  light_gray      = '#D3D3D3',
  like            = '#FF82A7',  // tertiary-container (bearish/error)
  card            = '#1B1B1B',  // alias for surfaceContainerLow
}
