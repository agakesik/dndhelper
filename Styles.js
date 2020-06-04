// import React from 'react';
import { DefaultTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3C8A90',
    accent: '#FFD343',
    surface: '#f6f6f6',
    gray: '#b3b3b3',

  },
}

export const styles = StyleSheet.create({
  abilitiesView: {
    marginBottom: 2,
  },
  controllerMenu: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 5,
  },
  controllerButton: {
    minWidth: '50%', 
    borderRadius: 20,
  },
});