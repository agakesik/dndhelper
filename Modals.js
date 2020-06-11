
import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { RadioButton, TextInput, Text, Subheading, Button, Headline } from 'react-native-paper'
import { theme, styles } from './Styles.js'
import Icon from 'react-native-vector-icons/FontAwesome';

function MyModal(props) {
  return(
    <View>
      <Modal
        isVisible={props.modalVisible}
        onRequestClose={() => props.closeModal()}
      >
        <View style={styles.modalContainer}>
          <Headline style={{marginBottom: 15}}>{props.title}</Headline>
          {props.children}
        </View>
      </Modal>
    </View>
  )
}

export default function AllModals(props) {
  return (
    <View>
      <AddAbility 
        abilities={props.abilities}
        modalVisible={props.addAbilityModalVisible}
        closeModal={() => props.toggleAddModal(false)}
        addAbility={(name, maxSlots, isShortRest) => props.addAbility(name, maxSlots, isShortRest)}
      />
      <ManageAbilities 
        abilities={props.abilities}
        modalVisible={props.manageAbilitiesModalVisible}
        closeModal={() => props.toggleManageModal(false)}
        deleteAbility={(i) => props.deleteAbility(i)}
        moveUp={(i) => props.moveUp(i)}
        moveDown={(i) => props.moveDown(i)}
        editAbilityModalVisible={props.editAbilityModalVisible}
        openEditModal={() => props.toggleEditModal(true)}
        closeEditModal={() => props.toggleEditModal(false)}
        editAbility={(i, name, maxSlots, isShortRest) => props.editAbility(i, name, maxSlots, isShortRest)}
      />
    </View>
  )
}

export function AddAbility(props) {
  const [name, setName] = useState('');
  const [maxSlots, setMaxSlots] = useState(0);
  const [isShortRest, setIfShortRest] = useState(false);

  return(
    <MyModal {...props} title="Dodaj nową umiejętność">
      <TextInput
        placeholder="nazwa"
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
      
      <View style={styles.modalSummary}>
        <Subheading>nowa umiejętność:</Subheading>
        <Text style={styles.backgroundText}>nazwa: <Subheading>{name}</Subheading></Text>
        <Text style={styles.backgroundText}>liczba użyć: <Subheading>{maxSlots}</Subheading></Text>
        <Text style={styles.backgroundText}>rodzaj: <Subheading>
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
        // mode="contained"
        style={styles.button}
        onPress={() => props.closeModal()}
      >
        anuluj
      </Button>
    </MyModal>
  );
}

export function ManageAbilities(props) {
  const abilities = props.abilities
  const [abilityNumber, chooseAbility] = useState()
  
  return (
    <MyModal {...props} title="Edytuj umiejętności">
      <EditAbility
          modalVisible={props.editAbilityModalVisible}
          closeModal={() => props.closeEditModal()}
          ability={abilities[abilityNumber]}
          editAbility={(name, maxSlots, isShortRest) => 
            props.editAbility(abilityNumber, name, maxSlots, isShortRest)}
        />

      <ScrollView style={styles.abilitiesList}>
        {abilities.map((ability, i) => (
          <View key={i}
          style={styles.abilityRow}
          >
            <RadioButton.Item
              key={i}
              label={ability.name +": "+ ability.usedSlots +"/" +ability.maxSlots}
              value={i}
              status={abilityNumber === i ? 'checked' : 'unchecked'}
              onPress={() => chooseAbility(i)}
              color={theme.colors.primary}
            />
            <View>
              <Button 
                onPress={() => props.moveUp(i)}
                disabled={i===0 ? true : false}
                style={styles.togglePositionButton}
                mode="contained"
              >
                <Icon name='arrow-up' />
              </Button>
              <Button 
                onPress={() => props.moveDown(i)}
                disabled={i===abilities.length-1 ? true : false}
                mode="contained"
              >
                <Icon name='arrow-down' style={{width: 100}}/>
              </Button>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={[styles.controllerMenu, {backgroundColor: theme.colors.primary, marginTop: 10, marginBottom: 5}]}>
        <Button 
          title="usuń"
          onPress={() => {
            props.deleteAbility(abilityNumber)
            chooseAbility(null)
          }}
          color={theme.colors.background}
          style={styles.controllerButton}

        >
          usuń
        </Button>
        <Button 
          title="edytuj"
          onPress={() => {
            if (abilityNumber || abilityNumber === 0) {
              props.openEditModal()}
            }}
            color={theme.colors.background}
            style={styles.controllerButton}

        >
          edytuj
        </Button>
      </View>
      <Button 
        onPress={() => {
          props.closeModal()
          chooseAbility(null)
        }}
        style={styles.controllerButton}
      >
        zamknij
      </Button>
    </MyModal>
  )
}

export function EditAbility(props) {
  const ability = props.ability || {name: "", maxSlots: '', shortRest: false}
  
  const [name, setName] = useState(null);
  const [maxSlots, setMaxSlots] = useState(null);
  const [isShortRest, setIfShortRest] = useState(null);

  return(
    <MyModal {...props} title={"Edytuj " + ability.name}> 
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
      <View style={styles.radioButtonContainer}>
        <RadioButton.Group
          onValueChange={value => setIfShortRest(value)}
        >
          <View style={styles.radioButton}>
            <RadioButton.Item 
              label={(ability.shortRest ? "-> " : "    ") + "short rest"}
              value={true}
              status={isShortRest === true ? 'checked' : 'unchecked'}
              color={theme.colors.primary}
              />
          </View>
          <View style={styles.radioButton}>
            <RadioButton.Item
              label={(ability.shortRest ? "    " : "-> ") + "long rest"}
              value={false}
              status={isShortRest === false ? 'checked' : 'unchecked'}
              color={theme.colors.primary}
              />
          </View>
        </RadioButton.Group>
      </View>
      <Button 
        onPress={() => {
          props.editAbility(name, maxSlots, isShortRest)
          props.closeModal()
          setName(null);
          setMaxSlots(null);
          setIfShortRest(null);
        }}
        // style={{marginTop: 10}}
        mode="contained"
      >
        edytuj
      </Button>
      <Button 
        onPress={() => {props.closeModal()}}
      >
        anuluj
      </Button>
    </MyModal>
  )
}