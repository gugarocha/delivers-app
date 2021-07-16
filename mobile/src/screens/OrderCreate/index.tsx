import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

import { Header } from '../../components/Header';
import { FormContainer } from '../../components/FormContainer';
import { SelectedProductsList } from '../../components/SelectedProductsList';
import { CheckBoxGroup } from '../../components/CheckBoxGroup';
import { ActionButton } from '../../components/ActionButton';

import { OrderProductsProps } from '../../utils/types';

import { styles } from './styles';

export default function OrderCreate() {
  const [clientName, setClientName] = useState('');
  const [products, setProducts] = useState<OrderProductsProps[]>([
    {
      id: 1,
      product: "Milho Saco",
      categoryId: 1,
      productAmount: 1
    },
    {
      id: 2,
      product: "Poim Saco",
      categoryId: 1,
      productAmount: 2
    },
    {
      id: 3,
      product: "Água Norte",
      categoryId: 2,
      productAmount: 3
    },
    {
      id: 4,
      product: "Rezido",
      categoryId: 1,
      productAmount: 1
    },
  ]);
  const [payment, setPayment] = useState('Pendente');
  const [delivered, setDelivered] = useState('Não');

  return (
    <View style={styles.container}>
      <Header title='Pedido' />

      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <FormContainer>
          <Text style={styles.label}>
            Cliente
          </Text>
          <TextInput
            style={styles.input}
            value={clientName}
            onChangeText={setClientName}
            placeholder='Nome'
            autoCorrect={false}
          />

          <Text style={styles.label}>
            Produtos
          </Text>
          <SelectedProductsList
            products={products}
            setProducts={setProducts}
          />
          <TouchableOpacity>
            <Text style={styles.addProductsText}>
              + Adicionar Produtos
            </Text>
          </TouchableOpacity>

          <Text style={styles.label}>
            Pagamento
          </Text>
          <CheckBoxGroup
            values={['Pendente', 'Ok', 'Receber']}
            selectedValue={payment}
            setSelectedValue={setPayment}
          />

          <Text style={styles.label}>
            Entregue
          </Text>
          <CheckBoxGroup
            values={['Não', 'Sim']}
            selectedValue={delivered}
            setSelectedValue={setDelivered}
          />
        </FormContainer>

        <View style={styles.footer}>
          <View style={styles.button}>
            <ActionButton type='Cancelar' />
          </View>

          <View style={styles.button}>
            <ActionButton type='Confirmar' />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};