import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/core';

import { useGlobalStates } from './globalStates';
import { getDelivers } from '../services/Delivers';

import { OrdersProps } from '../utils/types';

export function useDelivers() {
  const { setLoading } = useGlobalStates();
  const [orders, setOrders] = useState<OrdersProps[]>([]);

  async function fetchData() {  
    const data = await getDelivers();
    setOrders(data);

    setLoading(false);
  };
  
  useFocusEffect(
    useCallback(() => {
      setLoading(true);

      fetchData();
    }, [])
  );

  return { orders, fetchData };
};