import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Checkbox } from 'react-native-paper'
import { styles, blackPrimary } from '../services/Styles';
import { translations } from '../services/translations.js'

export default function Settings(props) {
  return (
    <View style={{marginTop: 20}}> 
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
    <View style={styles.settingGroup}>
      {/* <Text style={styles.settingsDescription}>{translations.compactView}</Text> */}
      {/* <Switch
        value={props.compactView}
        onValueChange={() => props.toggleCompactView()}
        style={{margin: 10}}
      /> */}
      <Checkbox.Item
        status={props.compactView ? 'checked' : 'unchecked'}
        onPress={() => props.toggleCompactView()}
        label={translations.compactView}
        labelStyle={[styles.settingsDescription, {padding: 0}]}
        style={styles.settingsTitle}
        theme={blackPrimary}
        color="black"
      />
    </View>
  );
}

function SetLanguage(props) {
  const currentLanguage = props.language
  return (
    <View style={styles.settingGroup}>
      <Text style={[
        styles.settingsDescription,
        styles.settingsTitle
      ]}>{translations.changeLanguage}</Text>
      {translations.getAvailableLanguages().map(language => (
        <View key={language}>
          <TouchableOpacity
            style={{
              padding: 15,
              paddingLeft: 40,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => props.setLanguage(language)}>
            <Text >{language}</Text>
            {currentLanguage === language ? (
              <Text style={{marginLeft: 30}}>√</Text>
            ) : null}
          </TouchableOpacity>
        </View>
      ))}
    </View>
  )
}