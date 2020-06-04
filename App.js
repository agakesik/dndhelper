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
    {name: "Zaklęcia level 2", maxSlots: 3, usedSlots: 1, shortRest: false}
  ])

  const addAbility = (name, maxSlots, isShortRest) => {
    // let abilities =abilities.slice();
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
    let newAbilities = abilities.slice()
    let temp = newAbilities[i-1]
    newAbilities[i-1] = newAbilities[i]
    newAbilities[i] = temp
    changeAbilities(newAbilities)
    // this.saveState()
  }

  const moveDown = (i) => {
    let newAbilities = abilities.slice()
    let temp = newAbilities[i+1]
    newAbilities[i+1] = newAbilities[i]
    newAbilities[i] = temp
    changeAbilities(newAbilities)
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
      />
    </>
  )
}
