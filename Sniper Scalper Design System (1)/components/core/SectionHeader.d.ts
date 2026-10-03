/** Section eyebrow: 4px accent bar + tracked uppercase label ("THE PROTOCOL"). */
export interface SectionHeaderProps {
  label: string;
  /** Bar/text color family */
  color?: 'peach' | 'blue' | 'muted';
  /** sm = list-group eyebrow; lg = page section title */
  size?: 'sm' | 'lg';
  style?: React.CSSProperties;
}
