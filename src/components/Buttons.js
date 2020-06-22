import React from 'react';
import { Button } from 'react-native-paper';
import {  View } from 'react-native';
import { theme, styles } from './Styles.js'

export default function MainMenuButtons(props) {
  return (
    <View>
      <DoubleControllerButtons 
        modeContained={true}
        firstButtonLabel="short rest"
        firstButtonOnPress={() => props.shortRest()}
        secondButtonLabel="long rest"
        secondButtonOnPress={() => props.longRest()}
      />

      <DoubleControllerButtons 
        firstButtonLabel="dodaj"
        firstButtonOnPress={() => props.openAddModal()}
        secondButtonLabel="edytuj"
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