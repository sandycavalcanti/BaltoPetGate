import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Picker from '@react-native-picker/picker'

const DropDownBotao = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (itemValue, itemIndex) => {
    setSelectedOption(itemValue);
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedOption}
        onValueChange={handleOptionChange}
        style={styles.dropdown}
      >
        <Picker.Item label="Selecione uma opção" value="" />
        <Picker.Item label="Opção 1" value="option1" />
        <Picker.Item label="Opção 2" value="option2" />
        <Picker.Item label="Opção 3" value="option3" />
      </Picker>
      {selectedOption !== '' && (
        <Text style={styles.selectedOption}>Opção selecionada: {selectedOption}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    width: 200,
    height: 40,
  },
  selectedOption: {
    marginTop: 20,
  },
});

export default DropDownBotao;