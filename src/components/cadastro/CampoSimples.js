import { View, Text, TextInput, StyleSheet } from 'react-native';
import { corFundoCampoCad, corPlaceholderCad, valorBordaCampoCad } from '../../constants';
import PropTypes from 'prop-types';

const CampoSimples = (props) => {
  const onChangeText = (text) => {
    if(props.set){
      props.set(text)
    } else if(props.setRef){
      props.setRef.current = text;
    }
  }
  
  return (
    <View style={styles.containercampo}>
      <TextInput onChangeText={onChangeText} placeholderTextColor={corPlaceholderCad} style={styles.campo} value={props.val} {...props} />
      {!props.opcional && <Text style={styles.asterisco}>*</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  containercampo: {
    width: '95%',
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

CampoSimples.propTypes = {
  set: PropTypes.func,
  setRef: PropTypes.object,
  val: PropTypes.string,
  opcional: PropTypes.bool,
  placeholder: PropTypes.string,
  keyboardType: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default CampoSimples