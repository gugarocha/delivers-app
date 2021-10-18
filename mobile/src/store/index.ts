import { configureStore } from '@reduxjs/toolkit';

import loadingReducer from './slices/loading';
import connectionReducer from './slices/connection'
import productsReducer from './slices/products';

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    connection: connectionReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;