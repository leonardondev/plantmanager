import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { Header } from '../components/Header';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function PlantSelect() {
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
})