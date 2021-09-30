import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useGlobalStates } from './globalStates';
import {
  getRoutes,
  newRoute,
  editRouteInfo,
  setFinished
} from '../services/Routes';

import { RouteProps } from '../utils/types';
import { COLLECTION_ROUTES } from '../configs/database';

export function useRoutes() {
  const [routes, setRoutes] = useState<RouteProps[]>([]);
  const { isConnected, setLoading } = useGlobalStates();

  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        setLoading(true);

        if (isConnected) {
          const dataFromServer = await getRoutes();
          setRoutes(dataFromServer);

          await AsyncStorage.setItem(COLLECTION_ROUTES, JSON.stringify(dataFromServer));
        } else {
          const storage = await AsyncStorage.getItem(COLLECTION_ROUTES);

          storage && setRoutes(JSON.parse(storage));
        };
      };

      fetchData();
      setLoading(false);
    }, [isConnected])
  );

  return {
    routes,
    newRoute,
    editRouteInfo,
    setFinished
  };
};