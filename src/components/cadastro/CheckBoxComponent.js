import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
import PropTypes from 'prop-types';

const CheckBoxComponent = (props) => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxToggle = () => {
    setChecked(!checked);
    props.set(!checked);
  };

  return (
    <View style={styles.container}>
      <CheckBox 
        title={props.texto}
        checked={checked}
        onPress={handleCheckboxToggle}
        {...props} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

CheckBoxComponent.propTypes = {
  set: PropTypes.func,
  texto: PropTypes.string
}

export default CheckBoxComponent;
