import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { SIGNAL_POLL_MS } from '../data/apiConfig';
import { marketRepository } from '../data/repository';
import type { Signal, SignalStatus } from '../data/types';

/**
 * Loads admin-broadcast signals from the ingest server when EXPO_PUBLIC_API_URL
 * is set; otherwise stays on mock data. No login required.
 */
export function useLiveSignals(status: SignalStatus | 'all' = 'all') {
  const [signals, setSignals] = useState<Signal[]>(marketRepository.getSignals());
  const [live, setLive] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(
    async (opts?: { pull?: boolean }) => {
      if (opts?.pull) {
        setRefreshing(true);
      }
      const result = await marketRepository.fetchSignals(status);
      setSignals(result.signals);
      setLive(result.live);
      setRefreshing(false);
    },
    [status],
  );

  useFocusEffect(
    useCallback(() => {
      load();
      if (!marketRepository.isLiveDataEnabled()) {
        return;
      }
      const timer = setInterval(() => load(), SIGNAL_POLL_MS);
      return () => clearInterval(timer);
    }, [load]),
  );

  return {
    signals,
    live,
    refreshing,
    refresh: () => load({ pull: true }),
  };
}
