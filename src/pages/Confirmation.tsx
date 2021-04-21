import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Confirmation() {
  const navigation = useNavigation();

  function handleMoveOn() {
    navigation.navigate('PlantSelect')
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>
          😁️
        </Text>
        <Text style={styles.title}>Prontinho</Text>
        <Text style={styles.subtitle}>Agora vamos começar a cuidar das suas plantinhas com muito cuidado.</Text>
        <View style={styles.footer}>
          <Button
            title={"Começar"}
            onPress={handleMoveOn}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10, //SafeAreaView
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },

  emoji: {
    fontSize: 96,
  },

  title: {
    fontFamily: fonts.heading,
    fontSize: 24,
    textAlign: 'center',
    color: colors.heading,
    marginTop: 36,
    lineHeight: 38,
  },

  subtitle: {
    fontFamily: fonts.text,
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading,
  },

  footer: {
    marginTop: 40,
    width: '100%',
    paddingHorizontal: 50,
  },

});