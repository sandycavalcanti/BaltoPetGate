
import { useState, useEffect } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Modal, StyleSheet, Text, View, Button, TextInput, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject, watchPositionAsync, LocationAccuracy } from 'expo-location';
import axios from 'axios';
import { urlAPI } from '../../constants';

export default function App() {
  const [location, setLocation] = useState(null);
  const [redMarkerCoords, setRedMarkerCoords] = useState(null);
  const [orangeMarkersCoords, setOrangeMarkersCoords] = useState([]);
  const [pinkMarkersCoords, setPinkMarkersCoords] = useState([]);
  // Remover o estado dos pontos de alimentação
  // const [feedingPoints, setFeedingPoints] = useState([]);
  const [isOrangeModalVisible, setIsOrangeModalVisible] = useState(false);
  const [isPinkModalVisible, setIsPinkModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [description, setDescription] = useState('');

  async function requestLocationPermissions() {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
      setRedMarkerCoords(currentPosition.coords);
      console.log("LOCALIZAÇÃO ATUAL =>", currentPosition);
    }
  }

  useEffect(() => {
    requestLocationPermissions();
  }, []);

  useEffect(() => {
    watchPositionAsync({
      accuracy: LocationAccuracy.Highest,
      timeInterval: 1000,
      distanceInterval: 1,
    }, (response) => {
      console.log("NOVA LOCALIZAÇÃO!", response);
      setLocation(response);
    });
  }, []);

  // Remover a função de adicionar marcadores amarelos
  // function handleMapPress(e) {
  //   // Aqui você pode obter as coordenadas do local onde o usuário clicou
  //   // e armazená-las em um banco de dados ou enviá-las para uma API externa.
  //   // Por exemplo:
  //   // saveFeedingPointInDatabase(e.nativeEvent.coordinate);
  //   setFeedingPoints([...feedingPoints, e.nativeEvent.coordinate]);
  // }

  let coords = [];

  const getMarkers = async () => {
    const response = await axios.get(urlAPI + 'selpontoalimentacao')
    response.data.map((item) => {
      const latitude = parseFloat(item.TB_PONTO_ALIMENTACAO_LATITUDE);
      const longitude = parseFloat(item.TB_PONTO_ALIMENTACAO_LONGITUDE);

      coords.push({ latitude, longitude });
      setOrangeMarkersCoords(coords)
    });
  }

  useEffect(() => {
    getMarkers();
  }, [])

  const insert = async (redMarkerCoords) => {
    const TB_PONTO_ALIMENTACAO_LATITUDE = redMarkerCoords.latitude.toFixed(6);
    const TB_PONTO_ALIMENTACAO_LONGITUDE = redMarkerCoords.longitude.toFixed(6);

    const response = await axios.post(urlAPI + 'cadpontoalimentacao', {
      TB_PESSOA_ID: 1,
      TB_PONTO_ALIMENTACAO_LATITUDE,
      TB_PONTO_ALIMENTACAO_LONGITUDE,
    })
    console.log(response.data)
  }

  async function handleSelectImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Desculpe, precisamos de permissões de acesso à câmera para fazer isso funcionar!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.uri);
    }
  }

  function handleAddOrangeMarker() {
    if (selectedImage && description) {
      setOrangeMarkersCoords([...orangeMarkersCoords, redMarkerCoords]);
      setIsOrangeModalVisible(false);
      // Limpar os campos após adicionar o marcador
      setSelectedImage(null);
      setDescription('');
    } else {
      alert('Por favor, selecione uma imagem e adicione uma descrição antes de adicionar um marcador laranja.');
    }
  }

  function handleAddPinkMarker() {
    if (selectedImage && description) {
      setPinkMarkersCoords([...pinkMarkersCoords, redMarkerCoords]);
      setIsPinkModalVisible(false);
      // Limpar os campos após adicionar o marcador
      setSelectedImage(null);
      setDescription('');
    } else {
      alert('Por favor, selecione uma imagem e adicione uma descrição antes de adicionar um marcador rosa.');
    }
  }

  return (
    <View style={styles.container}>
      {location &&
        <MapView
          style={{ width: '100%', height: '100%' }}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
          }}
        // Remover a propriedade onPress do mapa
        // onPress={handleMapPress}
        >
          <Marker
            coordinate={redMarkerCoords}
          />
          {orangeMarkersCoords.map((coords, index) => (
            <Marker
              key={index}
              coordinate={coords}
              pinColor='orange'
            >
              <Callout
                // Adicionar a propriedade onPress para abrir o modal laranja
                onPress={() => setIsOrangeModalVisible(true)}
              >
                <Text>Ponto de Alimentação</Text>
                <Image
                  source={{ uri: selectedImage }}
                  style={{ width: 100, height: 100 }}
                />
              </Callout>
            </Marker>
          ))}
        </MapView>
      }
      <Modal
        animationType="slide"
        transparent={false}
        visible={isOrangeModalVisible}
      >
        <View style={styles.modalContainer}>
          <Text>Selecione uma imagem:</Text>
          <Button
            title="Escolher imagem"
            onPress={handleSelectImage}
          />
          {selectedImage &&
            <>
              <Text>Imagem selecionada:</Text>
              <Image
                source={{ uri: selectedImage }}
                style={{ width: 200, height: 200 }}
              />
            </>
          }
          <Text>Adicione uma descrição:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setDescription}
            value={description}
          />
          <Button
            title="Confirmar"
            onPress={handleAddOrangeMarker}
          />
          <Button
            title="Cancelar"
            onPress={() => setIsOrangeModalVisible(false)}
          />
        </View>
      </Modal>
      <Modal animationType="slide"
        transparent={false}
        visible={isPinkModalVisible}
      >
        <View style={styles.modalContainer}>
          <Text>Selecione uma imagem:</Text>
          <Button
            title="Escolher imagem"
            onPress={handleSelectImage}
          />
          {selectedImage &&
            <>
              <Text>Imagem selecionada:</Text>
              <Image
                source={{ uri: selectedImage }}
                style={{ width: 200, height: 200 }}
              />
            </>
          }
          <Text>Adicione uma descrição:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setDescription}
            value={description}
          />
          <Button
            title="Confirmar"
            onPress={handleAddPinkMarker}
          />
          <Button
            title="Cancelar"
            onPress={() => setIsPinkModalVisible(false)}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});