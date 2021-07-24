import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import OrdersRoute from '../screens/OrdersRoute';
import OrderCreate from '../screens/OrderCreate';
import AddProducts from '../screens/AddProducts';

export default function Routes() {
  const { Navigator, Screen } = createStackNavigator();

  return (
    <NavigationContainer>
      <Navigator screenOptions={{headerShown: false}} >
        <Screen name='Home' component={Home} />
        <Screen name='OrdersRoute' component={OrdersRoute} />
        <Screen name='OrderCreate' component={OrderCreate} />
        <Screen name='AddProducts' component={AddProducts} />
      </Navigator>
    </NavigationContainer>
  );
};