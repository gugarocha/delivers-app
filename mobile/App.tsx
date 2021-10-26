import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {
  useFonts,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';

import { store, persistor } from './src/store';
import { SpinLoading } from './src/components/SpinLoading';

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
        <PersistGate persistor={persistor} loading={<SpinLoading />}>
          <Routes />
        </PersistGate>
      </Provider>
    </>
  );
};
