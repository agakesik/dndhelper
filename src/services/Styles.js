import { DefaultTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';

function addOpacity(rgbString, opacity) {
  return rgbString.split(', 1)')[0] + "," + opacity + ")"
}

export const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3C8A90',
    accent: 'rgba(255, 211, 67, 1)',
    surface: '#f6f6f6',
    gray: '#b3b3b3',

  },
}

export const blackPrimary = {
  ...theme,
  colors: {
    primary: 'black',
  }
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
    fontSize: 17,
    textTransform: 'uppercase',
    color: 'black',
    padding: 15,
  },
  settingsTitle: {
    backgroundColor: addOpacity(theme.colors.accent, 0.8),
  },
  settingsList: {
    padding: 15,
    paddingLeft: 40,
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
    padding: 10,
  },
  modalScrollview: {
    flexGrow: 1, 
    justifyContent: 'center',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between'
  },
  radioButton: {
    paddingHorizontal: 10,
    width: '50%',
  },
  modalSummary: {
    marginTop: 10,
    marginBottom: 10,
    padding: 5,
    borderTopWidth: 2,
    borderTopColor: theme.colors.primary,
  },
  abilityRow: {
    flexDirection: 'row', 
    justifyContent: "flex-end",
    alignItems: 'center',
    padding: 5,
  },

});