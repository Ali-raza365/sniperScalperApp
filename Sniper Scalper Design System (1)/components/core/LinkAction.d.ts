/** Uppercase peach text-action with trailing arrow ("VIEW COURSE →"). */
export interface LinkActionProps {
  label: string;
  /** Show trailing → (default true) */
  arrow?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}
