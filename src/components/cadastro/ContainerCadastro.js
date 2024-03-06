import { SafeAreaView, Text, ImageBackground, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import { corFundoCad, corTituloCad } from '../../constants';
import PropTypes from 'prop-types';

const ContainerCadastro = (props) => {
  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding' keyboardVerticalOffset={-100}>
      <ScrollView style={styles.scroll} keyboardShouldPersistTaps="always">
        <SafeAreaView style={styles.container}>
          <ImageBackground style={styles.imagem} resizeMode="contain" source={require("../../../assets/img/Logo.png")} />
          <Text style={styles.titulo}>{props.titulo}</Text>
          {props.children}
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  scroll: {
    width: '100%',
    height: '100%',
    backgroundColor: corFundoCad,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  imagem: {
    height: 150,
    width: 150,
    marginTop: 50,
  },
  titulo: {
    fontSize: 25,
    color: corTituloCad,
    marginBottom: 15,
    marginTop: 5,
    textAlign: 'center'
  },
});

ContainerCadastro.propTypes = {
  titulo: PropTypes.string
}

export default ContainerCadastro