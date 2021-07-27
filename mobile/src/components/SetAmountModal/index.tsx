import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

import { ActionModal } from '../ActionModal';

import { useSelectedProducts } from '../../hooks/selectedProducts';
import { OrderProductsProps } from '../../utils/types';

import { styles } from './styles';

interface Props {
  modalVisible: boolean;
  closeModal: () => void;
  selectedProduct: OrderProductsProps;
};

export function SetAmountModal({
  modalVisible,
  closeModal,
  selectedProduct
}: Props) {
  const { selectedProducts, setSelectedProducts } = useSelectedProducts();
  const [amount, setAmount] = useState('');

  function handleModalConfirmButton() {
    const product = { ...selectedProduct, productAmount: Number(amount) }

    let productAlredySelected = false;
    let updatedProducts = selectedProducts
      .map(item => {
        if (item.id === product.id) {
          productAlredySelected = true;
          return product;
        };

        return item;
      })
      .filter(item => item.productAmount !== 0);

    if (!productAlredySelected && product.productAmount > 0) {
      updatedProducts.push(product);
    };

    setSelectedProducts(updatedProducts);

    setAmount('');
    closeModal();
  };

  function handleChangeAmount(value: string) {
    setAmount(value.replace(/\D/g, ''));
  };

  return (
    <ActionModal
      title='Alterar Quantidade'
      isVisible={modalVisible}
      cancelButtonAction={closeModal}
      confirmButtonAction={handleModalConfirmButton}
    >
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={handleChangeAmount}
          maxLength={3}
          keyboardType='number-pad'
          autoFocus
        />
        <Text style={styles.product}>
          x {selectedProduct.product}
        </Text>
      </View>
    </ActionModal>
  );
};