import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/core';

import { useLoading } from './loading';
import { getDelivers } from '../services/Delivers';

import { OrdersProps } from '../utils/types';

export function useDelivers() {
  const { setLoading } = useLoading();
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