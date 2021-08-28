import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/core';

import { useLoading } from './loading';
import { getDelivers } from '../services/Delivers';

import { OrdersProps } from '../utils/types';

export function useDelivers() {
  const { setLoading } = useLoading();
  const [orders, setOrders] = useState<OrdersProps[]>([]);

  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        setLoading(true);

        const data = await getDelivers();
        setOrders(data);

        setLoading(false);
      };

      fetchData();
    }, [])
  );

  return { orders };
};