import React, { useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/core';
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

import { useSelectedProducts } from '../../hooks/selectedProducts';
import { OrdersProps } from '../../utils/types';

import { styles } from './styles';

interface Params {
  selectedOrder: OrdersProps
};

export default function OrderCreate() {
  const route = useRoute();
  const { selectedOrder } = route.params as Params;
  
  const [clientName, setClientName] = useState(selectedOrder.client);
  const [payment, setPayment] = useState(selectedOrder.payment);
  const [valueToReceive, setValueToReceive] = useState(selectedOrder.valueToReceive as string);
  const [delivered, setDelivered] = useState(selectedOrder.delivered ? 'Sim' : 'Não');
  
  const navigation = useNavigation();

  function handleNavigateToAddProducts() {
    navigation.navigate('AddProducts');
  };

  function handleChangeValueToReceive(value: string) {
    let maskedValue = value
      .replace(/\D/g, '')
      .replace(/(\d)(\d{2})$/, '$1,$2')
      .replace(/(?=(\d{3})+(\D))\B/g, '.');

    setValueToReceive(maskedValue);
  };

  return (
    <View style={styles.container}>
      <Header title='Pedido' />

      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <FormContainer>
          <Text style={styles.label}>
            Cliente
          </Text>
          <TextInput
            style={styles.clientNameInput}
            value={clientName}
            onChangeText={setClientName}
            placeholder='Nome'
            autoCorrect={false}
          />

          <Text style={styles.label}>
            Produtos
          </Text>
          <SelectedProductsList />
          <TouchableOpacity onPress={handleNavigateToAddProducts}>
            <Text style={styles.addProductsText}>
              + Adicionar Produtos
            </Text>
          </TouchableOpacity>

          <View style={styles.paymentSelectContainer}>
            <View>
              <Text style={styles.label}>
                Pagamento
              </Text>
              <CheckBoxGroup
                values={['Pendente', 'Ok', 'Receber']}
                selectedValue={payment}
                setSelectedValue={setPayment as (value: string) => void}
              />
            </View>

            {
              payment === 'Receber' &&
              <View style={styles.valueToReceiveContainer}>
                <Text style={styles.currencyPrefix}>R$ </Text>
                <TextInput
                  style={styles.valueToReceiveInput}
                  value={valueToReceive}
                  onChangeText={handleChangeValueToReceive}
                  placeholder='0,00'
                  keyboardType='number-pad'
                />
              </View>
            }
          </View>

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