import React from 'react';
import CopyApp from './copy-App'
import CompactView from './Settings'
import AllModals from './Modals.js'

export default function App () {
  const [compactView, toggleCompactView] = React.useState(false)
  const [addAbilityModalVisible, toggleAddModal] = React.useState(false)
  const [manageAbilitiesModalVisible, toggleManageModal] = React.useState(false)
  const [editAbilityModalVisible, toggleEditModal] = React.useState(false)

  const [abilities, changeAbilities] = React.useState([
    {name: "Zaklęcia level 1", maxSlots: 4, usedSlots: 2, shortRest: false},
    {name: "coś tam", maxSlots: 2, usedSlots: 1, shortRest: true},
    {name: "Zaklęcia level 2", maxSlots: 3, usedSlots: 1, shortRest: false}
  ])

  // Functions to menage Abilities: add/edit/delete

  const addAbility = (name, maxSlots, isShortRest) => {
    let newAbility = { name: name, maxSlots: maxSlots, usedSlots: 0, shortRest: isShortRest}
    changeAbilities(abilities => [...abilities, newAbility]);
    // this.saveState()
    toggleAddModal(false)
  }

  const deleteAbility = (i) => {
    let abilitiesAfterDeleting = abilities.filter((ability, j) => {
      if (i !== j) { return ability }
    });
    changeAbilities(abilitiesAfterDeleting);
    // this.saveState()
  }

  const editAbility = (i, name, maxSlots, shortRest) => {
    let editedAbilities = abilities.slice()
    if (name) {editedAbilities[i].name = name}
    if (maxSlots) {editedAbilities[i].maxSlots = maxSlots}
    if (shortRest!== null) {editedAbilities[i].shortRest = shortRest}
    changeAbilities(editedAbilities)
    // this.saveState()
  }

  const moveUp = (i) => {
    let changedAbilities = abilities.slice()
    let temp = changedAbilities[i-1]
    changedAbilities[i-1] = changedAbilities[i]
    changedAbilities[i] = temp
    changeAbilities(changedAbilities)
    // this.saveState()
  }

  const moveDown = (i) => {
    let changedAbilities = abilities.slice()
    let temp = changedAbilities[i+1]
    changedAbilities[i+1] = changedAbilities[i]
    changedAbilities[i] = temp
    changeAbilities(changedAbilities)
    // this.saveState()
  }
  
  // functions that change the state of Abilities 

  const useSlot = (i) => {
    let changedAbilities = abilities.slice();
    if(changedAbilities[i].usedSlots < changedAbilities[i].maxSlots) {
      changedAbilities[i].usedSlots = changedAbilities[i].usedSlots + 1;
      changeAbilities(changedAbilities)
      // this.saveState()
    } else {
      alert('NO MORE SLOTS :c');
    }
  };

  const clearSlot = (i) => {
    let changedAbilities = abilities.slice();
    if(changedAbilities[i].usedSlots > 0) {
      changedAbilities[i].usedSlots = changedAbilities[i].usedSlots - 1;
      changeAbilities(changedAbilities)
      // this.saveState()
    } else {
      alert('SLOTS FULL c:');
    }
  };

  const longRest = () => {
    let changedAbilities = abilities.slice();
    for (let i=0; i<changedAbilities.length; i++){
      changedAbilities[i].usedSlots = 0
    }
    changeAbilities(changedAbilities)
    // this.saveState()
  }

  const shortRest = () => {
    let changedAbilities = abilities.slice();
    for (let i=0; i<changedAbilities.length; i++){
      if(changedAbilities[i].shortRest){
        changedAbilities[i].usedSlots = 0
      }
    }
    changeAbilities(changedAbilities)
    // this.saveState()
  }

  return(
    <>
      <CompactView 
        compactView={compactView}
        toggleCompactView={() => toggleCompactView(!compactView)}
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
      <CopyApp 
        compactView={compactView}
        abilities={abilities}
        changeAbilities={(changedAbilities) => changeAbilities(changedAbilities)}
        openAddModal={() => toggleAddModal(true)}
        openManageModal={() => toggleManageModal(true)}
        useSlot={(i) => useSlot(i)}
        clearSlot={(i) => clearSlot(i)}
        longRest={() => longRest()}
        shortRest={() => shortRest()}
      />
    </>
  )
}
