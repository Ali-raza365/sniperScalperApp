import { PermissionsAndroid, Platform } from 'react-native';
import {
  AuthorizationStatus,
  getMessaging,
  getToken,
  onTokenRefresh,
  registerDeviceForRemoteMessages,
  requestPermission,
} from '@react-native-firebase/messaging';

/**
 * Requests notification permission and returns an FCM device token, or null.
 */
export async function ensureFcmToken(): Promise<string | null> {
  try {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        return null;
      }
    }

    const messaging = getMessaging();
    const authStatus = await requestPermission(messaging);
    const enabled =
      authStatus === AuthorizationStatus.AUTHORIZED ||
      authStatus === AuthorizationStatus.PROVISIONAL;

    if (!enabled && Platform.OS === 'ios') {
      return null;
    }

    await registerDeviceForRemoteMessages(messaging);
    const token = await getToken(messaging);
    return token || null;
  } catch {
    return null;
  }
}

export function onFcmTokenRefresh(handler: (token: string) => void): () => void {
  return onTokenRefresh(getMessaging(), handler);
}
