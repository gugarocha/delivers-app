import React, { useState } from 'react';
import {
  FlatList,
  Platform,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import Modal from 'react-native-modal';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { Feather } from '@expo/vector-icons';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import { Header } from '../components/Header';
import { RouteCard } from '../components/RouteCard';
import { NewRouteCard } from '../components/NewRouteCard';

import { captalize } from '../utils/captalize';

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState<Date>();
  const [routeName, setRouteName] = useState<string>();

  const data = [
    {
      id: 1,
      name: "Sexta-Feira",
      date: "2021-02-05",
      totalDelivers: 20
    },
    {
      id: 2,
      name: "Sexta-Feira",
      date: "2021-02-05",
      totalDelivers: 20
    },
  ];

  const toggleModalVisible = () => setModalVisible(!modalVisible);

  const handleChangeDate = (event: Event, selectedDate: Date | undefined) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(oldState => !oldState);
    };

    if (selectedDate) {
      setDate(selectedDate);
      setRouteName(captalize(format(selectedDate, 'eeee', { locale: pt })));
      setShowDatePicker(false);
    };
  };

  return (
    <>
      <Header title='Rotas' showBackButton={false}>
        <TouchableOpacity >
          <Feather name='filter' size={24} color='#FFF' />
        </TouchableOpacity>
      </Header>

      <Modal
        isVisible={modalVisible}
        backdropOpacity={0.2}
        animationIn="zoomIn"
        animationOut="zoomOut"
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitleText}>Nova rota</Text>

          <View style={styles.modalRowWrapper}>
            <Text style={styles.modalLabel}>Data:</Text>
            <Feather name='calendar' size={16} style={styles.calendarIcon} />
            <TouchableOpacity
              style={styles.modalInput}
              onPress={() => setShowDatePicker(true)}
            >
              <Text>{date && format(date, 'dd/MM/yyyy')}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalRowWrapper}>
            <Text style={styles.modalLabel}>Rota:</Text>
            <TextInput
              style={styles.modalInput}
              value={routeName}
              onChangeText={value => setRouteName(value)}
            />
          </View>

          <View style={styles.modalRowWrapper}>
            <TouchableOpacity
              style={styles.modalCancelButton}
              onPress={toggleModalVisible}
            >
              <Text style={styles.modalCancelButtonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalConfirmButton}
              onPress={toggleModalVisible}
            >
              <Text style={styles.modalConfirmButtonText}>Confirmar</Text>
            </TouchableOpacity>

            {showDatePicker &&
              <DateTimePicker
                value={date || new Date()}
                onChange={handleChangeDate}
              />
            }
          </View>
        </View>
      </Modal>

      <View style={styles.container}>
        <FlatList
          data={[...data, { id: undefined }]}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) =>
            item.id
              ? <RouteCard data={item} />
              : <NewRouteCard openModal={toggleModalVisible} />
          }
          numColumns={2}
          columnWrapperStyle={styles.cardsContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#FFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 15,
  },
  modalTitleText: {
    textAlign: 'center',
    fontSize: 26,
    color: '#0278AE',
  },
  modalRowWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  modalLabel: {
    marginRight: 8,
    color: '#6C757D'
  },
  calendarIcon: {
    marginRight: 5,
  },
  modalInput: {
    flex: 1,
    borderBottomWidth: 1,
    fontSize: 16,
  },
  modalCancelButton: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#6A097D',
  },
  modalCancelButtonText: {
    color: '#6A097D',
  },
  modalConfirmButton: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: '#6A097D',
  },
  modalConfirmButtonText: {
    color: '#FFF'
  },
  container: {
    marginTop: 30,
    paddingHorizontal: 12,
  },
  cardsContainer: {
    justifyContent: 'space-between',
  },
});