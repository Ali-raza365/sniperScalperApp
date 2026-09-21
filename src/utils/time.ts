export function formatRelativeTime(iso?: string): string {
  if (!iso) {
    return '';
  }
  const then = Date.parse(iso);
  if (Number.isNaN(then)) {
    return iso;
  }
  const diff = Math.max(0, Date.now() - then);
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) {
    return 'just now';
  }
  if (minutes < 60) {
    return `${minutes}m ago`;
  }
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours}h ago`;
  }
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
