import React, { FC } from 'react';
import { View, Text, Platform, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../constants/Colors';
import { FONTS } from '../constants/Fonts';
import HomeScreen from '../screens/dashboard/HomeScreen';
import ChartScreen from '../screens/dashboard/ChartScreen';
import AcademyScreen from '../screens/dashboard/AcademyScreen';
import NewsScreen from '../screens/dashboard/NewsScreen';
import SettingsScreen from '../screens/dashboard/SettingsScreen';
import type { TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

interface TabIconProps {
  name: string;
  focused: boolean;
  label: string;
}

const SMCTabIcon: FC<TabIconProps> = ({ name, focused, label }) => (
  <View style={[styles.tabItem, focused && styles.tabItemActive]}>
    <MaterialIcons
      name={name as any}
      size={22}
      color={focused ? Colors.primary : 'rgba(221,193,174,0.60)'}
    />
    <Text style={[styles.tabLabel, focused ? styles.tabLabelActive : styles.tabLabelInactive]}>
      {label}
    </Text>
  </View>
);

const BottomTab: FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: 'rgba(57,57,57,0.72)',
          borderTopWidth: 0,
          height: Platform.OS === 'ios' ? 85 : 68,
          paddingBottom: Platform.OS === 'ios' ? 20 : 8,
          paddingTop: 4,
          position: 'absolute',
          elevation: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -8 },
          shadowOpacity: 0.35,
          shadowRadius: 24,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: 'rgba(221,193,174,0.60)',
      }}>

      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <SMCTabIcon name="home" focused={focused} label="HOME" />
          ),
        }}
      />

      <Tab.Screen
        name="Charts"
        component={ChartScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <SMCTabIcon name="show-chart" focused={focused} label="CHARTS" />
          ),
        }}
      />

      <Tab.Screen
        name="Academy"
        component={AcademyScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <SMCTabIcon name="school" focused={focused} label="ACADEMY" />
          ),
        }}
      />

      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <SMCTabIcon name="article" focused={focused} label="NEWS" />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <SMCTabIcon name="settings" focused={focused} label="SETTINGS" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 56,
  },
  tabItemActive: {
    backgroundColor: 'rgba(255,140,0,0.12)',
  },
  tabLabel: {
    fontSize: 8.5,
    fontFamily: FONTS.SemiBold,
    letterSpacing: 1.1,
    marginTop: 2,
    textTransform: 'uppercase',
  },
  tabLabelActive: {
    color: Colors.primary,
  },
  tabLabelInactive: {
    color: 'rgba(221,193,174,0.60)',
  },
});

export default BottomTab;
