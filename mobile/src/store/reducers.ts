import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

import loadingReducer from './slices/loading';
import connectionReducer from './slices/connection'
import productsReducer from './slices/products';
import ordersReducer from './slices/orders';
import actionsQueueReducer from './slices/actionsQueue';

const ordersPersistConfig = {
  key: 'orders',
  storage: AsyncStorage,
};

const queuePersistConfig = {
  key: 'queue',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  loading: loadingReducer,
  connection: connectionReducer,
  products: productsReducer,
  orders: persistReducer(ordersPersistConfig, ordersReducer),
  actionsQueue: persistReducer(queuePersistConfig, actionsQueueReducer)
});

export default rootReducer;