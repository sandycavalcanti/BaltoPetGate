import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TextInput, ScrollView, SafeAreaView } from 'react-native';
import { urlAPI } from '../../constants';
import ChecarImagem from '../../utils/ChecarImagem';

const Contato = (props) => {
  const [imageExists, setImageExists] = useState(true);
  const urlImg = urlAPI + 'selpessoaimg/' + props.id;

  useEffect(() => {
    ChecarImagem(urlImg, setImageExists);
  }, [urlImg]);

  return (
    <View style={styles.container}>
      {imageExists ? <Image style={[styles.contactImage, { opacity: props.desativado ? 0.5 : 1 }]} source={{ uri: urlImg }} resizeMode='cover' /> : <Image style={styles.contactImage} source={{ uri: 'https://via.placeholder.com/100' }} resizeMode='cover' />}
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