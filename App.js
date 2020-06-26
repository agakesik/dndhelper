import React from 'react';
import { DrawerLayoutAndroid, View, Text } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import Settings from './src/components/Settings'
import HomesScreen from './src/pages/Home';
import { theme } from './src/services/Styles.js'
import { translations } from './src/services/translations.js'

export default function App () {
  const [compactView, toggleCompactView] = React.useState(false)
  const [language, changeLanguage] = React.useState('en')

  const [abilities, changeAbilities] = React.useState([
    {name: "Example", maxSlots: 4, usedSlots: 2, shortRest: false}
  ])

  React.useEffect(() => {
    readState('@saved_settings', 'toggleCompactView')
    readState('@saved_abilities', 'changeAbilities')
    translations.setLanguage(language);
  }, [])

  const setLanguage = (language) => {
    changeLanguage(language)
    translations.setLanguage(language)
  }

  // ------- Functions to save and retrieve data from aync storage -----

  const saveState = async (stateKey, newState) => {
    try {
      const stringValue = JSON.stringify(newState)
      await AsyncStorage.setItem(stateKey, stringValue)
    } catch (err) {
      alert("failed to save to the storage")
    }
  }

  const readState = async (stateKey, changeStateFunction) => {
    try {
      const stringValue = await AsyncStorage.getItem(stateKey)
      const loadedState = JSON.parse(stringValue)

      if (loadedState !== null) {
        eval(changeStateFunction + '(loadedState)' )
      }
    } catch (err) {
      alert('failed to fetch data')
    }
  }

  // ------ change and save to storage -----------

  const changeAndSaveAbilities = (changedAbilities) => {
    changeAbilities(changedAbilities);
    saveState('@saved_abilities', changedAbilities);
  }

  const changeAndSaveSetting = (changedSettings) => {
    toggleCompactView(changedSettings)
    saveState('@saved_settings', changedSettings)
  }

  // other

  const drawerContent = (
    <Settings 
      compactView={compactView}
      toggleCompactView={() => changeAndSaveSetting(!compactView)}
      language={language}
      setLanguage={(nextLanguage) => setLanguage(nextLanguage)}
    />
  );

  return(
    <PaperProvider theme={theme}>
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition="left"
        renderNavigationView={() => drawerContent}
      >
        <HomesScreen 
          abilities={abilities}
          changeAndSaveAbilities={(changedAbilities) => changeAndSaveAbilities(changedAbilities) }
          compactView={compactView}
        />
      </DrawerLayoutAndroid>
    </PaperProvider>
  )
}
