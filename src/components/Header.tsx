import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper'; 

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import userImg from '../assets/leonardo.png';

interface HeaderProps {
  title?: string;
  titleBold?: string
}

export function Header({ title = "Minhas", titleBold = "Plantinhas" }: HeaderProps) {

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.titleBold}>{titleBold}</Text>
      </View>
      <Image source={userImg} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 32,
    marginTop: getStatusBarHeight(),
  },

  title: {
    fontFamily: fonts.text,
    fontSize: 36,
    color: colors.heading,

  },

  titleBold: {
    fontFamily: fonts.heading,
    fontSize: 36,
    color: colors.heading,
    lineHeight: 40,
  },

  image: {
    width: 65,
    height: 65,
    borderRadius: 32,
  },

});