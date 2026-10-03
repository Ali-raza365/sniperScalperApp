import React, { FC } from 'react';
import { View, Text, Platform, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from '../constants/Colors';
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
      color={focused ? Colors.primary : Colors.textMuted}
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
          backgroundColor: 'rgba(18,18,18,0.96)',
          borderTopWidth: 0,
          height: Platform.OS === 'ios' ? 85 : 68,
          paddingBottom: Platform.OS === 'ios' ? 20 : 8,
          paddingTop: 4,
          position: 'absolute',
          elevation: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -8 },
          shadowOpacity: 0.5,
          shadowRadius: 32,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
      }}>

      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <SMCTabIcon name="home" focused={focused} label="Home" />
          ),
        }}
      />

      <Tab.Screen
        name="Charts"
        component={ChartScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <SMCTabIcon name="show-chart" focused={focused} label="Charts" />
          ),
        }}
      />

      <Tab.Screen
        name="Academy"
        component={AcademyScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <SMCTabIcon name="school" focused={focused} label="Academy" />
          ),
        }}
      />

      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <SMCTabIcon name="article" focused={focused} label="News" />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <SMCTabIcon name="settings" focused={focused} label="Settings" />
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
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    minWidth: 60,
  },
  tabItemActive: {
    backgroundColor: 'rgba(246,177,122,0.16)',
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.3,
    marginTop: 2,
  },
  tabLabelActive: {
    color: Colors.primary,
  },
  tabLabelInactive: {
    color: Colors.textMuted,
  },
});

export default BottomTab;
