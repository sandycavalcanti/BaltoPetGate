import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';

const data = [
  { label: 'Item 1', value: 1 },
  { label: 'Item 2', value: 2 },
  { label: 'Item 3', value: 3 },
  { label: 'Item 4', value: 4 },
  { label: 'Item 5', value: 5 },
  { label: 'Item 6', value: 6 },
  { label: 'Item 7', value: 7 },
  { label: 'Item 8', value: 8 },
];

const Teste = () => {
  const [selected, setSelected] = useState([]);

  return (
    <View style={styles.container}>
      <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Selecione os temperamentos"
        value={selected}
        onChange={item => {
          setSelected(item);
          console.log(selected)
        }}
        selectedStyle={styles.selectedStyle}
      />
    </View>
  );
};

export default Teste;

const styles = StyleSheet.create({
  container: { padding: 16 },
  dropdown: {
    height: 50,
    backgroundColor: 'transparent',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  selectedStyle: {
    borderRadius: 12,
  },
});