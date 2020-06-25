import React from 'react';
import { Button } from 'react-native-paper';
import {  View } from 'react-native';
import { theme, styles } from '../services/Styles.js'
import { translations } from '../services/translations.js'


export default function MainMenuButtons(props) {
  return (
    <View>
      <DoubleControllerButtons 
        modeContained={true}
        firstButtonLabel={translations.shortRest}
        firstButtonOnPress={() => props.shortRest()}
        secondButtonLabel={translations.longRest}
        secondButtonOnPress={() => props.longRest()}
      />

      <DoubleControllerButtons 
        firstButtonLabel={translations.add}
        firstButtonOnPress={() => props.openAddModal()}
        secondButtonLabel={translations.edit}
        secondButtonOnPress={() => props.openManageModal()}
      />
    </View>
  );
}

export function SingleMenuButton(props) {
  return (
    <View style={styles.buttonWrapper}>
      <Button 
        mode={props.modeContained ? "contained" : ""}
        style={styles.button}
        onPress={() => props.onPress()}
      >
        {props.label}
      </Button>
    </View>
  )
}

export function DoubleControllerButtons(props) {
  return (
    <View style={[styles.doubleButtonWrapper, styles.buttonWrapper]}>
      <Button 
        onPress={() => props.firstButtonOnPress()}
        style={styles.doubleButton}
        mode={props.modeContained ? "contained" : ""}
      >
        {props.firstButtonLabel}
      </Button>

      <Button 
        onPress={() => props.secondButtonOnPress()}
          style={styles.doubleButton}
          mode={props.modeContained ? "contained" : ""}
      >
        {props.secondButtonLabel}
      </Button>
    </View>
  )
}