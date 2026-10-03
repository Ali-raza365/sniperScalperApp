/**
 * App.tsx — SniperScalper Root
 * Wires Auth + Navigation + Toast + SafeAreaProvider
 */
import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/utils/CustomToast';
import Navigation from './src/navigation/Navigation';
import { AuthProvider } from './src/auth/AuthContext';

const App = () => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#121212"
          translucent={false}
        />
        <Navigation />
        <Toast config={toastConfig} />
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default App;
