import React, { Component, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Button,
  Text,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';
import Abilities from './Abilities.js';
import RadioButton from 'react-native-paper/lib/commonjs/components/RadioButton/RadioButton';

export default class App extends Component {
  state = {
    abilities: [
      {name: "Zaklęcia level 1", maxSlots: 4, usedSlots: 0, shortRest: false},
      {name: "Zaklęcia level 2", maxSlots: 3, usedSlots: 0, shortRest: false},
      {name: "Akt wiary", maxSlots: 1, usedSlots: 0, shortRest: true}, 
      {name: "Eyes of the grave", maxSlots: 3, usedSlots: 0, shortRest: true},
    ],
    modalVisible: false,
  };
  constructor(props) {
    super(props);
    this.readState();
  }

  setModalVisible(bool) {
    this.setState({modalVisible: bool});
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
    alert("dodany!")
    this.setModalVisible(false)
  }

  render() {  
    return (
      <ScrollView style={styles.appView}>
        <AddAbility 
          modalVisible={this.state.modalVisible}
          closeModal={() => this.setModalVisible(false)}
          addAbility={(name, maxSlots, isShortRest) => this.addAbility(name, maxSlots, isShortRest)}
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
          onPress={() => this.setModalVisible(true)}
          title="dodaj"
        />
      </ScrollView>
    );
  }
}

function AddAbility(props) {
  const modalVisible = props.modalVisible;
  const [name, setName] = useState('');
  const [maxSlots, setMaxSlots] = useState(0);
  const [isShortRest, setIfShortRest] = useState(false);
  const [error, addError] = useState("");

  return(
    <View>
      <Modal 
        isVisible={modalVisible}
        onRequestClose={() => props.closeModal()}
      >
        <View style={styles.modalContainer}>
          <Text>Dodaj nową umiejętność</Text>
          <TextInput
            placeholder="nazwa"
            placeholderTextColor="rgba(0,0,0,0.5)"
            maxLength={40}
            onChangeText={text => setName(text)}
            value={name}
          />
          <TextInput
            placeholder="liczba użyć"
            placeholderTextColor="rgba(0,0,0,0.5)"
            maxLength={1}
            keyboardType={'numeric'}
            onChangeText={number => 
              setMaxSlots(number.replace(/[^1-9]/g, ''))
            }
          />
          <View style={styles.radioButton}>
            <Text style={{fontSize: 25}}>Short rest</Text>
            <RadioButton
              value="Short rest"
              status={isShortRest === true ? 'checked' : 'unchecked'}
              onPress={() => setIfShortRest(true)}
            />
          </View>
          <View style={styles.radioButton}>
            <Text style={{fontSize: 25}}>Long rest</Text>
            <RadioButton
              value="Long rest"
              status={isShortRest === false ? 'checked' : 'unchecked'}
              onPress={() => setIfShortRest(false)}
            />
          </View>
          <Text>nowa umiejętność:</Text>
          <Text>nazwa: {name}</Text>
          <Text>liczba użyć: {maxSlots}</Text>
          <Text>rodzaj: {isShortRest ? "short rest" : "long rest"}</Text>
          <Text>{error}</Text>
          <Button 
            onPress={() => props.closeModal()}
            title="anuluj"
          />
          <Button 
          title="dodaj"
          onPress={() => {
            props.addAbility(name, maxSlots, isShortRest);
            setName("");
            setMaxSlots(0);
            setIfShortRest(false);
          }}
          />
        </View>
      </Modal>
    </View>
  );
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
  modalContainer: {
    backgroundColor: '#fff',
    padding: 30,
  },
  radioButton: {
    flexWrap: 'wrap', 
    flexDirection: 'row',
    alignContent: 'flex-end'
    // justifyContent: 'center'
  }
});
