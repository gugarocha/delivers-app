import React, { useState } from 'react';
import { useRoute } from '@react-navigation/core';
import { View, Text, TextInput } from 'react-native';

import { Header } from '../../components/Header';
import { FormContainer } from '../../components/FormContainer';
import { CheckBoxGroup } from '../../components/CheckBoxGroup';
import { ActionButton } from '../../components/ActionButton';

import { ProductProps } from '../../utils/types';

import { styles } from './styles';

interface Params {
  product: ProductProps;
};

enum CategoryEnum {
  Sacarias = 1,
  Águas,
  Mercadorias
}

export default function ProductCreate() {
  const route = useRoute();
  const { product } = route.params as Params;

  const [productName, setProductName] = useState(product.name);
  const [category, setCategory] = useState(CategoryEnum[product.categoryId]);
  const [active, setActive] = useState(product.active ? 'Sim' : 'Não');

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
            />
          </View>

          <View style={styles.button}>
            <ActionButton
              type='Confirmar'
            />
          </View>
        </View>
      </View>
    </View>
  );
};