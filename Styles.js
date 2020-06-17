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
  // General
  backgroundText: {
    color: theme.colors.gray,
  },

  // Buttons
  buttonWrapper: {
    marginTop: 5,
  },
  doubleButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  doubleButton: {
    minWidth: '50%', 
    borderRadius: 0,
  },
  singleButton: {
    margin: 5,
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

  // Modals
  modalContainer:{
    backgroundColor: '#fff',
    padding: 5,
    maxHeight: '90%'
  },
  radioButtonContainer: {
    flexDirection: 'row',
  },
  radioButton: {
    width: '50%',
  },
  modalSummary: {
    marginTop: 10,
    marginBottom: 10,
    padding: 5,
    borderTopWidth: 2,
    borderTopColor: theme.colors.primary,
  },
  abilitiesList: {
    padding: 10,
  },
  abilityRow: {
    flexDirection: 'row', 
    justifyContent: "flex-end",
    alignItems: 'center',
    padding: 5,
  },

});