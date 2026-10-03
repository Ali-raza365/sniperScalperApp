export const AuthorizationStatus = {
  AUTHORIZED: 1,
  PROVISIONAL: 2,
  DENIED: 0,
  NOT_DETERMINED: -1,
};

export function getMessaging() {
  return {};
}

export async function requestPermission() {
  return AuthorizationStatus.AUTHORIZED;
}

export async function registerDeviceForRemoteMessages() {
  return undefined;
}

export async function getToken() {
  return 'mock-fcm-token';
}

export function onTokenRefresh(_messaging: unknown, _handler: (token: string) => void) {
  return () => undefined;
}
