/**
 * App.tsx — SniperScalper Root
 * Optional Auth + Alerts (FCM) + Navigation + Toast
 */
import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/utils/CustomToast';
import Navigation from './src/navigation/Navigation';
import { AuthProvider } from './src/auth/AuthContext';
import { AlertsProvider } from './src/providers/AlertsProvider';

const App = () => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AlertsProvider>
          <StatusBar
            barStyle="light-content"
            backgroundColor="#121212"
            translucent={false}
          />
          <Navigation />
          <Toast config={toastConfig} />
        </AlertsProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default App;
