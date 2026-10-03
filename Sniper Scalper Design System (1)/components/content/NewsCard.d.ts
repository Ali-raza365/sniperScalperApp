/** News feed card: source header, media, headline, excerpt, action footer. */
export interface NewsCardProps {
  /** Source name, outlined peach badge */
  source: string;
  /** e.g. "22h ago" */
  timestamp: string;
  /** Category tag, default "$Business" */
  tag?: string;
  /** Article image URL (dim placeholder if omitted) */
  image?: string;
  headline: string;
  excerpt?: string;
  style?: React.CSSProperties;
}
