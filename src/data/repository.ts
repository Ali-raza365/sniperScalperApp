import type { AssetCategory, FaqCategory, WatchlistAsset } from './types';
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

/**
 * App data repository.
 * Screens read from these getters so mock catalogs can later be swapped for API calls.
 */
export const marketRepository = {
  getSignals: () => SIGNALS,
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
