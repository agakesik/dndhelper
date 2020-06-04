import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { Switch } from 'react-native-paper'

export default function CompactView(props) {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
      <Text style={{alignSelf: 'center', fontSize: 12}}>Widok kompaktowy</Text>
      <Switch
        value={props.compactView}
        onValueChange={() => props.toggleCompactView()}
        style={{margin: 10,}}
      />
    </View>
  );
}