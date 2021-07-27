import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { SetAmountModal } from '../SetAmountModal';

import { useSelectedProducts } from '../../hooks/selectedProducts';
import { OrderProductsProps } from '../../utils/types';

import { styles } from './styles';

export function SelectedProductsList() {
  const { selectedProducts, setSelectedProducts } = useSelectedProducts();

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<OrderProductsProps>(
    {} as OrderProductsProps
  );

  function closeModal() {
    setShowModal(false);
  };

  function handleSelectProduct(product: OrderProductsProps) {
    setShowModal(true);

    setSelectedProduct(product);
  };

  function handleRemoveProduct(id: number) {
    const updatedProducts = selectedProducts.filter(product => product.id !== id);

    setSelectedProducts(updatedProducts);
  };

  return (
    <>
      <SetAmountModal
        modalVisible={showModal}
        closeModal={closeModal}
        selectedProduct={selectedProduct}
      />

      {selectedProducts.length === 0
        ? <Text style={styles.emptyListText}>Nenhum produto selecionado</Text>
        : selectedProducts.map((product, index) => (
          <View key={product.id}>
            <View style={styles.container}>
              <TouchableOpacity
                style={styles.productInfo}
                onPress={() => handleSelectProduct(product)}
              >
                <Text>{product.productAmount} x </Text>
                <Text>{product.product}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleRemoveProduct(product.id)}
              >
                <Feather name='x' size={14} />
              </TouchableOpacity>

            </View>
            {
              index < selectedProducts.length - 1 && <View style={styles.divider} />
            }
          </View>
        ))}
    </>
  );
};