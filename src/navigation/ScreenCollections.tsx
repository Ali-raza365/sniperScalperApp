import type { ComponentType } from 'react';
import BottomTab from './BottomTab';
import SplashScreen from '../screens/SplashScreen';
import CourseDetailScreen from '../screens/dashboard/CourseDetailScreen';
import WatchlistScreen from '../screens/dashboard/WatchlistScreen';
import AboutUsScreen from '../screens/dashboard/AboutUsScreen';
import ContactUsScreen from '../screens/dashboard/ContactUsScreen';
import FaqsScreen from '../screens/dashboard/FaqsScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import type { RootStackParamList } from './types';

type StackEntry = {
  name: keyof RootStackParamList;
  component: ComponentType<any>;
};

export const dashboardStack: StackEntry[] = [
  { name: 'Splash', component: SplashScreen },
  { name: 'BottomTab', component: BottomTab },
  { name: 'CourseDetail', component: CourseDetailScreen },
  { name: 'Watchlist', component: WatchlistScreen },
  { name: 'AboutUs', component: AboutUsScreen },
  { name: 'ContactUs', component: ContactUsScreen },
  { name: 'Faqs', component: FaqsScreen },
  { name: 'Login', component: LoginScreen },
  { name: 'Register', component: RegisterScreen },
];

export const mergedStacks: StackEntry[] = [...dashboardStack];
