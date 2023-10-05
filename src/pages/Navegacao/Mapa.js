import { useState, useEffect } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Modal, StyleSheet, Text, View, Button, TextInput, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject, watchPositionAsync, LocationAccuracy } from 'expo-location';
import axios from 'axios';

export default function App() {
  const [location, setLocation] = useState(null);
  const [redMarkerCoords, setRedMarkerCoords] = useState(null);
  const [orangeMarkersCoords, setOrangeMarkersCoords] = useState([]);
  const [pinkMarkersCoords, setPinkMarkersCoords] = useState([]);
  const [isOrangeModalVisible, setIsOrangeModalVisible] = useState(false);
  const [isPinkModalVisible, setIsPinkModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [description, setDescription] = useState('');
  // Novo estado para armazenar a posição do marcador laranja
  const [tempText, setTempText] = useState('');
  let allow;
  async function requestLocationPermissions() {
    const { granted } = await requestForegroundPermissionsAsync();
    allow = granted;

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

  // NOVO: função para mostrar o texto temporário na tela por 5 segundos
  function showTempText(text) {
    setTempText(text);
    setTimeout(() => {
      setTempText('');
    }, 5000);
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

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  }

  function handleAddOrangeMarker() {
    if (selectedImage && description) {
      // NOVO: chamar a função showTempText com o texto desejado
      showTempText('Clique em algum lugar do mapa para adicionar o marcador');

      setSelectedImage(null);
      setDescription('');
      setIsPinkModalVisible(false);
    } else {
      alert('Por favor, selecione uma imagem e adicione uma descrição antes de adicionar um marcador rosa.');
    }
  }

  function handleAddPinkMarker() {
    if (selectedImage && description) {
      // NOVO: chamar a função showTempText com o texto desejado
      showTempText('Clique em algum lugar do mapa para adicionar o marcador');

      setSelectedImage(null);
      setDescription('');
      setIsPinkModalVisible(false);
    } else {
      alert('Por favor, selecione uma imagem e adicione uma descrição antes de adicionar um marcador rosa.');
    }
  }

  // NOVO: função para adicionar um marcador no mapa quando o usuário clicar
  function handleMapPress(e) {
    // Verificar se o estado tempText não está vazio
    if (tempText) {
      // Usar as informações do estado pinkMarkersCoords para criar um novo marcador rosa
      setPinkMarkersCoords([...pinkMarkersCoords, e.nativeEvent.coordinate]);
      // Limpar o estado tempText depois de adicionar o marcador
      setTempText('');
    }
  }

  // Nova função para atualizar o estado orangeMarkerPosition
  function handleOrangeMarkerPress(e) {
    setOrangeMarkersCoords([...orangeMarkersCoords, e.nativeEvent.coordinate]);
  }

  return (
    <View style={styles.container}>
      {!allow ?
        <>
          {location &&
            <MapView
              style={{ width: '100%', height: '100%' }}
              initialRegion={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
              }}
              // Novo atributo para chamar a função handleOrangeMarkerPress
              onPress={handleOrangeMarkerPress}
              // NOVO: atributo para chamar a função handleMapPress
              onLongPress={handleMapPress}
            >
              <Marker
                coordinate={redMarkerCoords}
              />
              {orangeMarkersCoords.map((coords, index) => (
                <Marker key={index} coordinate={coords} pinColor='orange'>
                  <Callout onPress={() => setIsOrangeModalVisible(true)}>
                    <Text>Ponto de Alimentação</Text>
                    <Image source={{ uri: selectedImage }} style={{ width: 100, height: 100 }} />
                  </Callout>
                </Marker>
              ))}
              {pinkMarkersCoords.map((coords, index) => (
                <Marker key={index} coordinate={coords} pinColor='orange'>
                  <Callout onPress={() => setIsPinkModalVisible(true)}>
                    <Text>Animal em Alerta</Text>
                    <Image source={{ uri: selectedImage }} style={{ width: 100, height: 100 }} />
                  </Callout>
                </Marker>
              ))}
            </MapView>

          }
          <View style={styles.buttonContainer}>
            <Button title="Adicionar marcador laranja" onPress={() => setIsPinkModalVisible(true)} />
            <Button title="Mover marcador vermelho"
              onPress={() =>
                setRedMarkerCoords({
                  latitude: redMarkerCoords.latitude + 0.001,
                  longitude: redMarkerCoords.longitude + 0.001,
                })} />
          </View>
          <Modal animationType="slide" transparent={false} visible={isOrangeModalVisible} >
            <View style={styles.modalContainer}>
              <Text>Selecione uma imagem:</Text>
              <Button title="Escolher imagem" onPress={handleSelectImage} />
              {selectedImage &&
                <>
                  <Text>Imagem selecionada:</Text>
                  <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />
                </>
              }
              <Text>Adicione uma descrição:</Text>
              <TextInput style={styles.input} onChangeText={setDescription} value={description} />
              <Button title="Confirmar" onPress={handleAddOrangeMarker} />
              <Button title="Cancelar" onPress={() => setIsOrangeModalVisible(false)} />
            </View>
          </Modal>
          <Modal animationType="slide" transparent={false} visible={isPinkModalVisible}>
            <View style={styles.modalContainer}>
              <Text>Selecione uma imagem:</Text>
              <Button title="Escolher imagem" onPress={handleSelectImage} />
              {selectedImage &&
                <>
                  <Text>Imagem selecionada:</Text>
                  <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />
                </>
              }
              <Text>Adicione uma descrição:</Text>
              <TextInput style={styles.input} onChangeText={setDescription} value={description} />
              <Button title="Confirmar" onPress={handleAddPinkMarker} />
              <Button title="Cancelar" onPress={() => setIsPinkModalVisible(false)} />
            </View>
          </Modal>
          {/* NOVO: componente para mostrar o estado tempText */}
          {tempText &&
            <View style={styles.tempTextView}>
              <Text style={styles.tempText}>{tempText}</Text>
            </View>
          }
        </>
        :
        <>
          <TouchableOpacity onPress={requestLocationPermissions}>
            <Text>Permita o acesso a localização</Text>
          </TouchableOpacity>
        </>
      }
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
    bottom: 50,
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
