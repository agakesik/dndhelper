import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import SlotsContainer from './Slots.js'

function Spells(props) {
  return(
    <View style={styles.spellContainer}>
      <Text>Spells</Text>
      <SlotsContainer name='level 1' maxSlots="4" />
      <SlotsContainer name='level 2' maxSlots="3" />
    </View>
  )
}

export default function App() {
    return (
      <View style={styles.appView}>
        <Spells />
        <SlotsContainer name="akt wiary" maxSlots='1' />
        <SlotsContainer name="eyes of the grave" maxSlots='3' />
      </View>
    )
}


const styles = StyleSheet.create({
  appView: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    padding: '5%',
    paddingTop: '10%',
  },
  spellContainer: {
    backgroundColor: 'rgba(0,0,0, 0.05)',
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
});
