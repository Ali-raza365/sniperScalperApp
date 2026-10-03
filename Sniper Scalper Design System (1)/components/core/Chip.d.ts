/** Dark pill chip with optional status dot or Material icon prefix. */
export interface ChipProps {
  label: string;
  /** Orange status dot prefix ("LIVE ENROLLMENT OPEN") */
  dot?: boolean;
  /** Material Symbols icon name */
  icon?: string;
  style?: React.CSSProperties;
}
