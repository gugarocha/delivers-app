import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TabRoutes from './tab.routes';
import OrdersRoute from '../screens/OrdersRoute';
import OrderCreate from '../screens/OrderCreate';
import AddProducts from '../screens/AddProducts';
import ProductCreate from '../screens/ProductCreate';

export default function Routes() {
  const { Navigator, Screen } = createStackNavigator();

  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }} >
        <Screen name='Home' component={TabRoutes} />
        <Screen name='OrdersRoute' component={OrdersRoute} />
        <Screen name='OrderCreate' component={OrderCreate} />
        <Screen name='AddProducts' component={AddProducts} />
        <Screen name='ProductCreate' component={ProductCreate} />
      </Navigator>
    </NavigationContainer>
  );
};