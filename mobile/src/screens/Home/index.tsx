import React, { useState } from 'react';
import {
  FlatList,
  Platform,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import Modal from 'react-native-modal';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { Feather } from '@expo/vector-icons';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import { Header } from '../../components/Header';
import { RouteCard } from '../../components/RouteCard';
import { NewRouteCard } from '../../components/NewRouteCard';

import { styles } from './styles';
import { captalize } from '../../utils/captalize';

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