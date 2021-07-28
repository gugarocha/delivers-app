import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

import RoutesList from '../screens/RoutesList';
import Delivers from '../screens/Delivers';
import AllProducts from '../screens/AllProducts';

import { theme } from '../global/styles';

const { Navigator, Screen } = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Navigator
      tabBarOptions={{
        style: styles.container,
        activeTintColor: theme.colors.primary,
        inactiveTintColor: theme.colors.gray,
        labelStyle: styles.label,
      }}
    >
      <Screen
        name='Rotas'
        component={RoutesList}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <View style={focused && styles.tabBarIconContainer}>
              <Feather name='truck' size={size} color={color} />
            </View>
          )
        }}
      />

      <Screen
        name='Entregas'
        component={Delivers}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <View style={focused && styles.tabBarIconContainer}>
              <Feather name='shopping-cart' size={size} color={color} />
            </View>
          )
        }}
      />

      <Screen
        name='Produtos'
        component={AllProducts}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <View style={focused && styles.tabBarIconContainer}>
              <Feather name='package' size={size} color={color} />
            </View>
          )
        }}
      />
    </Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 2,
  },
  label: {
    fontSize: 12,
  },
  tabBarIconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderColor: theme.colors.primary,
    borderTopWidth: 1,
  }
});