import React, { Component , useState} from 'react';
import { Text, TouchableHighlight, View, StyleSheet } from 'react-native';

function Spells(props) {
  const maxSlots = useState(props.maxSlots);
  const [usedSlots, changeSlot] = useState(0);

  const renderSpellSlots = () => {
    let slots = []
    for (let i=0; i<parseInt(maxSlots); i++) {
      let isUsed = false;
      if(i<usedSlots){
        isUsed = true;
      }
      slots.push(isUsed);
    }
    return slots
  };

  const useSlot = () => {
    if(parseInt(usedSlots) < parseInt(maxSlots)) {
      changeSlot(usedSlots + 1);
    } else {
      alert('NO MORE SPELLS :c');
    }
  };
  const clearSlot = () => {
    if(parseInt(usedSlots) > 0) {
      changeSlot(usedSlots - 1);
    } else {
      alert('SPELL FULL c:');
    }
  };


  return (
    <>
      <TouchableHighlight onPress={useSlot} onLongPress={clearSlot} underlayColor="red">
        <View>
          <Text>poziom {props.level}: {usedSlots}/{maxSlots}</Text>
          <View style={styles.row}>
            {renderSpellSlots().map((isUsed, i) => <SpellSlot isUsed={isUsed} key={i} />)}
          </View>
        </View>
      </TouchableHighlight>
    </>
  );
}

function SpellSlot(props) {
  const [isUsed, setUsed] = useState(false)

  return (
    <View style={[styles.button, {backgroundColor: props.isUsed ? "blue" : "white" }]} />
  )
}

export default function App() {
    return (
      <View style={styles.container}>
        <Text>hello</Text>
        <Spells level='1' maxSlots="4" onPress/>
        <Spells level='2' maxSlots="3" />
      </View>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    padding: '5%',
    paddingTop: '10%',
  },
  button: {
    margin: 10,
    height: 20,
    width: 20,
    borderWidth: 4,
    borderColor: 'blue',
  },
  row: {
    flexDirection: 'row',
  }
});
