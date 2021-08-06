import { useState, useEffect } from 'react';

import { getRoutes } from '../services/Routes';
import { RouteProps } from '../utils/types';

export function useRoutes() {
  const [routes, setRoutes] = useState<RouteProps[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getRoutes();

      setRoutes(data);
    };

    fetchData();
  }, []);

  return [routes];
};