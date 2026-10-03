import type { AssetCategory } from '../data/types';

/**
 * Maps our internal watchlist symbols (BTCUSD, EURUSD, NAS100, XAUUSD, ...)
 * to TradingView exchange:symbol identifiers used by the Advanced Chart widget.
 */
export const resolveTradingViewSymbol = (
  symbol: string,
  category: AssetCategory = 'metals',
): string => {
  switch (category) {
    case 'forex':
      return `FX:${symbol}`;
    case 'crypto':
      return `COINBASE:${symbol}`;
    case 'indices':
      return `OANDA:${symbol}USD`;
    case 'metals':
    default:
      return `OANDA:${symbol}`;
  }
};

/** Maps our local timeframe chips (1m/5m/15m/1h/4h/D) to TradingView interval codes. */
export const TIMEFRAME_TO_TV_INTERVAL: Record<string, string> = {
  '1m': '1',
  '5m': '5',
  '15m': '15',
  '1h': '60',
  '4h': '240',
  D: 'D',
};

export const resolveTradingViewInterval = (timeframe: string): string =>
  TIMEFRAME_TO_TV_INTERVAL[timeframe] ?? 'D';

/**
 * Builds a standalone HTML document embedding the TradingView Advanced
 * Real-Time Chart widget, styled to match the app's dark "Institutional
 * Archive" theme. Loaded into a WebView by LiveChartTerminal.
 */
export const buildTradingViewHtml = (tvSymbol: string, tvInterval: string): string => `<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
    <style>
      html, body { margin: 0; padding: 0; background: #0d0d0d; height: 100%; overflow: hidden; }
      #tv_chart_container { height: 100%; width: 100%; }
    </style>
  </head>
  <body>
    <div id="tv_chart_container"></div>
    <script>
      window.onerror = function (message) {
        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage('TV_ERROR:' + message);
        }
        return true;
      };
    </script>
    <script src="https://s3.tradingview.com/tv.js"></script>
    <script>
      try {
        new TradingView.widget({
          autosize: true,
          symbol: '${tvSymbol}',
          interval: '${tvInterval}',
          timezone: 'Etc/UTC',
          theme: 'dark',
          style: '1',
          locale: 'en',
          toolbar_bg: '#0d0d0d',
          backgroundColor: '#0d0d0d',
          gridColor: 'rgba(86,67,52,0.12)',
          enable_publishing: false,
          hide_top_toolbar: false,
          hide_legend: false,
          save_image: false,
          allow_symbol_change: false,
          container_id: 'tv_chart_container',
        });
        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage('TV_READY');
        }
      } catch (e) {
        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage('TV_ERROR:' + e.message);
        }
      }
    </script>
  </body>
</html>`;
