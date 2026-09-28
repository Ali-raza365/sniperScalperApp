/**
 * Jest manual mock for react-native-webview.
 * The real native WebView module isn't available in the Jest test environment,
 * so we swap in a lightweight View-based stand-in for rendering tests.
 */
import React from 'react';
import { View } from 'react-native';

export const WebView = (props: any) => <View testID="mock-webview" {...props} />;

export default WebView;
