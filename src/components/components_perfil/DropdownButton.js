import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const DropdownButtonConst = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionPress = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity
        style={styles.dropdownHeader}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={styles.selectedOptionText}>
          {selectedOption || 'Selecione uma opção'}
        </Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdownOptions}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleOptionPress(option)}
            >
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const DropdownButton = () => {
  const dropdownOptions = ['Opção 1', 'Opção 2', 'Opção 3'];

  return (
    <View style={styles.container}>
      <DropdownButtonConst options={dropdownOptions} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    position: 'relative',
    width: 200,
  },
  dropdownHeader: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  selectedOptionText: {
    textAlign: 'center',
  },
  dropdownOptions: {
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginTop: 5,
  },
  optionButton: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default DropdownButton;
