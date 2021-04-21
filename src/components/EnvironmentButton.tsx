import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface EnvironmentButtonProps extends RectButtonProps {
  title: string;
  active?: boolean;
}

export function EnvironmentButton(props: EnvironmentButtonProps) {
  const { title, active = false, ...rest } = props;

  return (
    <RectButton
      style={[styles.container, active && styles.activeContainer]}
      {...rest}
    >
      <Text style={[styles.text, active && styles.activeText]}>
        {title}
      </Text>
    </RectButton>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.shape,
    height: 40,
    width: 76,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
  },

  activeContainer: {
    backgroundColor: colors.green_light,
  },

  text: {
    fontFamily: fonts.text,
    fontSize: 14,
    color: colors.heading,
  },

  activeText: {
    fontFamily: fonts.heading,
    color: colors.green_dark,
  },

});