import type { Signal, SignalSide, SignalStatus } from './types';
import { formatRelativeTime } from '../utils/time';

type IncomingSignal = Partial<Signal> & {
  ticket?: string | number;
  symbol?: string;
  pair?: string;
  side?: string;
  bias?: string;
  status?: string;
};

export function mapIncomingSignal(raw: IncomingSignal): Signal {
  const side: SignalSide = String(raw.side || '').toUpperCase() === 'SELL' ? 'SELL' : 'BUY';
  const status: SignalStatus = String(raw.status || '').toLowerCase() === 'closed' ? 'closed' : 'open';
  const symbol = String(raw.symbol || raw.pair || '').toUpperCase();
  const ticket = raw.ticket != null ? String(raw.ticket) : undefined;
  const comment = raw.comment ?? raw.desc ?? '';
  const openedAt = raw.openedAt;

  return {
    id: ticket || raw.id || `${symbol}-${openedAt || Date.now()}`,
    ticket,
    pair: symbol,
    symbol,
    bias: side === 'SELL' ? 'BEARISH' : 'BULLISH',
    side,
    icon: side === 'SELL' ? 'trending-down' : 'trending-up',
    desc: comment,
    comment,
    time: openedAt ? formatRelativeTime(openedAt) : raw.time ?? '',
    openedAt,
    volume: raw.volume,
    price: raw.price,
    sl: raw.sl,
    tp: raw.tp,
    status,
    profit: raw.profit,
  };
}
