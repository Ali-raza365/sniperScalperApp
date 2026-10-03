import { getAuth, getIdToken } from '@react-native-firebase/auth';
import { API_BASE_URL, IS_LIVE_DATA_ENABLED } from './apiConfig';
import { mapIncomingSignal } from './mapSignal';
import type { AssetCategory, FaqCategory, OhlcBar, Signal, SignalStatus, WatchlistAsset } from './types';
import {
  ABOUT_PHILOSOPHY,
  ACADEMY_CATALOG,
  ACADEMY_COURSE,
  CHART_SNAPSHOT,
  CONTACT_CATEGORIES,
  CONTACT_CHANNELS,
  CONTACT_STATS,
  COURSE_PREVIEWS,
  ENQUIRY_CHANNELS,
  FAQ_CATEGORIES,
  HOME_BENTO,
  HOME_CHART_CANDLES,
  NEWS_FEED,
  SETTINGS_PROFILE,
  SIGNALS,
  WATCHLIST_ASSETS,
  WATCHLIST_FILTERS,
  WATCHLIST_PULSE,
} from './mockData';

async function bearerHeaders(): Promise<Record<string, string> | null> {
  const user = getAuth().currentUser;
  if (!user) return null;
  try {
    const idToken = await getIdToken(user);
    return { Authorization: `Bearer ${idToken}` };
  } catch {
    return null;
  }
}

/**
 * LiveMarketProvider — talks to the public MT5 ingest server (see /server).
 * App routes require a Firebase ID token. Returns `null` on any failure so
 * callers can fall back to the bundled mock catalogs.
 */
const LiveMarketProvider = {
  async fetchSignals(
    status: SignalStatus | 'all',
    account?: string,
  ): Promise<Signal[] | null> {
    if (!IS_LIVE_DATA_ENABLED) return null;
    const headers = await bearerHeaders();
    if (!headers) return null;
    try {
      const params = new URLSearchParams();
      if (status !== 'all') params.set('status', status);
      if (account?.trim()) params.set('account', account.trim());
      const qs = params.toString() ? `?${params.toString()}` : '';
      const res = await fetch(`${API_BASE_URL}/signals${qs}`, { headers });
      if (!res.ok) return null;
      const json = await res.json();
      const raw = Array.isArray(json?.signals) ? json.signals : [];
      return raw.map(mapIncomingSignal);
    } catch {
      return null;
    }
  },

  async fetchOhlc(symbol: string, timeframe: string, limit = 200): Promise<OhlcBar[] | null> {
    if (!IS_LIVE_DATA_ENABLED) return null;
    try {
      const qs = `?symbol=${encodeURIComponent(symbol)}&timeframe=${encodeURIComponent(timeframe)}&limit=${limit}`;
      const res = await fetch(`${API_BASE_URL}/ohlc${qs}`);
      if (!res.ok) return null;
      const json = await res.json();
      return Array.isArray(json?.bars) ? json.bars : [];
    } catch {
      return null;
    }
  },
};

/**
 * App data repository.
 * Screens read from these getters so mock catalogs can later be swapped for API calls.
 */
export const marketRepository = {
  /** Synchronous mock accessor — kept for callers that don't need live data. */
  getSignals: () => SIGNALS,

  /**
   * Live-first signal fetch with mock fallback. Pass `account` (MT5 login) to
   * filter; the server also enforces the caller's registered accounts.
   */
  fetchSignals: async (
    status: SignalStatus | 'all' = 'all',
    account?: string,
  ): Promise<{ signals: Signal[]; live: boolean }> => {
    const live = await LiveMarketProvider.fetchSignals(status, account);
    if (live !== null) {
      return { signals: live, live: true };
    }
    return { signals: SIGNALS, live: false };
  },

  /** Live-first OHLC fetch; returns null (no fallback data) when live data is unavailable. */
  fetchOhlc: (symbol: string, timeframe: string, limit?: number) =>
    LiveMarketProvider.fetchOhlc(symbol, timeframe, limit),

  isLiveDataEnabled: () => IS_LIVE_DATA_ENABLED,

  getHomeBento: () => HOME_BENTO,
  getCoursePreviews: () => COURSE_PREVIEWS,
  getEnquiryChannels: () => ENQUIRY_CHANNELS,
  getHomeChartCandles: () => HOME_CHART_CANDLES,
  getChartSnapshot: () => CHART_SNAPSHOT,
  getWatchlistPulse: () => WATCHLIST_PULSE,
  getWatchlistFilters: () => WATCHLIST_FILTERS,
  getWatchlistAssets: (opts?: { category?: 'all' | AssetCategory; query?: string }): WatchlistAsset[] => {
    const category = opts?.category ?? 'all';
    const query = (opts?.query ?? '').trim().toLowerCase();
    return WATCHLIST_ASSETS.filter(asset => {
      const matchesCategory = category === 'all' || asset.category === category;
      const matchesQuery =
        !query ||
        asset.symbol.toLowerCase().includes(query) ||
        asset.name.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
  },
};

export const academyRepository = {
  getCourse: () => ACADEMY_COURSE,
  getCatalog: () => ACADEMY_CATALOG,
  getCourseById: (id: string) => ACADEMY_CATALOG.find(c => c.id === id) ?? ACADEMY_CATALOG[0],
};

export const newsRepository = {
  getFeed: () => NEWS_FEED,
};

export const supportRepository = {
  getFaqs: (query?: string): FaqCategory[] => {
    const q = (query ?? '').trim().toLowerCase();
    if (!q) {
      return FAQ_CATEGORIES;
    }
    return FAQ_CATEGORIES.map(category => ({
      ...category,
      items: category.items.filter(
        item =>
          item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q),
      ),
    })).filter(category => category.items.length > 0);
  },
  getContactChannels: () => CONTACT_CHANNELS,
  getContactStats: () => CONTACT_STATS,
  getContactCategories: () => CONTACT_CATEGORIES,
  getAboutPhilosophy: () => ABOUT_PHILOSOPHY,
};

export const accountRepository = {
  getProfile: () => SETTINGS_PROFILE,
};
