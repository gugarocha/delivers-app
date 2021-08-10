import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/core';

import { getRoutes, newRoute, editRouteInfo } from '../services/Routes';
import { RouteProps } from '../utils/types';

export function useRoutes() {
  const [routes, setRoutes] = useState<RouteProps[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        const data = await getRoutes();

        setRoutes(data);
        setLoading(false);
      };

      fetchData();
    }, [])
  );

  return {
    routes,
    loading,
    newRoute,
    editRouteInfo,
  };
};