/** Raised dark surface card. */
export interface CardProps {
  children?: React.ReactNode;
  /** lg = 24px radius; sm = 16px */
  size?: 'lg' | 'sm';
  /** Use the lighter nested surface */
  nested?: boolean;
  style?: React.CSSProperties;
}
