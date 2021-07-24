import React, { useState } from 'react';
import { View, TouchableOpacity, Text, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { ActionModal } from '../ActionModal';

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

  function handleModalConfirmButton() {
    const updatedProducts = selectedProducts.map(product => {
      if (product.id === selectedProduct.id) {
        return selectedProduct;
      };
      return product;
    });

    selectedProduct.productAmount === 0
      ? handleRemoveProduct(selectedProduct.id)
      : setSelectedProducts(updatedProducts);

    closeModal();
  };

  function handleChangeAmount(value: string) {
    const newAmount = Number(value.replace(/\D/g, ''));
    setSelectedProduct({ ...selectedProduct, productAmount: newAmount });
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
      <ActionModal
        title='Alterar Quantidade'
        isVisible={showModal}
        cancelButtonAction={closeModal}
        confirmButtonAction={handleModalConfirmButton}
      >
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.modalInput}
            onChangeText={handleChangeAmount}
            maxLength={3}
            keyboardType='number-pad'
            autoFocus
          />
          <Text style={styles.modalText}>
            x {selectedProduct.product}
          </Text>
        </View>
      </ActionModal>

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