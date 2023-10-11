import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TextInput, ScrollView, SafeAreaView } from 'react-native';
import { urlAPI } from '../../constants';

const Contato = (props) => {

  const [urlImg, setUrlImg] = useState(urlAPI + 'selpessoaimg/' + props.id);

  useEffect(() => {
    const checkImageExists = async () => {
      try {
        const response = await fetch(urlImg);
        if (!response.ok) {
          setUrlImg('https://via.placeholder.com/100');
        }
      } catch (error) {
        setUrlImg('https://via.placeholder.com/100');
      }
    };

    checkImageExists();
  }, [urlImg]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.contactImage}
        source={{ uri: urlImg }}
      />
      <Text style={styles.contactName}>{props.nome}</Text>
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