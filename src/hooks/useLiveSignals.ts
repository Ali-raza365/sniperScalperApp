import { useCallback, useRef, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { SIGNAL_POLL_MS } from '../data/apiConfig';
import { marketRepository } from '../data/repository';
import type { Signal, SignalStatus } from '../data/types';
import { showToast } from '../utils/CustomToast';

const seenTickets = new Set<string>();
let primed = false;

function announceNewTickets(next: Signal[]) {
  const tickets = next.map(item => String(item.ticket ?? item.id));
  if (!primed) {
    tickets.forEach(ticket => seenTickets.add(ticket));
    primed = true;
    return;
  }
  tickets.forEach(ticket => {
    if (seenTickets.has(ticket)) {
      return;
    }
    seenTickets.add(ticket);
    const signal = next.find(item => String(item.ticket ?? item.id) === ticket);
    const side = signal?.side ?? 'TICKET';
    const pair = signal?.symbol ?? signal?.pair ?? '';
    showToast.success(`${side} ${pair}`.trim(), 'New MT5 ticket');
  });
}

export function useLiveSignals(status: SignalStatus | 'all' = 'all') {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [live, setLive] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const statusRef = useRef(status);
  statusRef.current = status;

  const load = useCallback(async (opts?: { pull?: boolean }) => {
    if (opts?.pull) {
      setRefreshing(true);
    }
    const result = await marketRepository.fetchSignals(statusRef.current);
    setSignals(result.signals);
    setLive(result.live);
    announceNewTickets(result.signals);
    setRefreshing(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
      const timer = setInterval(() => {
        load();
      }, SIGNAL_POLL_MS);
      return () => clearInterval(timer);
    }, [load, status]),
  );

  return {
    signals,
    live,
    refreshing,
    refresh: () => load({ pull: true }),
  };
}
