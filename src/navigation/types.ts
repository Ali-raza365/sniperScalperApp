export type TabParamList = {
  Home: undefined;
  Charts: undefined;
  Academy: undefined;
  News: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  BottomTab: { screen?: keyof TabParamList } | undefined;
  Watchlist: undefined;
  Signals: undefined;
  AboutUs: undefined;
  ContactUs: undefined;
  Faqs: undefined;
};
