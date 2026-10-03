/** Bottom navigation bar — 5 destinations, active item peach with pill halo. */
export interface BottomNavProps {
  /** Defaults to Home/Charts/Academy/News/Settings */
  items?: { id: string; icon: string; label: string }[];
  /** Active item id */
  active?: string;
  onSelect?: (id: string) => void;
  style?: React.CSSProperties;
}
