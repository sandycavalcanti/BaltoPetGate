import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { shadow } from 'react-native-paper';
import { useState } from 'react';
import { Feather } from '@expo/vector-icons';

const DropdownButton = ({ options }) => {
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

        <Feather name="more-vertical" size={30} color="black" />
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

const Perfil_post = (props) => {

  const dropdownOptions = ['Opção 1', 'Opção 2', 'Opção 3'];

  return (
    <View style={styles.Container}>
      <View style={styles.ImagemCirculo}></View>
      <View style={styles.ContainerTexto}><Text style={styles.Texto}>Vanesa Juliana</Text></View>
      <View style={styles.ContainerIcon}>
        <DropdownButton options={dropdownOptions} />
      </View>


    </View>
  )
}

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    backgroundColor: '#B2EDC5',
    borderColor: 'white',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  ImagemCirculo: {
    backgroundColor: '#000',
    width: 40,
    height: 40,
    borderRadius: 25,
    borderColor: '#fff',
    borderWidth: 1,
  },
  ContainerTexto: {
    height: 'auto',
    width: 'auto',
    justifyContent: 'center',
    alignItems: 'center'
  },
  Texto: {
    color: '#000'
  },
  ContainerIcon: {
    alignItems: 'center',
    justifyContent: 'center'
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

export default Perfil_post;