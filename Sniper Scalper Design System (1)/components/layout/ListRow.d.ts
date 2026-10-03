/** Settings list row: peach icon + label + trailing chevron or control. */
export interface ListRowProps {
  /** Material Symbols icon name */
  icon?: string;
  label: string;
  /** 'chevron' (default) or 'none'; or pass a control as children (e.g. <Toggle/>) */
  trailing?: 'chevron' | 'none';
  /** Hairline top divider (for stacked rows) */
  divider?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}
