/** Material switch — orange track on, gray-brown off. */
export interface ToggleProps {
  /** Controlled value */
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (on: boolean) => void;
  style?: React.CSSProperties;
}
