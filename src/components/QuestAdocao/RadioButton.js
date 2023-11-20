import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { corBotaoCad, corPlaceholderCad } from '../../constants';
import PropTypes from 'prop-types';

const RadioButton = (props) => {
  const options = props.opcoes;
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionPress = (option) => {
    props.set(option);
    setSelectedOption(option);
  };

  const Opcoes = (option) => {
    switch (option) {
      case true:
        return 'Sim';
      case false:
        return 'Não';
      case 'INDEFINIDO':
        return 'Não sei informar';
      case 'CASA':
        return 'Casa';
      case 'APARTAMENTO':
        return 'Apartamento';
      case 'POUCO':
        return 'Pouco';
      case 'MEDIO':
        return 'Médio';
      case 'MUITO':
        return 'Muito';
      default:
        return option;
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

RadioButton.propTypes = {
  set: PropTypes.func,
  opcoes: PropTypes.array
}

export default RadioButton;