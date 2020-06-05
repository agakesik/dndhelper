import React from 'react';
import { Button } from 'react-native-paper';
import {  View } from 'react-native';
import { theme, styles } from './Styles.js'

export default function MainViewButtons(props) {
  return (
    <View>
      <View style={[styles.controllerMenu, {backgroundColor: theme.colors.primary}]}>
        <Button 
          onPress={() => props.shortRest()}
          style={styles.controllerButton}
          color={theme.colors.background}
          >
          short rest
          </Button>
        <Button 
          onPress={() => props.longRest()}
          style={styles.controllerButton}
          color={theme.colors.background}
          >
          long rest
        </Button>
      </View>
      <View style={styles.controllerMenu}>
        <Button
          onPress={() => props.openAddModal()}
          style={styles.controllerButton}
          >
          dodaj
        </Button>
        <Button 
          onPress={() => props.openManageModal()}
          style={styles.controllerButton}
          >
          edytuj / usuń
        </Button>
      </View>
    </View>
  );
}
