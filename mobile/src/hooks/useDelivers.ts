import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/core';

import { useRedux } from './useRedux';
import { useLoading } from './useLoading';
import { useConnection } from './useConnection';

import { AppThunk } from '../store';
import { setDelivers } from '../store/slices/delivers';

import { getDelivers } from '../services/Delivers';

export function useDelivers() {
  const { selector, dispatch } = useRedux();
  const { enableLoading, disableLoading } = useLoading();
  const { isConnected } = useConnection();

  const orders = selector(state => state.delivers.delivers);

  const fetchData = (): AppThunk => async dispatch => {
    enableLoading();
  
    if(isConnected) {
      const response = await getDelivers();
      dispatch(setDelivers(response));
    };
  
    disableLoading();
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchData());
    }, [])
  );

  return { orders, fetchData };
};