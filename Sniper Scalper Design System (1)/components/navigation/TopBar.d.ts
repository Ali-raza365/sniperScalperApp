/** App top bar: back arrow + tracked peach title + trailing icons/avatar. */
export interface TopBarProps {
  title: string;
  /** Tracked uppercase peach title (default). false = plain white title */
  tracked?: boolean;
  /** Avatar image URL, rendered as trailing 40px circle */
  avatar?: string;
  /** Material Symbols icon names, trailing */
  icons?: string[];
  /** Back handler; pass null to hide back arrow */
  onBack?: (() => void) | null;
  style?: React.CSSProperties;
}
