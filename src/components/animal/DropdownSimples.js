import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';



const DropdownSimples = (props) => {
  const [value, setValue] = useState(null);

  return (
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={props.data}
        labelField="label"
        valueField="value"
        placeholder={props.texto}
        value={value}
        onChange={item => {
          setValue(item.value);
            props.set(item.value)
        }}
      />
  )
}

export default DropdownSimples;

const styles = StyleSheet.create({
  dropdown: {    
    flex: 1,
    fontSize: 18,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 15,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 18,
    color: "#8EBF81"
  },
  selectedTextStyle: {
    fontSize: 18,
  }
});