import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/core';

import { useRedux } from './useRedux';
import { useLoading } from './useLoading';
import { useConnection } from './useConnection';

import { AppThunk } from '../store';
import { setDelivers } from '../store/slices/orders';

import { getDelivers } from '../services/Delivers';

export function useDelivers() {
  const { selector, dispatch } = useRedux();
  const { enableLoading, disableLoading } = useLoading();
  const { isConnected } = useConnection();

  const { delivers } = selector(state => state.orders);

  const fetchData = (): AppThunk => async dispatch => {
    enableLoading();

    if (isConnected) {
      const response = await getDelivers();
      dispatch(setDelivers(response));
    };

    disableLoading();
  };

  const fetchDelivers = () => {
    dispatch(fetchData());
  };

  useFocusEffect(
    useCallback(() => {
      fetchDelivers();
    }, [])
  );

  return { delivers, fetchDelivers };
};