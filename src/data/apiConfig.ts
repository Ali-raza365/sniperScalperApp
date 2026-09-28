/**
 * Live data configuration for the MT5 ingest server (see /server).
 *
 * The app runs entirely on mock data by default. To enable live signals/OHLC,
 * set EXPO_PUBLIC_API_URL (e.g. in a .env file loaded by Expo):
 *
 *   - Android emulator:            EXPO_PUBLIC_API_URL=http://10.0.2.2:8787
 *   - iOS simulator:                EXPO_PUBLIC_API_URL=http://127.0.0.1:8787
 *   - Physical device (Expo Go):    EXPO_PUBLIC_API_URL=http://<your-lan-ip>:8787
 *
 * Leaving it unset keeps every screen on the bundled mock catalogs.
 */
const envUrl = (process.env.EXPO_PUBLIC_API_URL ?? '').trim().replace(/\/+$/, '');

export const API_BASE_URL = envUrl;
export const IS_LIVE_DATA_ENABLED = API_BASE_URL.length > 0;

export const SIGNAL_POLL_MS = 10_000;

export const SIGNAL_API_KEY =
  (process.env.EXPO_PUBLIC_SIGNAL_API_KEY ?? '').trim() || 'sniper-scalper-dev-key';
