import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/core';
import { Alert, View, Text, TextInput } from 'react-native';

import { Header } from '../../components/Header';
import { FormContainer } from '../../components/FormContainer';
import { CheckBoxGroup } from '../../components/CheckBoxGroup';
import { ActionButton } from '../../components/ActionButton';

import { useProducts } from '../../hooks/useProducts';
import { ProductProps } from '../../utils/types';

import { styles } from './styles';

interface Params {
  product: ProductProps;
};

enum CategoryEnum {
  Sacarias = 1,
  Águas,
  Mercadorias
};

export default function ProductCreate() {
  const { goBack } = useNavigation();
  const route = useRoute();
  const { product } = route.params as Params;

  const { createProduct } = useProducts();

  const [productName, setProductName] = useState(product.name);
  const [category, setCategory] = useState(CategoryEnum[product.categoryId]);
  const [active, setActive] = useState(product.active ? 'Sim' : 'Não');

  function getCategoryId() {
    switch (category) {
      case 'Sacarias':
        return 1;
      case 'Águas':
        return 2;
      case 'Mercadorias':
        return 3;
      default:
        return 0;
    };
  };

  function checkDataIsComplete(data: ProductProps) {
    return (
      !!data.name &&
      data.categoryId !== 0
    );
  };

  async function handleConfirm() {
    const data = {
      id: product.id,
      name: productName,
      categoryId: getCategoryId(),
      active: active === 'Sim',
    };

    if (checkDataIsComplete(data)) {
      await createProduct(data);

      goBack();
    } else {
      Alert.alert('Dados Incompletos', 'Preencha todos os campos para continuar');
    };
  };

  return (
    <View style={styles.container}>
      <Header title='Cadastrar Produto' />

      <View style={styles.contentContainer}>
        <FormContainer>
          <Text style={styles.label}>
            Produto
          </Text>
          <TextInput
            style={styles.productNameInput}
            placeholder='Produto'
            value={productName}
            onChangeText={setProductName}
          />

          <Text style={styles.label}>
            Categoria
          </Text>
          <CheckBoxGroup
            values={['Sacarias', 'Águas', 'Mercadorias']}
            selectedValue={category}
            setSelectedValue={setCategory}
          />

          <Text style={styles.label}>
            Ativo
          </Text>
          <CheckBoxGroup
            values={['Sim', 'Não']}
            selectedValue={active}
            setSelectedValue={setActive}
          />
        </FormContainer>

        <View style={styles.buttonsContainer}>
          <View style={styles.button}>
            <ActionButton
              type='Cancelar'
              onPress={goBack}
            />
          </View>

          <View style={styles.button}>
            <ActionButton
              type='Confirmar'
              onPress={handleConfirm}
            />
          </View>
        </View>
      </View>
    </View>
  );
};