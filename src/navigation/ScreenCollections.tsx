import type { ComponentType } from 'react';
import BottomTab from './BottomTab';
import WatchlistScreen from '../screens/dashboard/WatchlistScreen';
import SignalsScreen from '../screens/dashboard/SignalsScreen';
import AboutUsScreen from '../screens/dashboard/AboutUsScreen';
import ContactUsScreen from '../screens/dashboard/ContactUsScreen';
import FaqsScreen from '../screens/dashboard/FaqsScreen';
import type { RootStackParamList } from './types';

type StackEntry = {
  name: keyof RootStackParamList;
  component: ComponentType<any>;
};

export const dashboardStack: StackEntry[] = [
  { name: 'BottomTab', component: BottomTab },
  { name: 'Watchlist', component: WatchlistScreen },
  { name: 'Signals', component: SignalsScreen },
  { name: 'AboutUs', component: AboutUsScreen },
  { name: 'ContactUs', component: ContactUsScreen },
  { name: 'Faqs', component: FaqsScreen },
];

export const authStack: StackEntry[] = [];

export const mergedStacks: StackEntry[] = [...dashboardStack, ...authStack];
