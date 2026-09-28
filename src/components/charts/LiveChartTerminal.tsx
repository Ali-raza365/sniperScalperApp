/**
 * LiveChartTerminal — real live TradingView Advanced Chart embedded via WebView.
 * Falls back to the offline SMC candle canvas (passed as children) when the
 * WebView fails to load the widget (no network, blocked script, etc.).
 */
import React, { FC, useMemo, useState } from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { Colors } from '../../constants/Colors';
import type { AssetCategory } from '../../data/types';
import {
  buildTradingViewHtml,
  resolveTradingViewInterval,
  resolveTradingViewSymbol,
} from '../../utils/tradingView';

type Status = 'loading' | 'live' | 'error';

interface LiveChartTerminalProps {
  symbol: string;
  category?: AssetCategory;
  timeframe: string;
  height?: number;
  /** Offline fallback UI (the mock SMC candle canvas) shown if the live chart fails to load. */
  children?: React.ReactNode;
}

const LiveChartTerminal: FC<LiveChartTerminalProps> = ({
  symbol,
  category = 'metals',
  timeframe,
  height = 260,
  children,
}) => {
  const [status, setStatus] = useState<Status>('loading');

  const tvSymbol = useMemo(() => resolveTradingViewSymbol(symbol, category), [symbol, category]);
  const tvInterval = useMemo(() => resolveTradingViewInterval(timeframe), [timeframe]);
  const html = useMemo(() => buildTradingViewHtml(tvSymbol, tvInterval), [tvSymbol, tvInterval]);

  const handleMessage = (event: WebViewMessageEvent) => {
    const data = event.nativeEvent.data ?? '';
    if (data.startsWith('TV_ERROR')) {
      setStatus('error');
    } else if (data === 'TV_READY') {
      setStatus('live');
    }
  };

  if (status === 'error') {
    return <View style={[styles.fallbackWrap, { minHeight: height }]}>{children}</View>;
  }

  return (
    <View style={[styles.wrap, { height }]}>
      <WebView
        key={`${tvSymbol}-${tvInterval}`}
        originWhitelist={['*']}
        source={{ html }}
        style={styles.webview}
        javaScriptEnabled
        domStorageEnabled
        setSupportMultipleWindows={false}
        onMessage={handleMessage}
        onError={() => setStatus('error')}
        onHttpError={() => setStatus('error')}
        onLoadEnd={() =>
          setStatus(prev => (prev === 'loading' ? 'live' : prev))
        }
      />
      {status === 'loading' && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator color={Colors.primary} />
          <Text style={styles.loadingTxt}>Connecting to live feed…</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { width: '100%', backgroundColor: Colors.surfaceContainerLowest },
  webview: { flex: 1, backgroundColor: Colors.surfaceContainerLowest },
  fallbackWrap: { width: '100%' },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: Colors.surfaceContainerLowest,
  },
  loadingTxt: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
    letterSpacing: 0.5,
  },
});

export default LiveChartTerminal;
