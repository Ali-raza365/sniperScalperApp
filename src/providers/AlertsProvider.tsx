import React, { createContext, useCallback, useContext, useEffect, useMemo, type ReactNode } from 'react';
import { subscribeTokenRefresh, syncPushRegistration } from '../services/alerts';

type AlertsContextValue = {
  syncPushRegistration: () => Promise<void>;
};

const AlertsContext = createContext<AlertsContextValue | undefined>(undefined);

/** Boots FCM registration for broadcast admin signals (no user login). */
export const AlertsProvider = ({ children }: { children: ReactNode }) => {
  const sync = useCallback(async () => {
    await syncPushRegistration();
  }, []);

  useEffect(() => {
    sync();
    return subscribeTokenRefresh();
  }, [sync]);

  const value = useMemo(() => ({ syncPushRegistration: sync }), [sync]);

  return <AlertsContext.Provider value={value}>{children}</AlertsContext.Provider>;
};

export function useAlerts(): AlertsContextValue {
  const ctx = useContext(AlertsContext);
  if (!ctx) {
    throw new Error('useAlerts must be used within AlertsProvider');
  }
  return ctx;
}
