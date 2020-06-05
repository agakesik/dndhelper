import React, { Component, useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Abilities from './Abilities.js';
import { Provider as PaperProvider, Button, Text } from 'react-native-paper';
import { theme } from './Styles.js'
import  MainViewButton  from './Buttons.js'

export default class CopyApp extends Component {
  state = {
    abilities: [
      {name: "Zaklęcia level 1", maxSlots: '4', usedSlots: '0', shortRest: false},
      {name: "Zaklęcia level 2", maxSlots: '3', usedSlots: '0', shortRest: false},
      {name: "Akt wiary", maxSlots: '1', usedSlots: '0', shortRest: true}, 
      {name: "Eyes of the grave", maxSlots: '3', usedSlots: '0', shortRest: true},
    ],
  };
  
  constructor(props) {
    super(props);
    this.readState();
  }

  saveState = async () => {
    try {
      const stringValue = JSON.stringify(this.state.abilities)
      await AsyncStorage.setItem('@saved_state', stringValue)
    } catch (err) {
      alert("failed to save to the storage")
    }
  }

  readState = async () => {
    try {
      const stringValue = await AsyncStorage.getItem('@saved_state')
      const loadedAbilities = JSON.parse(stringValue)

      if (loadedAbilities !== null) {
        this.setState({abilities: loadedAbilities})
      }
    } catch (err) {
      alert('failed to fetch data')
    }
  }


  // shortRest() {
  //   let abilities = this.props.abilities.slice();
  //   for (let i=0; i<abilities.length; i++){
  //     if(abilities[i].shortRest){
  //       abilities[i].usedSlots = 0
  //     }
  //   }
  //   this.props.changeAbilities(abilities)
  //   // this.saveState()
  // }

  render() {  
    return (
      <PaperProvider style={{flex: 1}} theme={theme}>
        <ScrollView style={styles.abilitiesView}>
          <Abilities 
            abilities={this.props.abilities}
            onPress={(i) => this.props.useSlot(i)}
            onLongPress={(i) => this.props.clearSlot(i)}
            viewCompact={this.props.compactView}
          />
        </ScrollView>
        <MainViewButton
          shortRest={() => this.props.shortRest()}
          longRest={() => this.props.longRest()}
          openAddModal={() => this.props.openAddModal()}
          openManageModal={() => this.props.openManageModal()}
        />
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
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
