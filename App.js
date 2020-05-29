import React, { Component, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Abilities from './Abilities.js';
import { AddAbility, ManageAbilities, EditAbility } from './Modals.js'

export default class App extends Component {
  state = {
    abilities: [
      {name: "Zaklęcia level 1", maxSlots: '4', usedSlots: '0', shortRest: false},
      {name: "Zaklęcia level 2", maxSlots: '3', usedSlots: '0', shortRest: false},
      {name: "Akt wiary", maxSlots: '1', usedSlots: '0', shortRest: true}, 
      {name: "Eyes of the grave", maxSlots: '3', usedSlots: '0', shortRest: true},
    ],
    addAbilityModalVisible: false,
    menageAbilitiesModalVisible: false,
    editAbilityModalVisible: false,
  };
  constructor(props) {
    super(props);
    this.readState();
  }

  setModalVisible(modal, bool) {
    if (modal === "add") {
      this.setState({addAbilityModalVisible: bool});
    } else if (modal === "manage") {
      this.setState({menageAbilitiesModalVisible: bool});
    } else if (modal === "edit"){
      this.setState({editAbilityModalVisible: bool});
    }
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
    let abilities = this.state.abilities;
    if(abilities[i].usedSlots < abilities[i].maxSlots) {
      abilities[i].usedSlots = abilities[i].usedSlots + 1;
      this.setState({abilities: abilities})
      this.saveState()
    } else {
      alert('NO MORE SLOTS :c');
    }
  };

  clearSlot (i) {
    let abilities = this.state.abilities;
    if(abilities[i].usedSlots > 0) {
      abilities[i].usedSlots = abilities[i].usedSlots - 1;
      this.setState({abilities: abilities})
      this.saveState()
    } else {
      alert('SLOTS FULL c:');
    }
  };

  longRest() {
    let abilities = this.state.abilities;
    for (let i=0; i<abilities.length; i++){
      abilities[i].usedSlots = 0
    }
    this.setState({abilities: abilities})
    this.saveState()
  }

  shortRest() {
    let abilities = this.state.abilities;
    for (let i=0; i<abilities.length; i++){
      if(abilities[i].shortRest){
        abilities[i].usedSlots = 0
      }
    }
    this.setState({abilities: abilities})
    this.saveState()
  }

  addAbility(name, maxSlots, isShortRest) {
    const abilities =this.state.abilities;
    const newAbility = { name: name, maxSlots: maxSlots, usedSlots: 0, shortRest: isShortRest}
      this.setState({
        abilities: abilities.concat(newAbility),
      });
      this.saveState()
      alert("dodany!")
      this.setModalVisible("add", false)
  }

  deleteAbility(i) {
    let abilitiesAfterDeleting = this.state.abilities.filter((ability, j) => {
      if (i !== j) { return ability }
    });
    this.setState({
      abilities: abilitiesAfterDeleting
    });
    this.saveState()
    alert("usunięto " + this.state.abilities[i].name)
  }

  moveUp(i) {
    let abilities = this.state.abilities
    let temp = abilities[i-1]
    abilities[i-1] = abilities[i]
    abilities[i] = temp
    this.setState({abilities: abilities})
    this.saveState()
  }

  moveDown(i) {
    let abilities = this.state.abilities
    let temp = abilities[i+1]
    abilities[i+1] = abilities[i]
    abilities[i] = temp
    this.setState({abilities: abilities})
    this.saveState()
  }

  editAbility(i, name, maxSlots, shortRest) {
    let abilities = this.state.abilities
    if (name) {abilities[i].name = name}
    if (maxSlots) {abilities[i].maxSlots = maxSlots}
    if (shortRest) {abilities[i].shortRest = shortRest}
    this.setState({abilities: abilities})
    this.saveState()
  }

  render() {  
    return (
      <ScrollView style={styles.appView}>
        <AddAbility 
          modalVisible={this.state.addAbilityModalVisible}
          closeModal={() => this.setModalVisible("add", false)}
          abilities={this.state.abilities}
          addAbility={(name, maxSlots, isShortRest) => this.addAbility(name, maxSlots, isShortRest)}
        />
        <ManageAbilities 
          modalVisible={this.state.menageAbilitiesModalVisible}
          closeModal={() => this.setModalVisible("manage", false)}
          abilities={this.state.abilities}
          deleteAbility={(i) => this.deleteAbility(i)}
          moveUp={(i) => this.moveUp(i)}
          moveDown={(i) => this.moveDown(i)}
          openEdit={() => this.setModalVisible("edit", true)}
          editAbilityModalVisible={this.state.editAbilityModalVisible}
          closeEditModal={() => this.setModalVisible("edit", false)}
          editAbility={(i, name, maxSlots, isShortRest) => this.editAbility(i, name, maxSlots, isShortRest)}
        />
        <View style={styles.controllerMenu}>
          <Button 
            onPress={() => this.shortRest()}
            title="short rest"
          />
          <Button 
            onPress={() => this.longRest()}
            title="long rest"
          />
        </View>
        <Abilities 
          abilities={this.state.abilities}
          onPress={(i) => this.useSlot(i)}
          onLongPress={(i) => this.clearSlot(i)}
        />
        <Button
          onPress={() => this.setModalVisible("add", true)}
          title="dodaj"
        />
        <Button 
          onPress={() => this.setModalVisible("manage", true)}
          title="edytuj / usuń"
        />
      </ScrollView>
    );
  }
}



const styles = StyleSheet.create({
  appView: {
    backgroundColor: '#fff',
    marginTop: '3%',
  },
  controllerMenu: {
    flexDirection: 'row',
    justifyContent: "space-around",
  },
});
