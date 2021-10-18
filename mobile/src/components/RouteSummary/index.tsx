import React from 'react';
import { View, SectionList, Text } from 'react-native';

import { SpinLoading } from '../SpinLoading';

import { useLoading } from '../../hooks/useLoading';

import { SummaryProps } from '../../utils/types';

import { styles } from './styles';

interface ListHeaderProps {
  ordersTotal: number;
  itemsTotal: number;
};

function ListHeader({ ordersTotal, itemsTotal }: ListHeaderProps) {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerLabel}>
        Total de
      </Text>

      <View style={styles.headerTotalsContainer}>
        <View style={styles.headerTotalBlock}>
          <Text style={styles.headerTotalText}>
            {ordersTotal} Pedidos
          </Text>
        </View>

        <View style={styles.headerDivider} />

        <View style={styles.headerTotalBlock}>
          <Text style={styles.headerTotalText}>
            {itemsTotal} Itens
          </Text>
        </View>
      </View>
    </View>
  );
};

interface SectionHeaderProps {
  category: string;
  itemsCategoryTotal: number;
};

function SectionHeader({ category, itemsCategoryTotal }: SectionHeaderProps) {
  return (
    <View style={styles.sectionHeaderContainer}>
      <Text>
        {category}
      </Text>
      <Text style={styles.sectionHeaderItemsTotal}>
        {itemsCategoryTotal} itens
      </Text>
    </View>
  );
};

interface RouteSummaryProps {
  summary: SummaryProps;
};

export function RouteSummary({ summary }: RouteSummaryProps) {
  const { isLoading } = useLoading();

  return (
    isLoading ? (
      <View style={styles.container}>
        <SpinLoading />
      </View>
    ) :
      <View style={styles.container}>
        <SectionList
          sections={summary.categories}
          keyExtractor={item => String(item.id)}
          contentContainerStyle={styles.contentContainer}
          ListHeaderComponent={
            <ListHeader
              ordersTotal={summary.ordersTotal}
              itemsTotal={summary.itemsTotal}
            />
          }
          renderSectionHeader={({ section: { category, itemsCategoryTotal } }) =>
            itemsCategoryTotal > 0
              ? (
                <SectionHeader
                  category={category}
                  itemsCategoryTotal={itemsCategoryTotal}
                />
              )
              : <View />
          }
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
          renderItem={({ item }) => (
            <Text style={styles.productItem}>
              {item.productAmount}  x  {item.product}
            </Text>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
  );
};