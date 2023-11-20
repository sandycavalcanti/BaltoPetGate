import { View, Text, TextInput, StyleSheet } from 'react-native';
import { corFundoCampoCad, corPlaceholderCad, valorBordaCampoCad } from '../../constants';
import PropTypes from 'prop-types';

const CampoMenor = (props) => {
  return (
    <View style={styles.containercampo}>
      <TextInput onChangeText={text => props.set(text)} placeholderTextColor={corPlaceholderCad} style={styles.campo} value={props.val} {...props} />
      {!props.opcional && <Text style={styles.asterisco}>*</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  containercampo: {
    width: '50%',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: 30,
  },
  campo: {
    width: '100%',
    fontSize: 18,
    paddingHorizontal: 10,
    padding: 5,
    backgroundColor: corFundoCampoCad,
    borderRadius: valorBordaCampoCad,
    marginVertical: 5,
  },
  asterisco: {
    position: 'absolute',
    fontSize: 25,
    color: 'red',
    right: 10,
    top: 10,
    bottom: 0,
  },
});

CampoMenor.propTypes = {
  set: PropTypes.func,
  val: PropTypes.string,
  opcional: PropTypes.bool
}

export default CampoMenor