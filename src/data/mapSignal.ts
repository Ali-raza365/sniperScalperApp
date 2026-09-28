import type { Signal, SignalSide, SignalStatus } from './types';

interface IncomingSignal {
  ticket?: string | number;
  symbol?: string;
  side?: string;
  status?: string;
  comment?: string;
  openedAt?: string;
  volume?: number;
  price?: number | null;
  sl?: number | null;
  tp?: number | null;
  profit?: number | null;
}

function formatRelativeTime(iso?: string): string {
  if (!iso) return '';
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return '';
  const diffMinutes = Math.floor((Date.now() - then) / 60_000);
  if (diffMinutes < 1) return 'just now';
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${Math.floor(diffHours / 24)}d ago`;
}

/** Maps a raw /signals payload from the MT5 ingest server into the app's Signal shape. */
export function mapIncomingSignal(raw: IncomingSignal): Signal {
  const side: SignalSide = String(raw.side || '').toUpperCase() === 'SELL' ? 'SELL' : 'BUY';
  const status: SignalStatus = String(raw.status || '').toLowerCase() === 'closed' ? 'closed' : 'open';
  const symbol = String(raw.symbol || '').toUpperCase();
  const ticket = raw.ticket != null ? String(raw.ticket) : undefined;

  return {
    id: ticket || `${symbol}-${raw.openedAt ?? Date.now()}`,
    ticket,
    pair: symbol,
    symbol,
    bias: side === 'SELL' ? 'BEARISH' : 'BULLISH',
    side,
    icon: side === 'SELL' ? 'trending-down' : 'trending-up',
    desc: raw.comment || `${side} ticket on ${symbol}.`,
    comment: raw.comment,
    time: formatRelativeTime(raw.openedAt),
    openedAt: raw.openedAt,
    status,
    volume: raw.volume,
    price: raw.price ?? undefined,
    sl: raw.sl ?? undefined,
    tp: raw.tp ?? undefined,
    profit: raw.profit ?? undefined,
  };
}
