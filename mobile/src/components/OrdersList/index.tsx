import React from 'react';
import { FlatList, ListRenderItem } from 'react-native';

import { OrdersProps } from '../../utils/types';
import { OrderCard } from '../OrderCard';

import { styles } from './styles';

interface Props {
  data: OrdersProps[];
  ListHeaderComponent?: ListRenderItem<boolean>
  ListFooterComponent?: ListRenderItem<React.ReactNode>
};

export function OrdersList({ data, ...rest }: Props) {
  return (
    <FlatList
      data={data}
      contentContainerStyle={styles.contentContainer}
      renderItem={({ item }) => <OrderCard data={item} />}
      keyExtractor={item => String(item.id)}
      showsVerticalScrollIndicator={false}
      {...rest}
    />
  );
};