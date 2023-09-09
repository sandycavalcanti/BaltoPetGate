import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';

const CheckBox = () => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxToggle = () => {
    setChecked(!checked);
  };

  return (
    <View style={styles.container}>
      <CheckBox
        title="Marque esta caixa"
        checked={checked}
        onPress={handleCheckboxToggle}
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

export default CheckBox;
