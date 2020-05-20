import React, { Component , useState} from 'react';
import { Text, TouchableHighlight, View, StyleSheet } from 'react-native';

function SingleSlot(props) {
  return (
    <View style={[styles.slot, {backgroundColor: props.isUsed ? "blue" : "white" }]} />
  )
}

export default function SlotsContainer(props) {
  const maxSlots = useState(props.maxSlots);
  const usedSlots = props.usedSlots;

  const renderSlots = () => {
    let slots = []
    for (let i=0; i<parseInt(maxSlots); i++) {
      let isUsed = false;
      if(i<parseInt(usedSlots)){
        isUsed = true;
      }
      slots.push(isUsed);
    }
    return slots
  };

  // const useSlot = () => {
  //   if(parseInt(usedSlots) < parseInt(maxSlots)) {
  //     changeSlot(usedSlots + 1);
  //   } else {
  //     alert('NO MORE SLOTS :c');
  //   }
  // };
  // const clearSlot = () => {
  //   if(parseInt(usedSlots) > 0) {
  //     changeSlot(usedSlots - 1);
  //   } else {
  //     alert('SLOTS FULL c:');
  //   }
  // };

  return (
    <>
      <TouchableHighlight 
        onPress={() => props.onPress()}
        onLongPress={() => props.onLongPress()}
        underlayColor="rgba(0,0,0, 0.2)"
        style={styles.slotsContainer}
      >
        <View >
          <Text>{props.value}.{props.name}: {usedSlots}/{maxSlots}</Text>
          <View style={styles.row}>
            {renderSlots().map((isUsed, i) =>
                <SingleSlot isUsed={isUsed} key={i} />
            )}
          </View>
        </View>
      </TouchableHighlight>
    </>
  );
}

const styles = StyleSheet.create({
  slotsContainer: {
    backgroundColor: 'rgba(0,0,0, 0.05)',
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  slot: {
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
