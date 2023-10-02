import React, { useState, useEffect } from 'react';
import { Button, Image, View, TouchableOpacity, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { urlAPI, urlLocal } from '../constants';

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
  // Função para enviar a imagem
  const enviarImagem = async () => {
    try {
      // Crie um objeto FormData para enviar a imagem
      const formData = new FormData();
      formData.append('image', {
        name: 'image.jpg', // Nome da imagem que será usado no servidor
        type: 'image/jpeg', // Tipo da imagem (pode variar dependendo do formato)
        uri: image.uri, // A URI da imagem no React Native
      });

      // Faça a solicitação POST usando o Axios
      const response = await axios.put(urlAPI + `/altpessoa/8`, formData);

      // Verifique a resposta do servidor
      if (response.status === 200) {
        console.log('Imagem enviada com sucesso');
      } else {
        console.error('Erro ao enviar imagem');
      }
    } catch (error) {
      console.error('Erro ao enviar imagem:', error);
    }
  };
  const Enviar = async () => {
    if (!image) {
      return console.error('Nenhuma imagem selecionada.');
    }

    const formData = new FormData();
    formData.append('image', image);
    // formData.append('image', { uri: image, name: 'photo.png', filename: 'imageName.png', type: 'image/png' });
    // formData.append('Content-Type', 'image/png');
    // formData.append('TB_PESSOA_UF', 'SP');

    await axios.put(urlLocal + 'altpessoa/8', image)
      .then(response => {
        console.log(response.data);
      }).catch(error => {
        console.error(error);
      })
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button title="Enviar" onPress={enviarImagem} />
    </View>
  );
}
