import { useState } from 'react';
import { StyleSheet, Text, View, ToastAndroid, Alert, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Avatar, Button } from 'react-native-paper';
import axios from 'axios';
import { urlAPI } from '../constants';

export default function App() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setImage(null)
    ToastAndroid.show('Imagem removida', ToastAndroid.SHORT);
  }

  const Cadastrar = async () => {
    const formData = new FormData();
    let imagem = {
      uri: image,
      type: 'image/jpeg',
      name: 'image.jpg',
    };

    formData.append('TB_PESSOA_NOME', 'É O GATOOOOOOOOOPOOO');
    formData.append('TB_PESSOA_NOME_PERFIL', 'TESTANDOO');
    formData.append('TB_TIPO_ID', 1);
    formData.append('TB_PESSOA_EMAIL', 'GATO1');
    formData.append('TB_PESSOA_SENHA', '123');
    formData.append('img', imagem);

    await axios.post(urlAPI + 'cadpessoa', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then(response => {
      console.log(response.data.message)
    }).catch(error => {
      console.error(error)
      console.error(error.response.data)
    })
  }

  return (
    <View style={styles.centerContent} >
      <View>
        <TouchableOpacity onPress={() => pickImage()}>
          <Avatar.Image size={250} source={{ uri: image }} />
        </TouchableOpacity>
      </View>
      <View style={[styles.centerContent, { marginTop: 25, flexDirection: 'row' }]}>
        <Button mode="contained" onPress={Cadastrar}>
          Cadastrar
        </Button>
        <Button mode="contained" style={{ marginLeft: 20 }} onPress={() => removeImage()}>
          Remove Image
        </Button>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
});