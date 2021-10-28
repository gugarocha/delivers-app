import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

import loadingReducer from './slices/loading';
import connectionReducer from './slices/connection'
import productsReducer from './slices/products';
import deliversReducer from './slices/delivers';
import routesReducer from './slices/routes';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['delivers', 'routes', 'ordersRoute']
};

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    connection: connectionReducer,
    products: productsReducer,
    delivers: persistReducer(persistConfig, deliversReducer),
    routes: persistReducer(persistConfig, routesReducer)
  },
  middleware: [thunk]
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;