import React, { useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/core';
import {
  Alert,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import Modal from 'react-native-modal';
import { Feather } from '@expo/vector-icons';

import { SpinLoading } from '../../components/SpinLoading';
import { Header } from '../../components/Header';
import { AttachToRouteModal } from '../../components/AttachToRouteModal';
import { FormContainer } from '../../components/FormContainer';
import { SelectedProductsList } from '../../components/SelectedProductsList';
import { CheckBoxGroup } from '../../components/CheckBoxGroup';
import { ActionButton } from '../../components/ActionButton';

import { useOrder } from '../../hooks/useOrder';
import { useSelectedProducts } from '../../hooks/useSelectedProducts';
import { OrdersProps } from '../../utils/types';

import { styles } from './styles';

interface Params {
  selectedOrder: OrdersProps;
};

export default function OrderCreate() {
  const route = useRoute();
  const { selectedOrder } = route.params as Params;

  const [showModal, setShowModal] = useState(false);
  const [isSendingData, setIsSendingData] = useState(false);

  const [routeId, setRouteId] = useState(selectedOrder.routeId);
  const [clientName, setClientName] = useState(selectedOrder.client);
  const [payment, setPayment] = useState(selectedOrder.payment);
  const [valueToReceive, setValueToReceive] = useState(selectedOrder.valueToReceive as string);
  const [delivered, setDelivered] = useState(selectedOrder.delivered ? 'Sim' : 'Não');
  const { selectedProducts } = useSelectedProducts();

  const { updateOrder, addOrder } = useOrder();
  const navigation = useNavigation();

  function closeModal() {
    setShowModal(false);
  };

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

  function convertValueToReceiveToNumber(value: string) {
    let sanitizedValue = value && value.replace(/\D/g, '');

    return Number(sanitizedValue) / 100;
  };

  function handleCancelButton() {
    navigation.goBack();
  };

  function checkDataIsComplete(data: OrdersProps) {
    return (
      !!data.client &&
      data.products.length > 0 &&
      (data.payment === 'Receber' ? !!data.valueToReceive : !!data.payment)
    );
  };

  async function handleConfirmButton() {
    setIsSendingData(true);

    const data: OrdersProps = {
      id: selectedOrder.id,
      routeId: routeId || null,
      client: clientName,
      products: selectedProducts,
      payment: payment,
      valueToReceive: payment === 'Receber'
        ? convertValueToReceiveToNumber(valueToReceive)
        : null,
      delivered: delivered === 'Sim',
    };

    if (checkDataIsComplete(data)) {
      selectedOrder.id ? await updateOrder(data) : await addOrder(data);

      navigation.goBack();
    } else {
      setIsSendingData(false);

      Alert.alert('Dados Incompletos', 'Preencha todos os campos para continuar');
    };
  };

  return (
    <>
      <Modal
        isVisible={isSendingData}
        backdropOpacity={0.2}
      >
        <SpinLoading />
      </Modal>

      <View style={styles.container}>
        <Header title='Pedido'>
          {!selectedOrder.routeId && (
            <TouchableOpacity
              onPress={() => setShowModal(true)}
            >
              <Feather name='paperclip' size={24} color='#FFF' />
            </TouchableOpacity>
          )}
        </Header>

        <AttachToRouteModal
          isVisible={showModal}
          routeId={routeId}
          setRouteId={setRouteId}
          closeModal={closeModal}
        />

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
              setSelectedValue={setDelivered}
            />
          </FormContainer>

          <View style={styles.footer}>
            <View style={styles.button}>
              <ActionButton
                type='Cancelar'
                onPress={handleCancelButton}
              />
            </View>

            <View style={styles.button}>
              <ActionButton
                type={'Confirmar'}
                onPress={handleConfirmButton}
                disabled={isSendingData}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </>

  );
};