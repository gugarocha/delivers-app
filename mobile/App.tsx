import React from 'react';
import { Provider } from 'react-redux';
import {
  useFonts,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';

import { store } from './src/store';

import Routes from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />
  };

  return (
    <>
      <StatusBar style="light" />

      <Provider store={store}>
        <Routes />
      </Provider>
    </>
  );
};
