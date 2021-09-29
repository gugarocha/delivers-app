import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/core';

import { useGlobalStates } from './globalStates';
import {
  getRoutes,
  newRoute,
  editRouteInfo,
  setFinished
} from '../services/Routes';

import { RouteProps } from '../utils/types';

export function useRoutes() {
  const [routes, setRoutes] = useState<RouteProps[]>([]);
  const { isConnected, setLoading } = useGlobalStates();

  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        setLoading(true);
        const data = await getRoutes();

        setRoutes(data);
      };

      isConnected && fetchData();
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