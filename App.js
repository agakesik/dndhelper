import React, { Component, useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import SlotsContainer from './Slots.js'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      features: [
        {name: "Zaklęcia level 1", maxSlots: 4, usedSlots: 0},
        {name: "Zaklęcia level 2", maxSlots: 3, usedSlots: 0},
        {name: "Akt wiary", maxSlots: 1, usedSlots: 0}, 
        {name: "Eyes of the grave", maxSlots: 3, usedSlots: 0},
      ],
    };
  }

  useSlot(i) {
    let features = this.state.features;
    if(features[i].usedSlots < features[i].maxSlots) {
      features[i].usedSlots = features[i].usedSlots + 1;
      this.setState({features: features})
    } else {
      alert('NO MORE SLOTS :c');
    }
  };
  clearSlot (i) {
    let features = this.state.features;
    if(features[i].usedSlots > 0) {
      features[i].usedSlots = features[i].usedSlots - 1;
      this.setState({features: features})
    } else {
      alert('SLOTS FULL c:');
    }
  };

  render() {  
    let features = this.state.features;
    let containers = features.map(({name, maxSlots, usedSlots}, i) => 
      <SlotsContainer 
        name={name} 
        maxSlots={maxSlots} 
        usedSlots={usedSlots} 
        onPress={() => this.useSlot(i)}
        onLongPress={() => this.clearSlot(i)}
      /> );
      
    return (
      <View style={styles.appView}>
        {containers}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appView: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    padding: '5%',
    paddingTop: '10%',
  }
});
