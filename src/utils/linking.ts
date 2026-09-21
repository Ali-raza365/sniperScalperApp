import { Linking } from 'react-native';
import { showToast } from './CustomToast';

export async function openExternal(url: string) {
  try {
    await Linking.openURL(url);
  } catch {
    showToast.error('Unable to open this destination from the archive desk.');
  }
}
