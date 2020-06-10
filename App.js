import React from 'react';
import CompactView from './Settings'
import AllModals from './Modals.js'
import Abilities from './Abilities.js';
import MainViewButton  from './Buttons.js'
import { theme } from './Styles.js'
import { Provider as PaperProvider, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

export default function App () {
  const [compactView, toggleCompactView] = React.useState(false)
  const [addAbilityModalVisible, toggleAddModal] = React.useState(false)
  const [manageAbilitiesModalVisible, toggleManageModal] = React.useState(false)
  const [editAbilityModalVisible, toggleEditModal] = React.useState(false)

  const [abilities, changeAbilities] = React.useState([
    {name: "Przykład", maxSlots: 4, usedSlots: 2, shortRest: false}
  ])

  React.useEffect(() => {
    readState('@saved_settings', 'toggleCompactView')
    readState('@saved_abilities', 'changeAbilities')
  }, [])

  const showState = () => {
    console.log(JSON.stringify(abilities))
  }

  // Functions to save and retrieve data from aync storage

  const saveState = async (stateKey, newState) => {
    try {
      const stringValue = JSON.stringify(newState)
      await AsyncStorage.setItem(stateKey, stringValue)
    } catch (err) {
      alert("failed to save to the storage")
    }
  }

  const readState = async (stateKey, changeStateFunction) => {
    try {
      const stringValue = await AsyncStorage.getItem(stateKey)
      const loadedState = JSON.parse(stringValue)

      if (loadedState !== null) {
        eval(changeStateFunction + '(loadedState)' )
      }
    } catch (err) {
      alert('failed to fetch data')
    }
  }

  const changeAndSaveAbilities = (changedAbilities) => {
    changeAbilities(changedAbilities);
    saveState('@saved_abilities', changedAbilities);
  }

  const changeAndSaveSetting = (changedSettings) => {
    toggleCompactView(changedSettings)
    saveState('@saved_settings', changedSettings)
  }

  // Functions to menage Abilities: add/edit/delete

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

  return(
    <PaperProvider style={{flex: 1}} theme={theme}>
      <CompactView 
        compactView={compactView}
        toggleCompactView={() => changeAndSaveSetting(!compactView)}
        saveSettings={() => saveSettings()}
      />
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
        viewCompact={compactView}
      />
      <MainViewButton
        shortRest={() => shortRest()}
        longRest={() => longRest()}
        openAddModal={() => toggleAddModal(true)}
        openManageModal={() => toggleManageModal(true)}
      />
    </PaperProvider>
  )
}
