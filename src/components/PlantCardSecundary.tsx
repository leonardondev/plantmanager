import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { SvgFromUri } from 'react-native-svg';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface PlantProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
    hour: string;
  }
}

export function PlantCardSecundary({ data, ...rest }: PlantProps) {
  return (
    <RectButton
      style={styles.container}
      {...rest}
    >
      <SvgFromUri uri={data.photo} width={50} height={50} />
      <Text style={styles.title}>{data.name}</Text>
      
      <View style={styles.details}>
        <Text style={styles.timeLabel}>Regar às</Text>
        <Text style={styles.time}>{data.hour}</Text>
      </View>

    </RectButton>    
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderRadius: 20,
    backgroundColor: colors.shape,
    marginVertical: 5,
  },

  title: {
    flex: 1,
    fontFamily: fonts.heading,
    fontSize: 17,
    color: colors.heading,
    marginLeft: 10,
  },

  details: {
    alignItems: 'flex-end',
  },

  timeLabel: {
    fontFamily: fonts.text,
    marginTop: 5,
    fontSize: 16,
    color: colors.body_light,
  },

  time: {
    fontFamily: fonts.heading,
    fontSize: 16,
    marginTop: 5,
    color: colors.body_dark,
  },
})