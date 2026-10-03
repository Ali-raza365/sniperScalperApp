import {
  ensureFcmToken,
  onFcmTokenRefresh,
} from './notifications';
import { registerDevice, unregisterDevice } from './deviceRegistration';
import { getSignalAlertsEnabled } from './prefs';

/** Sync FCM token with the ingest server from current Signal Alerts pref. */
export async function syncPushRegistration(): Promise<void> {
  const alertsOn = await getSignalAlertsEnabled();
  const token = await ensureFcmToken();
  if (!token) return;
  if (alertsOn) {
    await registerDevice(token);
  } else {
    await unregisterDevice(token);
  }
}

export function subscribeTokenRefresh(): () => void {
  return onFcmTokenRefresh(async token => {
    const alertsOn = await getSignalAlertsEnabled();
    if (alertsOn) {
      await registerDevice(token);
    }
  });
}
