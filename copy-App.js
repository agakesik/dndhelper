import React, { Component, useState } from 'react';
import {
  StyleSheet, ScrollView, View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Abilities from './Abilities.js';
import AllModals from './Modals.js'
import { Provider as PaperProvider, Button, Switch, Text } from 'react-native-paper';
import { theme } from './Styles.js'

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

  useSlot(i) {
    let abilities = this.state.abilities.slice();
    if(abilities[i].usedSlots < abilities[i].maxSlots) {
      abilities[i].usedSlots = abilities[i].usedSlots + 1;
      this.setState({abilities: abilities})
      this.saveState()
    } else {
      alert('NO MORE SLOTS :c');
    }
  };

  clearSlot (i) {
    let abilities = this.state.abilities.slice();
    if(abilities[i].usedSlots > 0) {
      abilities[i].usedSlots = abilities[i].usedSlots - 1;
      this.setState({abilities: abilities})
      this.saveState()
    } else {
      alert('SLOTS FULL c:');
    }
  };

  longRest() {
    let abilities = this.state.abilities.slice();
    for (let i=0; i<abilities.length; i++){
      abilities[i].usedSlots = 0
    }
    this.setState({abilities: abilities})
    this.saveState()
  }

  shortRest() {
    let abilities = this.state.abilities.slice();
    for (let i=0; i<abilities.length; i++){
      if(abilities[i].shortRest){
        abilities[i].usedSlots = 0
      }
    }
    this.setState({abilities: abilities})
    this.saveState()
  }

  addAbility(name, maxSlots, isShortRest) {
    let abilities =this.state.abilities.slice();
    let newAbility = { name: name, maxSlots: maxSlots, usedSlots: 0, shortRest: isShortRest}
    this.setState({ 
      abilities: abilities.concat(newAbility),
    });
    this.saveState()
    this.props.toggleAddModal(false)
  }

  deleteAbility(i) {
    let abilitiesAfterDeleting = this.state.abilities.filter((ability, j) => {
      if (i !== j) { return ability }
    });
    this.setState({
      abilities: abilitiesAfterDeleting
    });
    this.saveState()
  }

  moveUp(i) {
    let abilities = this.state.abilities.slice()
    let temp = abilities[i-1]
    abilities[i-1] = abilities[i]
    abilities[i] = temp
    this.setState({abilities: abilities})
    this.saveState()
  }

  moveDown(i) {
    let abilities = this.state.abilities.slice()
    let temp = abilities[i+1]
    abilities[i+1] = abilities[i]
    abilities[i] = temp
    this.setState({abilities: abilities})
    this.saveState()
  }

  editAbility(i, name, maxSlots, shortRest) {
    let abilities = this.state.abilities.slice()
    if (name) {abilities[i].name = name}
    if (maxSlots) {abilities[i].maxSlots = maxSlots}
    if (shortRest!== null) {abilities[i].shortRest = shortRest}
    this.setState({abilities: abilities})
    this.saveState()
  }

  render() {  
    return (
      <PaperProvider style={{flex: 1}} theme={theme}>
        <AllModals 
          abilities={this.state.abilities}
          addAbilityModalVisible={this.props.addAbilityModalVisible}
          closeAddAbilityModal={() => this.props.toggleAddModal(false)}
          addAbility={(name, maxSlots, isShortRest) => this.addAbility(name, maxSlots, isShortRest)}
          manageAbilitiesModalVisible={this.props.manageAbilitiesModalVisible}
          closeManageAbilitiesModal={() => this.props.toggleManageModal(false)}
          deleteAbility={(i) => this.deleteAbility(i)}
          moveUp={(i) => this.moveUp(i)}
          moveDown={(i) => this.moveDown(i)}
          editAbilityModalVisible={this.props.editAbilityModalVisible}
          toggleEditModal={(bool) => this.props.toggleEditModal(bool)}
          editAbility={(i, name, maxSlots, isShortRest) => this.editAbility(i, name, maxSlots, isShortRest)}
        />
        <ScrollView style={styles.abilitiesView}>
          <Abilities 
            abilities={this.state.abilities}
            onPress={(i) => this.useSlot(i)}
            onLongPress={(i) => this.clearSlot(i)}
            viewCompact={this.props.compactView}
          />
        </ScrollView>
        <View style={[styles.controllerMenu, {backgroundColor: theme.colors.primary}]}>
          <Button 
            onPress={() => this.shortRest()}
            style={styles.controllerButton}
            color={theme.colors.background}
            >
           short rest
            </Button>
          <Button 
            onPress={() => this.longRest()}
            style={styles.controllerButton}
            color={theme.colors.background}
            >
            long rest
          </Button>
        </View>
        <View style={styles.controllerMenu}>
          <Button
            onPress={() => this.props.toggleAddModal(true)}
            style={styles.controllerButton}
            >
            dodaj
          </Button>
          <Button 
            onPress={() => this.props.toggleManageModal(true)}
            style={styles.controllerButton}
            >
            edytuj / usuń
          </Button>
        </View>
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
