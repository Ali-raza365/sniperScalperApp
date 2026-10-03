import AsyncStorage from '@react-native-async-storage/async-storage';

const MT5_ACCOUNT_KEY = '@sniper/mt5Account';
const SIGNAL_ALERTS_KEY = '@sniper/signalAlerts';

export async function getMt5Account(): Promise<string> {
  return (await AsyncStorage.getItem(MT5_ACCOUNT_KEY))?.trim() ?? '';
}

export async function setMt5Account(account: string): Promise<void> {
  await AsyncStorage.setItem(MT5_ACCOUNT_KEY, account.trim());
}

export async function getSignalAlertsEnabled(): Promise<boolean> {
  const raw = await AsyncStorage.getItem(SIGNAL_ALERTS_KEY);
  if (raw == null) return true;
  return raw === '1' || raw === 'true';
}

export async function setSignalAlertsEnabled(enabled: boolean): Promise<void> {
  await AsyncStorage.setItem(SIGNAL_ALERTS_KEY, enabled ? '1' : '0');
}
