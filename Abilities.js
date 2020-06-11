import React from 'react'
import { View, TouchableHighlight, ScrollView } from 'react-native';
import { theme, styles } from './Styles.js'
import { Surface, Title } from 'react-native-paper';

export default function Abilities(props) {
  const abilities = props.abilities

  return (
    <ScrollView>
      <View style={ props.viewCompact ? styles.abilitiesViewCompact : {} }>
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
    </ScrollView>
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
        style={[styles.singleAbility, styles.singleAbilityBorderRadius, {
          opacity: (usedSlots==maxSlots) ? 0.3 : 1,
        }]}
      >
        <Surface style={styles.singleAbilityBorderRadius}>
          <Title style={styles.abilityDescription}>{props.name}</Title>
          <AllSlots
            maxSlots={maxSlots}
            usedSlots={usedSlots}
            shortRest={shortRest}
          />
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
    <View style={styles.row}>
      {slots.map((isUsed, i) =>
        <SingleSlot isUsed={isUsed} shortRest={shortRest} key={i} />
      )}
    </View>
  );
}

  function SingleSlot(props) {
    return (
      <View style={[
        styles.singularSlot, {
          backgroundColor: props.isUsed ? theme.colors.primary : "white",
          borderRadius: props.shortRest ? 10 : 1,
        }
      ]} />
    );
  }
  