/**
 * Live data configuration for the MT5 ingest server (see /server).
 *
 * The app runs on mock signal catalogs when EXPO_PUBLIC_API_URL is unset.
 * For production, point at your public HTTPS API (Railway, etc.):
 *
 *   EXPO_PUBLIC_API_URL=https://your-api.up.railway.app
 *
 * Local / LAN (Dev Client only — Firebase native modules need a custom build):
 *
 *   - Android emulator:  EXPO_PUBLIC_API_URL=http://10.0.2.2:8787
 *   - iOS simulator:     EXPO_PUBLIC_API_URL=http://127.0.0.1:8787
 *   - Physical device:   EXPO_PUBLIC_API_URL=http://<your-lan-ip>:8787
 *
 * App routes require Firebase Auth (Bearer ID token). EA posts still use x-api-key.
 */
const envUrl = (process.env.EXPO_PUBLIC_API_URL ?? '').trim().replace(/\/+$/, '');

export const API_BASE_URL = envUrl;
export const IS_LIVE_DATA_ENABLED = API_BASE_URL.length > 0;

export const SIGNAL_POLL_MS = 10_000;

/** Used only by the EA / server-side ingest — not sent by the mobile app. */
export const SIGNAL_API_KEY =
  (process.env.EXPO_PUBLIC_SIGNAL_API_KEY ?? '').trim() || 'sniper-scalper-dev-key';
