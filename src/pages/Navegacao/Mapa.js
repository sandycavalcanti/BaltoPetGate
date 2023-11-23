
import { useState, useEffect } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Modal, StyleSheet, Text, View, Button, TextInput, Image } from 'react-native';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject, watchPositionAsync, LocationAccuracy } from 'expo-location';
import axios from 'axios';
import { urlAPI } from '../../constants';
import Imagem from '../../components/geral/Imagem';

const Mapa = () => {
  const [location, setLocation] = useState(null);
  const [redMarkerCoords, setRedMarkerCoords] = useState(null);
  const [orangeMarkersCoords, setOrangeMarkersCoords] = useState([]);

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
    // requestLocationPermissions();
  }, []);

  // useEffect(() => {
  //   watchPositionAsync({
  //     accuracy: LocationAccuracy.Highest,
  //     timeInterval: 1000,
  //     distanceInterval: 1,
  //   }, (response) => {
  //     console.log("NOVA LOCALIZAÇÃO!", response);
  //     setLocation(response);
  //   });
  // }, []);

  const getMarkers = async () => {
    const response = await axios.get(urlAPI + 'selpontoalimentacao');
    const newCoords = response.data.map((item) => {
      const id = item.TB_PONTO_ALIMENTACAO_ID;
      const nomePerfil = item.TB_PESSOA.TB_PESSOA_NOME_PERFIL;
      const latitude = parseFloat(item.TB_PONTO_ALIMENTACAO_LATITUDE);
      const longitude = parseFloat(item.TB_PONTO_ALIMENTACAO_LONGITUDE);
      const createdAt = item.createdAt;
      const updatedAt = item.updatedAt;
      return { latitude, longitude, id, nomePerfil, createdAt, updatedAt };
    });
    // console.log(newCoords)
    setOrangeMarkersCoords([...orangeMarkersCoords, ...newCoords]);
  };


  useEffect(() => {
    getMarkers();
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={{ width: '100%', height: '100%' }}
        initialRegion={{
          latitude:
            -23.447440,
          //  location.coords.latitude,
          longitude:
            -46.917877,
          // location.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005
        }}>
        {orangeMarkersCoords.map((coords, index) => {
          const dataAtual = new Date();
          const dataFornecida = new Date(coords.updatedAt);
          const diferencaEmMilissegundos = dataAtual - dataFornecida;
          const diferencaEmDias = Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));
          return (
            <Marker key={index} coordinate={coords} >
              <Imagem url={urlAPI + 'selpontoalimentacaoimg/' + coords.id} style={{ borderRadius: 125 }} />
              <Callout onPress={() => setIsOrangeModalVisible(true)} style={{ minWidth: 200, justifyContent: 'center', alignItems: 'center' }} >
                <Text>Ponto de Alimentação de {coords.nomePerfil}</Text>
                <Imagem url={urlAPI + 'selpontoalimentacaoimg/' + coords.id} style={{ height: 50 }} />
                <Text>Ativo há {diferencaEmDias} {diferencaEmDias == 1 ? 'dia' : 'dias'}</Text>
              </Callout>
            </Marker>
          )
        })}
      </MapView>
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

export default Mapa;