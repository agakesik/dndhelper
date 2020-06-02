
import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import { theme } from './Styles.js'
import { Surface, Title } from 'react-native-paper';

export default function Abilities(props) {
  const abilities = props.abilities
  return (
    <View style={ props.viewCompact ? styles.abilities : {} }>
      {abilities.map((ability, i) => (
        <Ability
          name={ability.name}
          maxSlots={ability.maxSlots}
          usedSlots={ability.usedSlots}
          shortRest={ability.shortRest}
          onPress={() => props.onPress(i)}
          onLongPress={() => props.onLongPress(i)}
          key={ability.name}
        />
      ))}
    </View>
  )
}

function Ability(props) {
  const maxSlots = props.maxSlots;
  const usedSlots = props.usedSlots;
  const shortRest = props.shortRest;

  return (
    <View>
      <TouchableHighlight
        onPress={() => props.onPress()}
        onLongPress={() => props.onLongPress()}
        underlayColor={theme.colors.accent}
        style={[styles.ability, {
          opacity: (usedSlots==maxSlots) ? 0.3 : 1,
        }]}
      >
        <Surface style={{borderRadius: 5}}>
          <Title style={styles.abilityDescription}>{props.name}</Title>
          <View style={styles.row}>
            <AllSlots
              maxSlots={maxSlots}
              usedSlots={usedSlots}
              shortRest={shortRest}
            />
          </View>
        </Surface>
      </TouchableHighlight>
    </View>
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

  function SingleSlot(props) {
    return (
      <View style={[
        styles.slot,
        { backgroundColor: props.isUsed ? theme.colors.primary : "white" },
        { borderRadius: props.shortRest ? 10 : 1 },
      ]} />
    );
  }
  
  const styles = StyleSheet.create({
    abilities: {
     flexWrap: 'wrap',
     flexDirection: 'row',
     justifyContent: 'space-between' 
    },
    blank: {
    },
    ability: {
      margin: 10,
      elevation: 2,
      borderRadius: 5,
    },
    abilityDescription: {
      padding: 10,
      paddingBottom: 0,
    },
    slot: {
      margin: 10,
      height: 20,
      width: 20,
      borderWidth: 2,
      borderColor: theme.colors.primary,
    },
    row: {
      flexDirection: 'row',
    }
});