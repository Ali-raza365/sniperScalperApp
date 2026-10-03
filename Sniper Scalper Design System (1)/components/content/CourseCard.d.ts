/** Academy course card with media header, level badge, stats, author footer. */
export interface CourseCardProps {
  /** Level badge label */
  level?: string;
  /** Media image URL (dim placeholder if omitted) */
  image?: string;
  title: string;
  body?: string;
  /** e.g. "12 Modules" */
  lessons?: string;
  /** e.g. "8 Hours" */
  duration?: string;
  author?: string;
  onView?: () => void;
  style?: React.CSSProperties;
}
