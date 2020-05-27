
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Button,
  Text,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import RadioButton from 'react-native-paper/lib/commonjs/components/RadioButton/RadioButton';

export default function AddAbility(props) {
  const modalVisible = props.modalVisible;
  const [name, setName] = useState('');
  const [maxSlots, setMaxSlots] = useState(0);
  const [isShortRest, setIfShortRest] = useState(false);
  const [error, addError] = useState("");

  return(
    <View>
      <Modal 
        isVisible={modalVisible}
        onRequestClose={() => props.closeModal()}
      >
        <View style={styles.modalContainer}>
          <Text>Dodaj nową umiejętność</Text>
          <TextInput
            placeholder="nazwa"
            placeholderTextColor="rgba(0,0,0,0.5)"
            maxLength={40}
            onChangeText={text => setName(text)}
            value={name}
          />
          <TextInput
            placeholder="liczba użyć"
            placeholderTextColor="rgba(0,0,0,0.5)"
            maxLength={1}
            keyboardType={'numeric'}
            onChangeText={number => 
              setMaxSlots(number.replace(/[^1-9]/g, ''))
            }
          />
          <View style={styles.radioButton}>
            <Text style={{fontSize: 25}}>Short rest</Text>
            <RadioButton
              value="Short rest"
              status={isShortRest === true ? 'checked' : 'unchecked'}
              onPress={() => setIfShortRest(true)}
            />
          </View>
          <View style={styles.radioButton}>
            <Text style={{fontSize: 25}}>Long rest</Text>
            <RadioButton
              value="Long rest"
              status={isShortRest === false ? 'checked' : 'unchecked'}
              onPress={() => setIfShortRest(false)}
            />
          </View>
          <Text>nowa umiejętność:</Text>
          <Text>nazwa: {name}</Text>
          <Text>liczba użyć: {maxSlots}</Text>
          <Text>rodzaj: {isShortRest ? "short rest" : "long rest"}</Text>
          <Text>{error}</Text>
          <Button 
            onPress={() => props.closeModal()}
            title="anuluj"
          />
          <Button 
          title="dodaj"
          onPress={() => {
            props.addAbility(name, maxSlots, isShortRest);
            setName("");
            setMaxSlots(0);
            setIfShortRest(false);
          }}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#fff',
    padding: 30,
  },
  radioButton: {
    flexWrap: 'wrap', 
    flexDirection: 'row',
    alignContent: 'flex-end'
    // justifyContent: 'center'
  }
});