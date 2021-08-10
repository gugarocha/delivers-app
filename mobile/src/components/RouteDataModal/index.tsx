import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Platform,
  Alert,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { Feather } from '@expo/vector-icons';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import { ActionModal } from '../ActionModal';

import { useRoutes } from '../../hooks/useRoutes';
import { captalize } from '../../utils/captalize';
import { formatDate } from '../../utils/formatDate';

import { styles } from './styles';

interface RouteProps {
  routeId: number;
  date: Date;
  name: string;
};

interface Props {
  modalVisible: boolean;
  closeModal: () => void;
  selectedRoute?: RouteProps;
  setRouteInfo?: (newInfo: RouteProps) => void;
};

export function RouteDataModal({
  modalVisible,
  closeModal,
  selectedRoute,
  setRouteInfo
}: Props) {
  const [routeDate, setRouteDate] = useState(selectedRoute && selectedRoute.date);
  const [routeName, setRouteName] = useState(selectedRoute ? selectedRoute.name : '');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const navigation = useNavigation();

  const { newRoute, editRouteInfo } = useRoutes();

  const handleChangeDate = (event: Event, selectedDate: Date | undefined) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(oldState => !oldState);
    };

    if (selectedDate) {
      setRouteDate(selectedDate);
      setRouteName(captalize(format(selectedDate, 'eeee', { locale: pt })));
      setShowDatePicker(false);
    };
  };

  async function handleAddNewRoute() {
    try {
      const newRouteInfo = await newRoute({
        date: routeDate || new Date(),
        name: routeName,
      });

      closeModal();

      navigation.navigate('OrdersRoute', {
        selectedRoute: newRouteInfo
      });
    } catch (error) {
      Alert.alert('Erro ao criar nova rota');
    };
  };

  async function handleEditRoute() {
    try {
      if (selectedRoute && setRouteInfo) {
        const updatedRouteInfo = {
          routeId: selectedRoute?.routeId,
          date: routeDate || new Date(),
          name: routeName,
        };

        await editRouteInfo(updatedRouteInfo);
        setRouteInfo(updatedRouteInfo);
      }

      closeModal();
    } catch (error) {
      Alert.alert('Erro ao editar dados da rota');
    };
  };

  return (
    <ActionModal
      isVisible={modalVisible}
      title='Dados da Rota'
      confirmButtonAction={
        selectedRoute
          ? handleEditRoute
          : handleAddNewRoute
      }
      cancelButtonAction={closeModal}
    >
      {showDatePicker &&
        <DateTimePicker
          value={routeDate || new Date()}
          onChange={handleChangeDate}
        />
      }

      <View style={styles.modalRowWrapper}>
        <Text style={styles.modalLabel}>Data:</Text>
        <Feather name='calendar' size={16} style={styles.calendarIcon} />
        <TouchableOpacity
          style={styles.modalInput}
          onPress={() => setShowDatePicker(true)}
        >
          <Text>{routeDate && formatDate(routeDate)}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.modalRowWrapper}>
        <Text style={styles.modalLabel}>Rota:</Text>
        <TextInput
          style={styles.modalInput}
          value={routeName}
          onChangeText={setRouteName}
        />
      </View>
    </ActionModal>
  );
};