import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { mergedStacks } from './ScreenCollections';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigator: FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={() => ({
        headerShown: false,
        animation: 'slide_from_right',
      })}>
      {mergedStacks.map((item, index) => (
        <Stack.Screen
          key={index}
          name={item.name}
          component={item.component}
        />
      ))}
    </Stack.Navigator>
  );
};

export default MainNavigator;
