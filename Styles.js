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
  // Buttons
  controllerMenu: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 5,
  },
  controllerButton: {
    minWidth: '50%', 
    borderRadius: 20,
  },

  // Settings
  settingsDescription: {
    alignSelf: 'center', 
    fontSize: 12
  },
  compactViewToggle: {
    flexDirection: 'row', 
    justifyContent: 'flex-end'
  },

  // Abilities
  abilitiesViewCompact: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  singleAbility: {
    margin: 10,
    elevation: 2,
  },
  singleAbilityBorderRadius: {
    borderRadius: 5,
  },
  abilityDescription: {
    padding: 10,
    paddingBottom: 0,
  },
  singularSlot: {
    margin: 10,
    height: 20,
    width: 20,
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  row: {
    flexDirection: 'row',
  },
});