
import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';

export default function Abilities(props) {
  const abilities = props.abilities
  return (
    abilities.map((ability, i) => (
      <Ability
        name={ability.name}
        maxSlots={ability.maxSlots}
        usedSlots={ability.usedSlots}
        shortRest={ability.shortRest}
        onPress={() => props.onPress(i)}
        onLongPress={() => props.onLongPress(i)}
        key={ability.name}
      />
    ))
  )
}


function Ability(props) {
  const maxSlots = props.maxSlots;
  const usedSlots = props.usedSlots;
  const shortRest = props.shortRest;

  return (
    <>
      <TouchableHighlight
        onPress={() => props.onPress()}
        onLongPress={() => props.onLongPress()}
        underlayColor="rgba(0,0,0, 0.2)"
        style={styles.ability}
      >
        <View >
          <Text>{props.name}: {usedSlots}/{maxSlots}</Text>
          <View style={styles.row}>
            <AllSlots
              maxSlots={maxSlots}
              usedSlots={usedSlots}
              shortRest={shortRest}
            />
          </View>
        </View>
      </TouchableHighlight>
    </>
  );
}

function SingleSlot(props) {
  return (
    <View style={[
      styles.slot,
      { backgroundColor: props.isUsed ? "blue" : "white" },
      { borderRadius: props.shortRest ? 20 : 0 },
    ]} />
  );
}

function AllSlots(props) {
  const maxSlots = props.maxSlots;
  const usedSlots = props.usedSlots;
  const shortRest = props.shortRest
  let slots = []
  for (let i = 0; i < parseInt(maxSlots); i++) {
    let isUsed = false;
    if (i < parseInt(usedSlots)) {
      isUsed = true;
    }
    slots.push(isUsed);
  }
  return (
    slots.map((isUsed, i) =>
      <SingleSlot isUsed={isUsed} shortRest={shortRest} key={i} />)
  );
}

const styles = StyleSheet.create({
  ability: {
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