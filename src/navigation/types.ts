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
  Splash: undefined;
  BottomTab: { screen?: keyof TabParamList; params?: ChartsParams } | undefined;
  CourseDetail: { courseId: string };
  Watchlist: undefined;
  AboutUs: undefined;
  ContactUs: undefined;
  Faqs: undefined;
  /** Optional — app works without signing in. */
  Login: undefined;
  Register: undefined;
};
