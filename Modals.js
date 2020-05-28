
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Button,
  Text,
} from 'react-native';
import Modal from 'react-native-modal';
import RadioButton from 'react-native-paper/lib/commonjs/components/RadioButton/RadioButton';
import TextInput from 'react-native-paper/lib/commonjs/components/TextInput/TextInput'

export function AddAbility(props) {
  const [name, setName] = useState('');
  const [maxSlots, setMaxSlots] = useState(0);
  const [isShortRest, setIfShortRest] = useState(false);

  return(
    <View>
      <Modal 
        isVisible={props.modalVisible}
        onRequestClose={() => props.closeModal()}
      >
        <View style={styles.modalContainer}>
          <Text>Dodaj nową umiejętność</Text>
          <TextInput
            placeholder="nazwa"
            placeholderTextColor="rgba(0,0,0,0.5)"
            maxLength={25}
            onChangeText={text => setName(text)}
            value={name}
            style={{height: 40}}
          />
          <TextInput
            placeholder="liczba użyć"
            placeholderTextColor="rgba(0,0,0,0.5)"
            maxLength={1}
            keyboardType={'numeric'}
            onChangeText={number => 
              setMaxSlots(number.replace(/[^1-9]/g, ''))
            }
            style={{height: 40}}
          />
          <RadioButton.Group
            onValueChange={value => setIfShortRest(value)}
          >
            <View style={styles.radioButton}>
              <RadioButton.Item 
                label="short rest"
                value={true}
                status={isShortRest === true ? 'checked' : 'unchecked'}
                />
            </View>
            <View style={styles.radioButton}>
              <RadioButton.Item
                label="long rest"
                value={false}
                status={isShortRest === false ? 'checked' : 'unchecked'}
                style={isShortRest === true ? {textColor: 'blue'} : {textColor: 'red'}}
                />
            </View>
          </RadioButton.Group>

          <Text>nowa umiejętność:</Text>
          <Text>nazwa: {name}</Text>
          <Text>liczba użyć: {maxSlots}</Text>
          <Text>rodzaj: {isShortRest ? "short rest" : "long rest"}</Text>
          <Button 
            onPress={() => props.closeModal()}
            title="anuluj"
          />
          <Button 
          title="dodaj"
          onPress={() => {
            if (props.abilities.find(ability => ability.name === name)) {
              alert("nazwa nie moze się powtarzać")
            } else if (maxSlots === 0) {
              alert("liczba musi być większa niż 0")
            } else {
              props.addAbility(name, maxSlots, isShortRest);
              setName("");
              setMaxSlots(0);
              setIfShortRest(false);
            }
          }}
          />
        </View>
      </Modal>
    </View>
  );
}

export function DeleteAbility(props) {
  const abilities = props.abilities
  const [abilityNumber, chooseAbility] = useState()
  return (
    <View>
      <Modal
        isVisible={props.modalVisible}
        onRequestClose={() => props.closeModal()}
      >
        <View style={styles.modalContainer}>
          {abilities.map((ability, i) => (
            <RadioButton.Item
              key={i}
              label={ability.name +": "+ ability.usedSlots +"/" +ability.maxSlots}
              value={i}
              status={abilityNumber === i ? 'checked' : 'unchecked'}
              onPress={() => chooseAbility(i)}
            />
          ))}
          <Button 
            title="usuń"
            onPress={() => {
              props.deleteAbility(abilityNumber)
              chooseAbility(null)
            }}
          />
          <Button 
            onPress={() => {
              props.closeModal()
              chooseAbility(null)
            }}
            title="anuluj"
          />
          <Text>Usuń umiejętność: {abilityNumber ? abilities[abilityNumber].name : ""}</Text>
        </View>
      </Modal>
    </View>
  )
}
const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#fff',
    padding: 30,
  },
  radioButton: {
    flexWrap: 'wrap', 
    flexDirection: 'row',
    alignContent: 'flex-end'
  }
});