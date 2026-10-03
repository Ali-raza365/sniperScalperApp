import { getAuth, getIdToken } from '@react-native-firebase/auth';
import { API_BASE_URL, IS_LIVE_DATA_ENABLED } from '../data/apiConfig';

async function authHeaders(): Promise<Record<string, string> | null> {
  const user = getAuth().currentUser;
  if (!user || !IS_LIVE_DATA_ENABLED) return null;
  const idToken = await getIdToken(user);
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${idToken}`,
  };
}

/** Registers this device's FCM token for the given MT5 account on the ingest server. */
export async function registerDevice(fcmToken: string, account: string): Promise<boolean> {
  const headers = await authHeaders();
  if (!headers || !fcmToken || !account.trim()) return false;
  try {
    const res = await fetch(`${API_BASE_URL}/devices`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ fcmToken, account: account.trim() }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/** Unregisters this device's FCM token (e.g. when Signal Alerts is turned off). */
export async function unregisterDevice(fcmToken: string): Promise<boolean> {
  const headers = await authHeaders();
  if (!headers || !fcmToken) return false;
  try {
    const res = await fetch(`${API_BASE_URL}/devices`, {
      method: 'DELETE',
      headers,
      body: JSON.stringify({ fcmToken }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
