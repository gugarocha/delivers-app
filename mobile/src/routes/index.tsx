import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home';

const Routes: React.FC = () => {
  const { Navigator, Screen } = createStackNavigator();

  return (
    <NavigationContainer>
      <Navigator screenOptions={{headerShown: false}} >
        <Screen name='Home' component={Home}  />
      </Navigator>
    </NavigationContainer>
  );
};

export default Routes;