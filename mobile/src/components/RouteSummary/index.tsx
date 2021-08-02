import React from 'react';
import { View, SectionList, Text } from 'react-native';

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

export function RouteSummary() {
  const routeSummary = {
    ordersTotal: 4,
    itemsTotal: 17,
    categories: [
      {
        category: "Sacarias",
        itemsCategoryTotal: 8,
        data: [
          {
            id: 1,
            product: "Milho Saco",
            categoryId: 1,
            productAmount: "2"
          },
          {
            id: 2,
            product: "Poim Saco",
            categoryId: 1,
            productAmount: "1"
          },
          {
            id: 4,
            product: "Rezido",
            categoryId: 1,
            productAmount: "2"
          },
          {
            id: 5,
            product: "Soja Saco",
            categoryId: 1,
            productAmount: "3"
          },
        ]
      },
      {
        category: "Águas",
        itemsCategoryTotal: 3,
        data: [
          {
            id: 9,
            product: "Água Norte",
            categoryId: 2,
            productAmount: "2"
          },
          {
            id: 10,
            product: "Água Azul",
            categoryId: 2,
            productAmount: "1"
          }
        ]
      },
      {
        category: "Mercadorias",
        itemsCategoryTotal: 6,
        data: [
          {
            id: 6,
            product: "Volume",
            categoryId: 3,
            productAmount: "3"
          },
          {
            id: 12,
            product: "Sacola de mercadorias",
            categoryId: 3,
            productAmount: "3"
          }
        ]
      }
    ]
  };

  return (
    <View style={styles.container}>
      <SectionList
        sections={routeSummary.categories}
        keyExtractor={item => String(item.id)}
        contentContainerStyle={styles.contentContainer}
        ListHeaderComponent={
          <ListHeader
            ordersTotal={routeSummary.ordersTotal}
            itemsTotal={routeSummary.itemsTotal}
          />
        }
        renderSectionHeader={({ section: { category, itemsCategoryTotal } }) => (
          <SectionHeader
            category={category}
            itemsCategoryTotal={itemsCategoryTotal}
          />
        )}
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