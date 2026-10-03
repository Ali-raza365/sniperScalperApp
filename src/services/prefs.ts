import AsyncStorage from '@react-native-async-storage/async-storage';

const SIGNAL_ALERTS_KEY = '@sniper/signalAlerts';

export async function getSignalAlertsEnabled(): Promise<boolean> {
  const raw = await AsyncStorage.getItem(SIGNAL_ALERTS_KEY);
  if (raw == null) return true;
  return raw === '1' || raw === 'true';
}

export async function setSignalAlertsEnabled(enabled: boolean): Promise<void> {
  await AsyncStorage.setItem(SIGNAL_ALERTS_KEY, enabled ? '1' : '0');
}
