/** Filled pill call-to-action ("ENROLL NOW"). */
export interface ButtonProps {
  /** Uppercase label, e.g. "Enroll Now" */
  label: string;
  /** primary = peach fill (default); outline; surface */
  variant?: 'primary' | 'outline' | 'surface';
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}
