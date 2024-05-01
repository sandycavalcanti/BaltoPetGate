
import { useState, useEffect, useRef } from 'react';
import { Modal, StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { corFundo, corFundoNavegacao, corRosaForte, urlAPI } from '../../constants';
import * as Location from "expo-location";
import MapaMapView from '../../components/navegacao/MapaMapView';
import CatchError from '../../utils/CatchError';
import { ToastAndroid } from 'react-native';
import BotaoCadastrarAnimado from '../../components/cadastro/BotaoCadastrarAnimado';

const Mapa = () => {
  const [pontosAlimentacao, setPontosAlimentacao] = useState([]);
  const initialRegion = useRef({
    latitude: -23.447440,
    longitude: -46.917877,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005
  })
  const controller = new AbortController();

  const PegarLocalizacao = async () => {
    try {
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
      // setCarregando(false);
    } catch (error) {
      ToastAndroid.show('Houve um erro ao requisitar a localização', ToastAndroid.SHORT);
      // setCarregando(false);
    }
  }

  const Selecionar = async () => {
    await axios.get(urlAPI + 'selpontoalimentacao', { signal: controller.signal })
      .then(response => {
        const newCoords = response.data.map(item => {
          const id = item.TB_PONTO_ALIMENTACAO_ID;
          const idPerfil = item.TB_PESSOA_ID;
          const tipoIdPerfil = item.TB_PESSOA.TB_TIPO_ID;
          const nomePerfil = item.TB_PESSOA.TB_PESSOA_NOME_PERFIL;
          const latitude = parseFloat(item.TB_PONTO_ALIMENTACAO_LATITUDE);
          const longitude = parseFloat(item.TB_PONTO_ALIMENTACAO_LONGITUDE);
          const possuiImg = item.TB_PESSOA.TB_PESSOA_POSSUI_IMG;
          const createdAt = item.createdAt;
          const updatedAt = item.updatedAt;
          return { latitude, longitude, id, idPerfil, tipoIdPerfil, nomePerfil, possuiImg, createdAt, updatedAt };
        });
        setPontosAlimentacao([...newCoords]);
      }).catch(CatchError);
  };

  useEffect(() => {
    PegarLocalizacao();
    Selecionar();
    return (() => {
      controller.abort();
    })
  }, []);

  const [mensagemFalha, setMensagemFalha] = useState(true);

  return (
    <View style={styles.container}>
      {mensagemFalha ?
        <>
          <Text style={{ color: '#030303', fontSize: 22, textAlign: "center", marginHorizontal: 20 }}>
            O mapa apresenta falhas no aplicativo. Pedimos desculpas pelo inconveniente.
          </Text>
          <Text style={{ color: '#030303', fontSize: 22, textAlign: "center", marginHorizontal: 20, marginTop: 20 }}>
            O mapa funcionará apenas pelo emulador. (Instruções na página do projeto no GitHub)
          </Text>
          <Text style={{ color: '#030303', fontSize: 22, textAlign: "center", marginBottom: 20, marginHorizontal: 20, marginTop: 40 }}>
            Para contato, envie um email para baltopetgate@gmail.com.
          </Text>
          <BotaoCadastrarAnimado texto="Clique aqui para testar o mapa" onPress={() => setMensagemFalha(false)} />
        </>
        :
        <MapaMapView initialRegion={initialRegion.current} pontosAlimentacao={pontosAlimentacao} />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: corFundoNavegacao,
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