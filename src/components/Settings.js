import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { Switch } from 'react-native-paper'
import { styles } from './Styles';

export default function CompactView(props) {
  return (
    <View style={styles.compactViewToggle}>
      <Text style={styles.settingsDescription}>Widok kompaktowy</Text>
      <Switch
        value={props.compactView}
        onValueChange={() => props.toggleCompactView()}
        style={{margin: 10}}
      />
    </View>
  );
}