import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { EnvironmentButton } from '../components/EnvironmentButton';

import api from '../services/api';
import { Header } from '../components/Header';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface Environment {
  key: string;
  title: string;
}

export function PlantSelect() {
  const [environments,setEnvironments] = useState<Environment[]>();
  

  useEffect(() => {
     api.get('/plants_environments').then(response => {
      setEnvironments([
        { key: 'all', title: 'Todos' },
        ...response.data
      ])
     })
  },[]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Header title="Olá" titleBold="Leonardo" />
        <Text style={styles.title}>
          Em qual hambiente
        </Text>
        <Text style={styles.subtitle}>
          você quer colocar sua planta?
        </Text>
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.environmentList}
        data={environments}
        renderItem={({item }) => (
          <EnvironmentButton title={item.title} />
        )}
      >

      </FlatList>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    // justifyContent: 'center',
    // alignItems: 'center',
  },

  header: {
    paddingHorizontal: 32,
  },

  title: {
    fontFamily: fonts.heading,
    fontSize: 17,
    color: colors.heading,
    lineHeight: 23,
    marginTop: 15,
  },

  subtitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    color: colors.heading,
    lineHeight: 20,
  },

  environmentList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    marginLeft: 32,
    marginVertical: 32,
  },
})