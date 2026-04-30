import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { mergedStacks } from './ScreenCollections';

const Stack = createNativeStackNavigator();

const MainNavigator: FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="BottomTab"
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
