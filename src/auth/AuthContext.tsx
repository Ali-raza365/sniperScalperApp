import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  type User,
} from '@react-native-firebase/auth';
import {
  ensureFcmToken,
  onFcmTokenRefresh,
} from '../services/notifications';
import { registerDevice, unregisterDevice } from '../services/deviceRegistration';
import {
  getMt5Account,
  getSignalAlertsEnabled,
} from '../services/prefs';

type AuthContextValue = {
  user: User | null;
  initializing: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  /** Re-sync FCM token with the ingest server using current prefs. */
  syncPushRegistration: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);

  const syncPushRegistration = useCallback(async () => {
    if (!getAuth().currentUser) return;
    const alertsOn = await getSignalAlertsEnabled();
    const account = await getMt5Account();
    const token = await ensureFcmToken();
    if (!token) return;
    if (alertsOn && account) {
      await registerDevice(token, account);
    } else {
      await unregisterDevice(token);
    }
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(getAuth(), async next => {
      setUser(next);
      setInitializing(false);
      if (next) {
        await syncPushRegistration();
      }
    });
    return unsub;
  }, [syncPushRegistration]);

  useEffect(() => {
    if (!user) return;
    return onFcmTokenRefresh(async token => {
      const alertsOn = await getSignalAlertsEnabled();
      const account = await getMt5Account();
      if (alertsOn && account) {
        await registerDevice(token, account);
      }
    });
  }, [user]);

  const signIn = useCallback(async (email: string, password: string) => {
    await signInWithEmailAndPassword(getAuth(), email.trim(), password);
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    await createUserWithEmailAndPassword(getAuth(), email.trim(), password);
  }, []);

  const signOut = useCallback(async () => {
    try {
      const token = await ensureFcmToken();
      if (token) await unregisterDevice(token);
    } catch {
      // ignore unregister failures on sign-out
    }
    await firebaseSignOut(getAuth());
  }, []);

  const value = useMemo(
    () => ({
      user,
      initializing,
      signIn,
      signUp,
      signOut,
      syncPushRegistration,
    }),
    [user, initializing, signIn, signUp, signOut, syncPushRegistration],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
