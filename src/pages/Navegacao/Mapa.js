
import { useState, useEffect, useRef } from 'react';
import { Modal, StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { corFundo, corRosaForte, urlAPI } from '../../constants';
import * as Location from "expo-location";
import MapaMapView from '../../components/navegacao/MapaMapView';

const Mapa = () => {
  const [pontosAlimentacao, setPontosAlimentacao] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const initialRegion = useRef({
    latitude: -23.447440,
    longitude: -46.917877,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005
  })
  const controller = new AbortController();

  const PegarLocalizacao = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status == "granted") {
      let location = await Location.getCurrentPositionAsync({});

      initialRegion.current = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      };
    }
    setCarregando(false);
  }

  const Selecionar = async () => {
    const response = await axios.get(urlAPI + 'selpontoalimentacao', { signal: controller.signal });
    const newCoords = response.data.map((item) => {
      const id = item.TB_PONTO_ALIMENTACAO_ID;
      const nomePerfil = item.TB_PESSOA.TB_PESSOA_NOME_PERFIL;
      const latitude = parseFloat(item.TB_PONTO_ALIMENTACAO_LATITUDE);
      const longitude = parseFloat(item.TB_PONTO_ALIMENTACAO_LONGITUDE);
      const createdAt = item.createdAt;
      const updatedAt = item.updatedAt;
      return { latitude, longitude, id, nomePerfil, createdAt, updatedAt };
    });
    setPontosAlimentacao([...pontosAlimentacao, ...newCoords]);
  };

  useEffect(() => {
    PegarLocalizacao();
    Selecionar();
    return (() => {
      controller.abort();
    })
  }, []);

  return (
    <View style={styles.container}>
      {carregando ?
        <View style={styles.viewCarregando}>
          <ActivityIndicator size='large' color={corRosaForte} />
        </View>
        :
        <MapaMapView initialRegion={initialRegion.current} pontosAlimentacao={pontosAlimentacao} />
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
  viewCarregando: {
    width: '100%',
    height: '100%',
    backgroundColor: corFundo,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerCallout: {
    minWidth: 175,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  titleCallout: {
    fontSize: 15
  },
  nameCallout: {
    fontSize: 18
  },
  textCallout: {
    marginTop: 20,
    fontSize: 16,
  }
});

export default Mapa;