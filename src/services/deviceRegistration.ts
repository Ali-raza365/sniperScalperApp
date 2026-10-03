import { API_BASE_URL, IS_LIVE_DATA_ENABLED } from '../data/apiConfig';

/** Registers this device's FCM token to receive broadcast admin signals. */
export async function registerDevice(fcmToken: string): Promise<boolean> {
  if (!IS_LIVE_DATA_ENABLED || !fcmToken) return false;
  try {
    const res = await fetch(`${API_BASE_URL}/devices`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fcmToken }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/** Unregisters this device's FCM token (Signal Alerts off). */
export async function unregisterDevice(fcmToken: string): Promise<boolean> {
  if (!IS_LIVE_DATA_ENABLED || !fcmToken) return false;
  try {
    const res = await fetch(`${API_BASE_URL}/devices`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fcmToken }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
