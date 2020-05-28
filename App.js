import React, { Component, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Abilities from './Abilities.js';
import { AddAbility, DeleteAbility } from './Modals.js'

export default class App extends Component {
  state = {
    abilities: [
      {name: "Zaklęcia level 1", maxSlots: 4, usedSlots: 0, shortRest: false},
      {name: "Zaklęcia level 2", maxSlots: 3, usedSlots: 0, shortRest: false},
      {name: "Akt wiary", maxSlots: 1, usedSlots: 0, shortRest: true}, 
      {name: "Eyes of the grave", maxSlots: 3, usedSlots: 0, shortRest: true},
    ],
    addAbilityModalVisible: false,
    deleteAbilityModalVisible: false,
  };
  constructor(props) {
    super(props);
    this.readState();
  }

  setModalVisible(modal, bool) {
    if (modal === "add") {
      this.setState({addAbilityModalVisible: bool});
    } else if (modal === "delete") {
      this.setState({deleteAbilityModalVisible: bool});
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

  render() {  
    return (
      <ScrollView style={styles.appView}>
        <AddAbility 
          modalVisible={this.state.addAbilityModalVisible}
          closeModal={() => this.setModalVisible("add", false)}
          addAbility={(name, maxSlots, isShortRest) => this.addAbility(name, maxSlots, isShortRest)}
        />
        <DeleteAbility 
          modalVisible={this.state.deleteAbilityModalVisible}
          closeModal={() => this.setModalVisible("delete", false)}
          abilities={this.state.abilities}
          deleteAbility={(i) => this.deleteAbility(i)}
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
          onPress={() => this.setModalVisible("delete", true)}
          title="usuń"
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
