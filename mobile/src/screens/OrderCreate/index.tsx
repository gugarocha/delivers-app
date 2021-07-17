import React, { useState } from 'react';
import { useRoute } from '@react-navigation/core';
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

import { OrdersProps, OrderProductsProps } from '../../utils/types';

import { styles } from './styles';

interface Params {
  selectedOrder: OrdersProps
};

export default function OrderCreate() {
  const route = useRoute();
  const { selectedOrder } = route.params as Params;

  const [clientName, setClientName] = useState(selectedOrder.client);
  const [products, setProducts] = useState<OrderProductsProps[]>(selectedOrder.products);
  const [payment, setPayment] = useState(selectedOrder.payment);
  const [delivered, setDelivered] = useState(selectedOrder.delivered ? 'Sim' : 'Não');

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
            setSelectedValue={setPayment as (value: string) => void}
          />

          <Text style={styles.label}>
            Entregue
          </Text>
          <CheckBoxGroup
            values={['Não', 'Sim']}
            selectedValue={delivered}
            setSelectedValue={setDelivered as (value: string) => void}
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