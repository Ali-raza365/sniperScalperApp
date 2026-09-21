import { API_BASE_URL, SIGNAL_API_KEY } from './apiConfig';
import { mapIncomingSignal } from './mapSignal';
import type { AssetCategory, FaqCategory, Signal, SignalStatus, WatchlistAsset } from './types';
import {
  ABOUT_PHILOSOPHY,
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

export type FetchSignalsResult = {
  signals: Signal[];
  live: boolean;
};

function newestFirst(signals: Signal[]): Signal[] {
  return [...signals].sort((a, b) => {
    const aTime = Date.parse(a.openedAt || '') || 0;
    const bTime = Date.parse(b.openedAt || '') || 0;
    return bTime - aTime;
  });
}

/**
 * App data repository.
 * Screens read from these getters so mock catalogs can later be swapped for API calls.
 */
export const marketRepository = {
  getSignals: () => SIGNALS,
  fetchSignals: async (status?: SignalStatus | 'all'): Promise<FetchSignalsResult> => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);
    try {
      const qs = status && status !== 'all' ? `?status=${status}` : '';
      const response = await fetch(`${API_BASE_URL}/signals${qs}`, {
        headers: { 'x-api-key': SIGNAL_API_KEY },
        signal: controller.signal,
      });
      if (!response.ok) {
        throw new Error(`signals ${response.status}`);
      }
      const json = await response.json();
      const raw = Array.isArray(json) ? json : json.signals;
      if (!Array.isArray(raw)) {
        throw new Error('signals payload');
      }
      return { signals: newestFirst(raw.map(mapIncomingSignal)), live: true };
    } catch {
      const fallback =
        status && status !== 'all'
          ? SIGNALS.filter(item => (item.status ?? 'open') === status)
          : SIGNALS;
      return { signals: newestFirst(fallback.map(mapIncomingSignal)), live: false };
    } finally {
      clearTimeout(timer);
    }
  },
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
