import React, {
  useState,
  Component,
} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableHighlight,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      abilities: [
        {name: "Zaklęcia level 1", maxSlots: 4, usedSlots: 0, shortRest: false},
        {name: "Zaklęcia level 2", maxSlots: 3, usedSlots: 0, shortRest: false},
        {name: "Akt wiary", maxSlots: 1, usedSlots: 0, shortRest: true}, 
        {name: "Eyes of the grave", maxSlots: 3, usedSlots: 0, shortRest: true},
      ],
    };
  }

  useSlot(i) {
    let abilities = this.state.abilities;
    if(abilities[i].usedSlots < abilities[i].maxSlots) {
      abilities[i].usedSlots = abilities[i].usedSlots + 1;
      this.setState({abilities: abilities})
    } else {
      alert('NO MORE SLOTS :c');
    }
  };
  clearSlot (i) {
    let abilities = this.state.abilities;
    if(abilities[i].usedSlots > 0) {
      abilities[i].usedSlots = abilities[i].usedSlots - 1;
      this.setState({abilities: abilities})
    } else {
      alert('SLOTS FULL c:');
    }
  };

  longRest() {
    // alert('long rest!');
    let abilities = this.state.abilities;
    for (let i=0; i<abilities.length; i++){
      abilities[i].usedSlots = 0
    }
    this.setState({abilities: abilities})
  }

  shortRest() {
    // alert('short rest!');
    let abilities = this.state.abilities;
    for (let i=0; i<abilities.length; i++){
      if(abilities[i].shortRest){
        abilities[i].usedSlots = 0
      }
    }
    this.setState({abilities: abilities})
  }

  render() {  
    let abilities = this.state.abilities;
    let showAbilities = abilities.map((ability, i) => 
        <Ability 
          name={ability.name} 
          maxSlots={ability.maxSlots} 
          usedSlots={ability.usedSlots} 
          shortRest={ability.shortRest}
          onPress={() => this.useSlot(i)}
          onLongPress={() => this.clearSlot(i)}
        />
    );
      
    return (
      <ScrollView style={styles.appView}>
        <View style={styles.controllerMenu}>
          <Button 
            onPress={() => this.shortRest()}
            title="short rest"
          />
          <Button 
            onPress={() => this.longRest()}
            title="long rest"
          />
        </View>
        {showAbilities}
      </ScrollView>
    );
  }
}

function Ability(props) {
  const maxSlots = useState(props.maxSlots);
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
      {backgroundColor: props.isUsed ? "blue" : "white" },
      {borderRadius: props.shortRest ? 20 : 0 },
    ]} />
  );
}

function AllSlots(props) {
  const maxSlots = props.maxSlots;
  const usedSlots = props.usedSlots; 
  const shortRest = props.shortRest
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
      <SingleSlot isUsed={isUsed} shortRest={shortRest} key={i} /> )
  );
}


const styles = StyleSheet.create({
  appView: {
    flex: 1,
    // justifyContent: 'flex-start',
    backgroundColor: '#fff',
    padding: '5%',
    paddingTop: '10%',
  },
  controllerMenu: {
    flexDirection: 'row',
    justifyContent: "space-around",

  },
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
