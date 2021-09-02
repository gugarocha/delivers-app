import React, { useState } from 'react';
import { View, Text } from 'react-native';

import { Header } from '../../components/Header';
import { SetAmountModal } from '../../components/SetAmountModal';
import { ListProducts } from '../../components/ListProducts';
import { SelectedProductsList } from '../../components/SelectedProductsList';

import { useProducts } from '../../hooks/useProducts';
import { OrderProductsProps, ProductProps } from '../../utils/types';

import { styles } from './styles';

export default function AddProducts() {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({} as OrderProductsProps);

  const { activeProducts } = useProducts();

  function closeModal() {
    setShowModal(false);
  };

  function handleSelectProduct(product: ProductProps) {
    setShowModal(true);

    const orderProduct: OrderProductsProps = {
      id: product.id,
      product: product.name,
      productAmount: 0,
    };

    setSelectedProduct(orderProduct);
  };

  return (
    <>
      <Header title='Adicionar Produto' />

      <SetAmountModal
        modalVisible={showModal}
        closeModal={closeModal}
        selectedProduct={selectedProduct}
      />

      <ListProducts
        data={activeProducts}
        onSelectProduct={handleSelectProduct}
        ListHeaderComponent={
          <>
            <View style={styles.selectedProductsContainer}>
              <Text style={styles.selectedProductsHeader}>
                Produtos Selecionados
              </Text>
              <SelectedProductsList />
            </View>

            <Text style={styles.listProductsHeader}>
              Selecione os Produtos
            </Text>
          </>
        }
      />
    </>
  );
};