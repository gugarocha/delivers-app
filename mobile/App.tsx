import React from 'react';
import {
  useFonts,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';

import Routes from './src/routes';

import { GlobalStatesProvider } from './src/hooks/globalStates';
import { SelectedProductsProvider } from './src/hooks/selectedProducts';

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

      <GlobalStatesProvider>
        <SelectedProductsProvider>
          <Routes />
        </SelectedProductsProvider>
      </GlobalStatesProvider>
    </>
  );
};
