import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, Image, ScrollView, Platform, TouchableOpacity} from 'react-native'
import { SvgFromUri } from 'react-native-svg'
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { useRoute } from '@react-navigation/core';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';

import { Button } from '../components/Button';
import waterdrop from '../assets/waterdrop.png' 
import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { Plant } from './PlantSelect';
import { format, isBefore } from 'date-fns';

interface Params {
  plant: Plant;
}

export function PlantSave() {
  const [selectedDateTime,setSelectedDateTime] = useState(new Date());
  const [showDatePicker,setShowDatePicker] = useState(Platform.OS === 'ios');

  const route = useRoute();
  const { plant } = route.params as Params;

  function handleChangeTime(_event: Event, dateTime: Date | undefined) {
    if(Platform.OS === 'android') {
      setShowDatePicker(oldState => !oldState);
    }

    if(dateTime && isBefore(dateTime, new Date())) {
      setSelectedDateTime(new Date())
      return Alert.alert('Escolha uma data no futuro! ⏰️')
    }

    if(dateTime) {
      setSelectedDateTime(dateTime)
    }
  }

  function handleOpenDatetimePickerForAndroid() {
    setShowDatePicker(oldState => !oldState);
  }

  return (
    <View style={styles.container}>
      <View style={styles.plantInfo}>
        <SvgFromUri
          uri={plant.photo}
          height={150}
          width={150}
        />
        <Text style={styles.plantName}>{plant.name}</Text>
        <Text style={styles.plantAbout}>{plant.about}</Text>
      </View>

      <View style={styles.controller}>
        <View style={styles.tipContainer}>
          <Image source={waterdrop} style={styles.tipImage} />
          <Text style={styles.tipText}>{plant.water_tips}</Text>
        </View>
        <Text style={styles.alertLabel}>Ecolha o melhor horário para ser lembrado:</Text>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDateTime}
            mode="time"
            display="spinner"
            onChange={handleChangeTime}
          />
        )}
        {
          Platform.OS === 'android' && (
            <TouchableOpacity
              style={styles.dateTimePicketButton}
              onPress={handleOpenDatetimePickerForAndroid}
            >
              <Text style={styles.dateTimePicketText}>{`Mudar ${format(selectedDateTime, 'HH:mm' )}`}</Text>
            </TouchableOpacity>
          )
        }

        <Button
          title="Cadastrar plantas"
          onPress={() => {}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.shape,
  },

  plantInfo: {
    flex: 1,
    paddingHorizontal: 32,
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.shape,
  },

  plantName: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginTop: 15,
  },

  plantAbout: {
    fontFamily: fonts.text,
    textAlign: 'center',
    color: colors.heading,
    fontSize: 17,
    marginVertical: 10,
    paddingBottom: 10,
  },

  controller: {
    backgroundColor: colors.white,
    paddingHorizontal: 32,
    paddingBottom: getBottomSpace() || 32,
  },

  tipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.blue_light,
    padding: 16,
    borderRadius: 20,

    position: 'relative',
    bottom: 44,
  },

  tipImage: {
    width: 56,
    height: 56,
  },

  tipText: {
    flex: 1,
    fontFamily: fonts.text,
    fontSize: 17,
    textAlign: 'justify',
    color: colors.blue,
    marginHorizontal: 20,
  },

  alertLabel: {
    fontFamily: fonts.complement,
    textAlign: 'center',
    color: colors.heading,
    fontSize: 13,
  },

  dateTimePicketButton: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 20,
  },

  dateTimePicketText: {
    color: colors.heading,
    fontSize: 24,
    fontFamily: fonts.text,
  },
  
})