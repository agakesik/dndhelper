import React from 'react';
import CopyApp from './copy-App'
import CompactView from './Settings'

export default function App () {
  const [compactView, toggleCompactView] = React.useState(false)
  const [addAbilityModalVisible, toggleAddModal] = React.useState(false)
  const [manageAbilitiesModalVisible, toggleManageModal] = React.useState(false)
  const [editAbilityModalVisible, toggleEditModal] = React.useState(false)

  return(
    <>
      <CompactView 
        compactView={compactView}
        toggleCompactView={() => toggleCompactView(!compactView)}
      />
      <CopyApp 
        compactView={compactView}
        addAbilityModalVisible={addAbilityModalVisible}
        toggleAddModal={(bool) => toggleAddModal(bool)}
        manageAbilitiesModalVisible={manageAbilitiesModalVisible}
        toggleManageModal={(bool) => {toggleManageModal(bool)}}
        editAbilityModalVisible={editAbilityModalVisible}
        toggleEditModal={(bool) => toggleEditModal(bool)}
      />
    </>
  )
}
