import type { AssetCategory } from '../data/types';

export type ChartsParams = { symbol?: string; category?: AssetCategory } | undefined;

export type TabParamList = {
  Home: undefined;
  Charts: ChartsParams;
  Academy: undefined;
  News: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  BottomTab: { screen?: keyof TabParamList; params?: ChartsParams } | undefined;
  Watchlist: undefined;
  AboutUs: undefined;
  ContactUs: undefined;
  Faqs: undefined;
};
