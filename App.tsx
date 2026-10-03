/**
 * App.tsx — SniperScalper Root
 * Wires Navigation + Toast + SafeAreaProvider
 */
import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/utils/CustomToast';
import Navigation from './src/navigation/Navigation';

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#121212"
        translucent={false}
      />
      <Navigation />
      <Toast config={toastConfig} />
    </SafeAreaProvider>
  );
};

export default App;
