import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import PropTypes from 'prop-types';

const DropdownSimples = (props) => {
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (props.val) {
      setValue(props.val)
    }
  }, [props.val]);

  const onChange = (item) => {
    setValue(item.value);
    if (props.setRef) {
      props.setRef.current = item.value;
    } else {
      props.set(item.value);
    }
  }
  return (
    <Dropdown
      style={[styles.dropdown, props.style]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      data={props.data}
      labelField="label"
      valueField="value"
      placeholder={props.texto}
      value={value}
      onChange={onChange}
    />
  )
}

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

DropdownSimples.propTypes = {
  data: PropTypes.array,
  texto: PropTypes.string,
  set: PropTypes.func,
  setRef: PropTypes.object,
  val: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}

export default DropdownSimples;