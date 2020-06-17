
import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { RadioButton, TextInput, Text, Subheading, Button, Headline } from 'react-native-paper'
import { theme, styles } from './Styles.js'
import Icon from 'react-native-vector-icons/FontAwesome';
import { SingleMenuButton, DoubleControllerButtons } from './Buttons'

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

function AddAbility(props) {
  const [name, setName] = useState('');
  const [maxSlots, setMaxSlots] = useState(0);
  const [isShortRest, setIfShortRest] = useState(false);

  const addAbility = () => {
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
  }

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
      
      <ShortOrLongRestRadioButton
        isShortRest={isShortRest}
        setIfShortRest={(value) => setIfShortRest(value)}
      />

      <View style={styles.modalSummary}>
        <Subheading>nowa umiejętność:</Subheading>
        <Text style={styles.backgroundText}>nazwa: <Subheading>{name}</Subheading></Text>
        <Text style={styles.backgroundText}>liczba użyć: <Subheading>{maxSlots}</Subheading></Text>
        <Text style={styles.backgroundText}>rodzaj: <Subheading>
            {isShortRest ? "short rest" : "long rest"}
        </Subheading></Text>
      </View>

      <SingleMenuButton
        modeContained={true}
        onPress={() => addAbility()}
        label="dodaj"
      />
      <SingleMenuButton
        onPress={() => props.closeModal()}
        label="zakmnij"
      />
    </MyModal>
  );
}

function ManageAbilities(props) {
  const abilities = props.abilities
  const [abilityNumber, chooseAbility] = useState()

  const closeModal = () => {
    props.closeModal()
    chooseAbility(null)
  }
  
  return (
    <MyModal 
      {...props} 
      closeModal={() => closeModal()}
      title="Zarządzaj umiejetnościami"
    >
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
      
      <DoubleControllerButtons 
        modeContained={true}
        firstButtonLabel="usuń"
        firstButtonOnPress={() => {
          props.deleteAbility(abilityNumber)
          chooseAbility(null)
        }}
        secondButtonLabel="edytuj"
        secondButtonOnPress={() => {
          if (abilityNumber || abilityNumber === 0) {
            props.openEditModal()
          }
        }}
      />
      
      <SingleMenuButton
        label="zamknij"
        onPress={() => closeModal()}
      />
    </MyModal>
  )
}

function EditAbility(props) {
  const ability = props.ability || {name: "", maxSlots: '', shortRest: false}
  
  const [name, setName] = useState(null);
  const [maxSlots, setMaxSlots] = useState(null);
  const [isShortRest, setIfShortRest] = useState(null);

  const editAbility = () => {
    props.editAbility(name, maxSlots, isShortRest)
    props.closeModal()
    setName(null);
    setMaxSlots(null);
    setIfShortRest(null);
  }

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

      <ShortOrLongRestRadioButton
        isShortRest={isShortRest}
        setIfShortRest={(value) => setIfShortRest(value)}
        currentIsShortRest={ability.shortRest}
        editing={true}
      />

      <SingleMenuButton
        onPress={() => editAbility()}
        label="edytuj"
        modeContained={true}
      />
      <SingleMenuButton
        onPress={() => props.closeModal()}
        label="anuluj"
      />
    </MyModal>
  )
}

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

function ShortOrLongRestRadioButton(props) {
  return (
    <View style={styles.radioButtonContainer}>
      <RadioButton.Group
        onValueChange={value => props.setIfShortRest(value)}
      >
        <View style={styles.radioButton}>
          <RadioButton.Item 
            label={(props.currentIsShortRest ? "-> " : "    ") + "short rest"}
            value={true}
            status={props.isShortRest === true ? 'checked' : 'unchecked'}
            color={theme.colors.primary}
            />
        </View>
        <View style={styles.radioButton}>
          <RadioButton.Item
            label={ 
              (props.editing ? (props.currentIsShortRest ? "    " : "-> ") : "    ") + "long rest"
            }
            value={false}
            status={props.isShortRest === false ? 'checked' : 'unchecked'}
            color={theme.colors.primary}
            />
        </View>
      </RadioButton.Group>
    </View>
  )
}