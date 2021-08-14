import React from 'react';
import { View, SectionList, Text } from 'react-native';

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
  data: SummaryProps
};
export function RouteSummary({ data }: RouteSummaryProps) {
  return (
    <View style={styles.container}>
      <SectionList
        sections={data.categories}
        keyExtractor={item => String(item.id)}
        contentContainerStyle={styles.contentContainer}
        ListHeaderComponent={
          <ListHeader
            ordersTotal={data.ordersTotal}
            itemsTotal={data.itemsTotal}
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