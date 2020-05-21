import React, { Component , useState} from 'react';
import { Text, TouchableHighlight, View, StyleSheet } from 'react-native';

function SingleSlot(props) {
  return (
    <View style={[styles.slot, {backgroundColor: props.isUsed ? "blue" : "white" }]} />
  );
}

function AllSlots(props) {
  const maxSlots = useState(props.maxSlots);
  const usedSlots = props.usedSlots; 
  let slots = []
    for (let i=0; i<parseInt(maxSlots); i++) {
      let isUsed = false;
      if(i<parseInt(usedSlots)){
        isUsed = true;
      }
      slots.push(isUsed);
    }
  return (
    slots.map((isUsed, i) =>
      <SingleSlot isUsed={isUsed} key={i} /> )
  );
}

export default function SlotsContainer(props) {
  const maxSlots = useState(props.maxSlots);
  const usedSlots = props.usedSlots;

  return (
    <>
      <TouchableHighlight 
        onPress={() => props.onPress()}
        onLongPress={() => props.onLongPress()}
        underlayColor="rgba(0,0,0, 0.2)"
        style={styles.slotsContainer}
      >
        <View >
          <Text>{props.name}: {usedSlots}/{maxSlots}</Text>
          <View style={styles.row}>
            <AllSlots maxSlots={maxSlots} usedSlots={usedSlots} />
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
