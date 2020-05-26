import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Button,
  Text
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Abilities from './Abilities.js'

const STORAGE_KEY ='@save_state'

export default class App extends Component {
  state = {
    abilities: [
      {name: "Zaklęcia level 1", maxSlots: 4, usedSlots: 0, shortRest: false},
      {name: "Zaklęcia level 2", maxSlots: 3, usedSlots: 0, shortRest: false},
      {name: "Akt wiary", maxSlots: 1, usedSlots: 0, shortRest: true}, 
      {name: "Eyes of the grave", maxSlots: 3, usedSlots: 0, shortRest: true},
    ]
  }
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
    // alert('long rest!');
    let abilities = this.state.abilities;
    for (let i=0; i<abilities.length; i++){
      abilities[i].usedSlots = 0
    }
    this.setState({abilities: abilities})
    this.saveState()
  }

  shortRest() {
    // alert('short rest!');
    let abilities = this.state.abilities;
    for (let i=0; i<abilities.length; i++){
      if(abilities[i].shortRest){
        abilities[i].usedSlots = 0
      }
    }
    this.setState({abilities: abilities})
    this.saveState()
  }

  render() {  
    return (
      <ScrollView style={styles.appView}>
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
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  appView: {
    flex: 1,
    // justifyContent: 'flex-start',
    backgroundColor: '#fff',
    padding: '5%',
    paddingTop: '10%',
  },
  controllerMenu: {
    flexDirection: 'row',
    justifyContent: "space-around",
  },
});
