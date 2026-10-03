/** Small solid badge for levels, breaking news, category tags, news sources. */
export interface BadgeProps {
  label: string;
  /** level = blue pill (BEGINNER); breaking = peach block; tag = $BUSINESS; source = outlined peach */
  variant?: 'level' | 'breaking' | 'tag' | 'source';
  style?: React.CSSProperties;
}
