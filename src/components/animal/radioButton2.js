import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { corBotaoCad, corPlaceholderCad } from '../../constants';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const RadioButton2 = (props) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionPress = (option) => {
    props.set(option)
    setSelectedOption(option)
  };

  useEffect(() => {
    if (props.val) {
      setSelectedOption(props.val)
    }
  }, [props.val]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.optionButton, selectedOption === true && styles.selectedOption]} onPress={() => handleOptionPress(true)}>
        <Text style={[styles.optionText, selectedOption === true && styles.selectedText]}>Saudável</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.optionButton, selectedOption === false && styles.selectedOption]} onPress={() => handleOptionPress(false)}>
        <Text style={[styles.optionText, selectedOption === false && styles.selectedText]}>Não Saudável</Text>
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
    color: corPlaceholderCad
  },
  selectedOption: {
    backgroundColor: corBotaoCad,
  },
  selectedText: {
    color: '#FFF'
  }
});

RadioButton2.propTypes = {
  set: PropTypes.func,
}

export default RadioButton2;