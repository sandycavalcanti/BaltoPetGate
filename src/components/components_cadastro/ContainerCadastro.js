import { SafeAreaView, Text, ImageBackground, StyleSheet, ScrollView, View } from 'react-native';
import { corFundoCad, corTituloCad } from '../../constants';

const ContainerCadastro = (props) => {
  return (
    <ScrollView style={{ width: '100%', height: '100%', }}>
      <SafeAreaView style={styles.container}>
        <ImageBackground style={styles.imagem} resizeMode="contain" source={require("../../../assets/img/Logo.png")} />
        <Text style={styles.titulo}>{props.titulo}</Text>
        {props.children}
      </SafeAreaView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: corFundoCad,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    minHeight: '100%',
  },
  imagem: {
    height: 150,
    width: 150,
    marginTop: 20,
  },
  titulo: {
    fontSize: 25,
    color: corTituloCad,
    marginBottom: 15,
    marginTop: 5,
  },
});

export default ContainerCadastro