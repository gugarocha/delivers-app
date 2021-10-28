import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/core';

import { useRedux } from './useRedux';
import { useLoading } from './useLoading';
import { useConnection } from './useConnection';

import {
  getRoutes,
  newRoute,
  editRouteInfo,
  setFinished
} from '../services/Routes';
import { AppThunk } from '../store';
import { setRoutes } from '../store/slices/routes';


export function useRoutes() {
  const { selector, dispatch } = useRedux();
  const { enableLoading, disableLoading } = useLoading();
  const { isConnected } = useConnection();
  
  const { routes } = selector(state => state.routes);

  useFocusEffect(
    useCallback(() => {
      const fetchRoutes = (): AppThunk => async dispatch => {
        enableLoading();

        if (isConnected) {
          const response = await getRoutes();
          dispatch(setRoutes(response));
        };

        disableLoading();
      };

      dispatch(fetchRoutes());
    }, [isConnected])
  );

  return {
    routes,
    newRoute,
    editRouteInfo,
    setFinished
  };
};