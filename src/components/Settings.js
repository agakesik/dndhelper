import React from 'react';
import { View, Text } from 'react-native';
import { Switch } from 'react-native-paper'
import { styles } from '../services/Styles';
import { translations } from '../services/translations.js'

export default function Settings(props) {
  return (
    <View>
      <SetLanguage 
        language={props.language}
        setLanguage={(nextLanguage) => props.setLanguage(nextLanguage)}
      />
      <CompactView 
        compactView={props.compactView}
        toggleCompactView={() => props.toggleCompactView()}
      />
    </View>
  )
}

 function CompactView(props) {
  return (
    <View style={styles.compactViewToggle}>
      <Text style={styles.settingsDescription}>{translations.compactView}</Text>
      <Switch
        value={props.compactView}
        onValueChange={() => props.toggleCompactView()}
        style={{margin: 10}}
      />
    </View>
  );
}

function SetLanguage(props) {
  const currentLanguage = props.language
  const nextLanguage = (currentLanguage === 'en' ? 'pl' : 'en')
  return (
    <View style={styles.compactViewToggle}>
      <Text style={styles.settingsDescription}>english</Text>
      <Switch
        value={currentLanguage === 'en' ? false : true}
        onValueChange={() => {
          props.setLanguage(nextLanguage)
        }}
        style={{margin: 10}}
      />
      <Text style={styles.settingsDescription}>polski</Text>
    </View>
  )
}