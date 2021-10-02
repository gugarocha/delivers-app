import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useGlobalStates } from './globalStates';
import { getDelivers } from '../services/Delivers';

import { OrdersProps } from '../utils/types';
import { COLLECTION_DELIVERS } from '../configs/database';

export function useDelivers() {
  const { isConnected, setLoading } = useGlobalStates();
  const [orders, setOrders] = useState<OrdersProps[]>([]);

  async function fetchData() {
    setLoading(true);

    if (isConnected) {
      const dataFromServer = await getDelivers();
      setOrders(dataFromServer);

      await AsyncStorage.setItem(COLLECTION_DELIVERS, JSON.stringify(dataFromServer));
    } else {
      const storage = await AsyncStorage.getItem(COLLECTION_DELIVERS);
      storage && setOrders(JSON.parse(storage));
    };

    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  return { orders, fetchData };
};