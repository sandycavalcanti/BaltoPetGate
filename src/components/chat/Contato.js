import { StyleSheet, Text, View } from 'react-native';
import { urlAPI } from '../../constants';
import Imagem from '../geral/Imagem';

const Contato = (props) => {
  const urlImg = urlAPI + 'selpessoaimg/' + props.id;

  return (
    <View style={styles.container}>
      <Imagem url={urlImg} desativado={props.desativado} style={styles.contactImage}/>
      <Text style={[styles.contactName, { opacity: props.desativado ? 0.5 : 1 }]}>{props.nome}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginLeft: 10,
  },
  contactImage: {
    width: 80,
    height: 80,
    borderRadius: 250,
    borderColor: 'white',
    borderWidth: 1,
  },
  contactName: {
    width: 90,
    paddingVertical: 6,
    fontSize: 18,
    color: "#697C55",
    textAlign: 'center'
  },
});

export default Contato;