import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const RadioButton3 = (props) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionPress = (option) => {
    props.set(option)
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.optionButton, selectedOption === 'SIM' && styles.selectedOption]}
        onPress={() => handleOptionPress('SIM')}>
        <Text style={styles.optionText}>Sim</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.optionButton, selectedOption === 'NAO' && styles.selectedOption]}
        onPress={() => handleOptionPress('NAO')}
      >
        <Text style={styles.optionText}>Não</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.optionButton, selectedOption === 'INDEFINIDO' && styles.selectedOption]}
        onPress={() => handleOptionPress('INDEFINIDO')}
      >
        <Text style={styles.optionText}>Não sei informar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  optionButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    margin: 5,
    backgroundColor: '#FFF',
  },
  optionText: {
    fontSize: 18,
    color:"#8EBF81"
  },
  selectedOption: {
    backgroundColor: 'lightblue',
  },
});

export default RadioButton3;
