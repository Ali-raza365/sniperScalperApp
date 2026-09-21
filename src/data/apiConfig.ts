import { Platform } from 'react-native';

/** Android emulator reaches host loopback via 10.0.2.2. iOS simulator uses localhost. */
export const API_BASE_URL =
  Platform.OS === 'android' ? 'http://10.0.2.2:8787' : 'http://127.0.0.1:8787';

export const SIGNAL_POLL_MS = 10_000;

export const SIGNAL_API_KEY = 'sniper-scalper-dev-key';
