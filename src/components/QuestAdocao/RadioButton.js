import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { corBotaoCad, corPlaceholderCad } from '../../constants';

const RadioButton = (props) => {
  const options = props.opcoes;
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionPress = (option) => {
    props.set(option);
    setSelectedOption(option);
  };

  const Opcoes = (option) => {
    switch (option) {
      case 'SIM':
        return 'Sim';
        break;
      case 'NAO':
        return 'Não';
        break;
      case 'INDEFINIDO':
        return 'Não sei informar';
        break;
      case 'CASA':
        return 'Casa';
        break;
      case 'APARTAMENTO':
        return 'Apartamento';
        break;
      case 'POUCO':
        return 'Pouco';
        break;
      case 'MEDIO':
        return 'Médio';
        break;
      case 'MUITO':
        return 'Muito';
        break;
      default:
        return option;
        break;
    }
  }

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity key={option}
          style={[styles.optionButton, selectedOption === option && styles.selectedOption]}
          onPress={() => handleOptionPress(option)}>
          <Text style={[styles.optionText, selectedOption === option && styles.selectedText]}>
            {Opcoes(option)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    display: 'flex',
  },
  optionButton: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 15,
    margin: 5,
    backgroundColor: '#FFF',
  },
  optionText: {
    fontSize: 18,
    color: corPlaceholderCad,
  },
  selectedOption: {
    backgroundColor: corBotaoCad,
  },
  selectedText: {
    color: '#FFF',
  },
});

export default RadioButton;