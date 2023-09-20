import { useState } from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';

const App = () => {
  const [imageUri, setImageUri] = useState(null);

  // Função para abrir o seletor de imagem
  const selectImage = () => {
    const options = {
      title: 'Selecionar imagem',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('Seleção de imagem cancelada');
      } else if (response.error) { 
        console.log('Erro ao selecionar imagem:', response.error);
      } else {
        // Obtém o URI da imagem selecionada
        const uri = response.uri;
        setImageUri(uri);

        // Envia a imagem para a rota de upload
        enviarImagem(uri);
      }
    });
  };

  // Função para enviar a imagem para a rota de upload
  const enviarImagem = async (imageUri) => {
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: imageUri,
        type: 'image/jpeg', // ou o tipo de arquivo correto
        name: 'imagem.jpg',
      });

      const response = await axios.put('http://seuservidor/upload', formData);
      console.log('Resposta do servidor:', response.data);
    } catch (error) {
      console.error('Erro ao enviar imagem:', error);
    }
  };

  return (
    <View style={styles.container}>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <Button title="Selecionar imagem" onPress={selectImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
});

export default App;
