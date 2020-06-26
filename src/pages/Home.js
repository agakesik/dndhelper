import React from 'react';
import AllModals from '../components/Modals.js'
import Abilities from '../components/Abilities.js';
import MainViewButton  from '../components/Buttons.js'
import { View, Text } from 'react-native';

export default function HomesScreen (props) {
  const [addAbilityModalVisible, toggleAddModal] = React.useState(false)
  const [manageAbilitiesModalVisible, toggleManageModal] = React.useState(false)
  const [editAbilityModalVisible, toggleEditModal] = React.useState(false)

  const abilities = props.abilities
  const changeAndSaveAbilities = (changedAbilities) => props.changeAndSaveAbilities(changedAbilities)

   // Functions to manage Abilities: add/edit/delete

   const addAbility = (name, maxSlots, isShortRest) => {
    let newAbility = { name: name, maxSlots: maxSlots, usedSlots: 0, shortRest: isShortRest}
    changeAndSaveAbilities([...abilities, newAbility]);
    toggleAddModal(false)
  }

  const deleteAbility = (i) => {
    let abilitiesAfterDeleting = abilities.filter((ability, j) => {
      if (i !== j) { return ability }
    });
    changeAndSaveAbilities(abilitiesAfterDeleting);
  }

  const editAbility = (i, name, maxSlots, shortRest) => {
    let editedAbilities = abilities.slice()
    if (name) {editedAbilities[i].name = name}
    if (maxSlots) {editedAbilities[i].maxSlots = maxSlots}
    if (shortRest!== null) {editedAbilities[i].shortRest = shortRest}
    changeAndSaveAbilities(editedAbilities)
  }

  const moveUp = (i) => {
    let changedAbilities = abilities.slice()
    let temp = changedAbilities[i-1]
    changedAbilities[i-1] = changedAbilities[i]
    changedAbilities[i] = temp
    changeAndSaveAbilities(changedAbilities)
  }

  const moveDown = (i) => {
    let changedAbilities =  abilities.slice()
    let temp = changedAbilities[i+1]
    changedAbilities[i+1] = changedAbilities[i]
    changedAbilities[i] = temp
    changeAndSaveAbilities(changedAbilities)
    console.log("hello")
  }
  
  // functions that change the state of Abilities 

  const useSlot = (i) => {
    let changedAbilities = abilities.slice();
    if(changedAbilities[i].usedSlots < changedAbilities[i].maxSlots) {
      changedAbilities[i].usedSlots = changedAbilities[i].usedSlots + 1;
      changeAndSaveAbilities(changedAbilities)
    } else {
      alert('NO MORE SLOTS :c');
    }
  };

  const clearSlot = (i) => {
    let changedAbilities = abilities.slice();
    if(changedAbilities[i].usedSlots > 0) {
      changedAbilities[i].usedSlots = changedAbilities[i].usedSlots - 1;
      changeAndSaveAbilities(changedAbilities)
    } else {
      alert('SLOTS FULL c:');
    }
  };

  const longRest = () => {
    let changedAbilities = abilities.slice();
    for (let i=0; i<changedAbilities.length; i++){
      changedAbilities[i].usedSlots = 0
    }
    changeAndSaveAbilities(changedAbilities)
  }

  const shortRest = () => {
    let changedAbilities = abilities.slice();
    for (let i=0; i<changedAbilities.length; i++){
      if(changedAbilities[i].shortRest){
        changedAbilities[i].usedSlots = 0
      }
    }
    changeAndSaveAbilities(changedAbilities)
  }

  return (
    <View style={{flex: 1}}>
      <AllModals 
        abilities={abilities}
        addAbilityModalVisible={addAbilityModalVisible}
        toggleAddModal={(bool) => toggleAddModal(bool)}
        addAbility={(name, maxSlots, isShortRest) => addAbility(name, maxSlots, isShortRest)}
        manageAbilitiesModalVisible={manageAbilitiesModalVisible}
        toggleManageModal={(bool) => toggleManageModal(bool)}
        deleteAbility={(i) => deleteAbility(i)}
        editAbilityModalVisible={editAbilityModalVisible}
        toggleEditModal={(bool) => toggleEditModal(bool)}
        moveUp={(i) => moveUp(i)}
        moveDown={(i) => moveDown(i)}
        editAbility={(i, name, maxSlots, isShortRest) => editAbility(i, name, maxSlots, isShortRest)}
      />
      <Abilities 
        abilities={abilities}
        onPress={(i) => useSlot(i)}
        onLongPress={(i) => clearSlot(i)}
        viewCompact={props.compactView}
      />
      <MainViewButton
        shortRest={() => shortRest()}
        longRest={() => longRest()}
        openAddModal={() => toggleAddModal(true)}
        openManageModal={() => toggleManageModal(true)}
      />
    </View>
  )

}