
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import { RadioButton, TextInput, Text, Subheading, Button, Headline } from 'react-native-paper'
import { theme } from './Styles.js'

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
          <Headline style={{marginBottom: 15}}>Dodaj nową umiejętność</Headline>
          <TextInput
            placeholder="nazwa"
            // placeholderTextColor="rgba(0,0,0,0.5)"
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
          <View style={styles.radioButtonContainer}>
            <RadioButton.Group
              onValueChange={value => setIfShortRest(value)}
              style={styles.radioButtonContainer}
            >
              <View style={styles.radioButton}>
                <RadioButton.Item 
                  label="short rest"
                  value={true}
                  status={isShortRest === true ? 'checked' : 'unchecked'}
                  color={theme.colors.primary}
                  />
              </View>
              <View style={styles.radioButton}>
                <RadioButton.Item
                  label="long rest"
                  value={false}
                  status={isShortRest === false ? 'checked' : 'unchecked'}
                  color={theme.colors.primary}
                  />
              </View>
            </RadioButton.Group>
          </View>
          
          <View style={styles.summary}>
            <Subheading>nowa umiejętność:</Subheading>
            <Text style={styles.description}>nazwa: <Subheading>{name}</Subheading></Text>
            <Text style={styles.description}>liczba użyć: <Subheading>{maxSlots}</Subheading></Text>
            <Text style={styles.description}>rodzaj: <Subheading>
                {isShortRest ? "short rest" : "long rest"}
            </Subheading></Text>
          </View>

          <Button 
            mode="contained"
            style={styles.button}
            onPress={() => {
              if (name===""){
                alert("nazwa nie moze być pusta")
              } else if (props.abilities.find(ability => ability.name === name)) {
                alert("nazwa nie moze się powtarzać")
              } else if (maxSlots === 0) {
                alert("liczba musi być większa niż 0 (i musi być cyfrą)")
              } else {
                props.addAbility(name, maxSlots, isShortRest);
                setName("");
                setMaxSlots('');
                setIfShortRest(false);
              }
            }}
          >
            dodaj
          </Button>
          <Button 
            mode="contained"
            style={styles.button}
            onPress={() => props.closeModal()}
          >
            anuluj
          </Button>
        </View>
      </Modal>
    </View>
  );
}

export function ManageAbilities(props) {
  const abilities = props.abilities
  const [abilityNumber, chooseAbility] = useState()
  
  return (
    <View>
      <EditAbility
          modalVisible={props.editAbilityModalVisible}
          closeModal={() => props.closeEditModal()}
          ability={abilities[abilityNumber]}
          editAbility={(name, maxSlots, isShortRest) => 
            props.editAbility(abilityNumber, name, maxSlots, isShortRest)}
        />
      <Modal
        isVisible={props.modalVisible}
        onRequestClose={() => props.closeModal()}
      >
        <View style={styles.modalContainer}>
          {abilities.map((ability, i) => (
            <View key={i}
            style={{flexDirection: 'row', justifyContent: "flex-end",}}
            >
              <RadioButton.Item
                key={i}
                label={ability.name +": "+ ability.usedSlots +"/" +ability.maxSlots}
                value={i}
                status={abilityNumber === i ? 'checked' : 'unchecked'}
                onPress={() => chooseAbility(i)}
              />
              <Button 
                onPress={() => props.moveUp(i)}
                title="^"
                disabled={i===0 ? true : false}
              />
              <Button 
                onPress={() => props.moveDown(i)}
                title="v"
                disabled={i===abilities.length-1 ? true : false}
              />
            </View>
          ))}
          <Button 
            title="usuń"
            onPress={() => {
              props.deleteAbility(abilityNumber)
              chooseAbility(null)
            }}
          />
          <Button 
            title="edytuj"
            onPress={() => {
              if (abilityNumber || abilityNumber === 0) {
                props.openEdit()}
              }}
          />
          <Button 
            onPress={() => {
              props.closeModal()
              chooseAbility(null)
            }}
            title="zamknij"
          />
        </View>
      </Modal>
    </View>
  )
}

export function EditAbility(props) {
  const ability = props.ability || {name: "", maxSlots: '', shortRest: false}
  
  const [name, setName] = useState(null);
  const [maxSlots, setMaxSlots] = useState(null);
  const [isShortRest, setIfShortRest] = useState(null);

  return(
    <View>
      <Modal
        isVisible={props.modalVisible}
        onRequestClose={() => props.closeModal()}
      >
        <View style={styles.modalContainer}>
          <Text>Edytuj {ability.name}</Text>

          <TextInput
            placeholder={"nazwa: " + ability.name}
            value={name}
            onChangeText={text => setName(text)}
          />
          <TextInput
           placeholder={"Użycia: " + ability.maxSlots}
           value={maxSlots}
           onChangeText={text => setMaxSlots(text)}
          />
          <RadioButton.Group
            onValueChange={value => setIfShortRest(value)}
          >
            <View style={styles.radioButton}>
              <RadioButton.Item 
                label={(ability.shortRest ? "-> " : "    ") + "short rest"}
                value={true}
                status={isShortRest === true ? 'checked' : 'unchecked'}
                />
            </View>
            <View style={styles.radioButton}>
              <RadioButton.Item
                label={(ability.shortRest ? "    " : "-> ") + "long rest"}
                value={false}
                status={isShortRest === false ? 'checked' : 'unchecked'}
                />
            </View>
          </RadioButton.Group>
          <Button 
            onPress={() => {
              props.editAbility(name, maxSlots, isShortRest)
              props.closeModal()
              setName(null);
              setMaxSlots(null);
              setIfShortRest(null);
            }}
            title="edytuj"
          />
          <Button 
            onPress={() => {props.closeModal()}}
            title="anuluj"
          />
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
  radioButtonContainer: {
    // backgroundColor: 'red',
    flexDirection: 'row',
  },
  radioButton: {
    width: '50%',
  },
  button: {
    margin: 5,
  },
  summary: {
    marginTop: 10,
    marginBottom: 10,
    padding: 5,
    borderTopWidth: 2,
    borderTopColor: theme.colors.primary,
  },
  description: {
    color: theme.colors.gray,
  }
});