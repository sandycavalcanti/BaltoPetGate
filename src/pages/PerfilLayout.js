import { useState, useEffect, useRef } from "react";
import { StyleSheet, Dimensions, Text, View, Alert, Animated, TouchableOpacity, ToastAndroid, ImageBackground, Image } from "react-native";
import { Entypo, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { corRosaForte, urlAPI } from "../constants";
import Dropdown from "../components/geral/Dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalConfirmacao from "../components/geral/ModalConfirmacao";
import Imagem from "../components/geral/Imagem";
import IniciarChat from "../utils/IniciarChat";
import RetornarTipoNome from "../utils/RetornarTipoNome";
import DesativarCampo from "../utils/DesativarCampo";
import Estrelas from "../components/Avaliacao/Estrelas";
import ModalAvaliacao from "../components/Avaliacao/ModalAvaliacao";
import Avaliar from "../components/Avaliacao/Avaliar";
import ModalSeguindo from "../components/Avaliacao/ModalSeguindo";
import CatchError from "../utils/CatchError";
import axios from "axios";

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

const BotaoPerfil = (props) => (
  <TouchableOpacity style={[styles.button, props.style]} onPress={props.onPress}>
    <Text style={styles.buttonText}>{props.texto}</Text>
  </TouchableOpacity>
)

const PerfilLayout = (props) => {
  const navigation = props.navigation;
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [modalSairVisible, setModalSairVisible] = useState(false);
  const [modalDesativarVisible, setModalDesativarVisible] = useState(false);
  const [avaliacaoVisible, setAvaliacaoVisible] = useState(false);
  const [seguindoVisible, setSeguindoVisible] = useState(false);
  const [avaliar, setAvaliar] = useState(false);
  const [valorScroll, setValorScroll] = useState(-20);
  const idSeguindo = useRef(null);
  let scrollY = props.scrollY ? props.scrollY : 0;
  const TB_PESSOA_ID = props.data.TB_PESSOA_ID;
  const TB_PESSOA_IDD = props.TB_PESSOA_IDD;
  const [segue, setSegue] = useState(false);

  const MedirAltura = (event) => {
    const height = Math.floor(event.nativeEvent.layout.height);
    props.setPerfilHeight(height);
  };

  // Calcular o movimento do modal três pontos quando descer a tela
  useEffect(() => {
    let timeoutId, listener = null;
    setTimeout(() => { listener = scrollY.addListener(value => { clearTimeout(timeoutId); timeoutId = setTimeout(() => { const valorScrollInteiro = Math.trunc(value.value); setValorScroll(valorScrollInteiro); if (valorScrollInteiro > 200) setDropdownVisible(false); }, 100); }); }, 500);
    return () => scrollY.removeListener(listener);
  }, [scrollY]);

  // Opções botão três pontos
  let item1, item2, item3 = {};
  if (props.pessoal) {
    item1 = { texto: 'Alterar minhas informações', press: () => navigation.navigate('AlterarCad', { modoAlterar: true }) }
    item2 = { texto: 'Desativar conta', press: () => { setModalDesativarVisible(true); setDropdownVisible(false); } }
    item3 = { texto: 'Sair da conta', press: () => { setModalSairVisible(true); setDropdownVisible(false); } }
  } else {
    item1 = { texto: 'Denunciar perfil', press: () => DenunciarPessoa() }
    item2 = { texto: 'Bloquear pessoa', press: () => BloquearPessoa() }
    item3 = null;
  }

  const BloquearPessoa = () => {
    ToastAndroid.show('A função de bloquear pessoa ainda será implementada', ToastAndroid.SHORT);
  }

  const DenunciarPessoa = () => {
    ToastAndroid.show('A função de denunciar pessoa ainda será implementada', ToastAndroid.SHORT);
  }

  const SairDaConta = async () => {
    await AsyncStorage.removeItem('token');
    navigation.navigate('Login');
  }

  const DesativarConta = () => {
    Alert.alert(
      "Desativar a conta",
      "Caso desativar sua conta, suas publicações, animais e mensagens não aparecerão mais",
      [{ text: "Não", style: "cancel" }, {
        text: "Desativar", onPress: async () => {
          await AsyncStorage.removeItem('token');
          await DesativarCampo('pessoa', TB_PESSOA_ID)
          navigation.navigate('Login');
        }
      }]
    )
  }

  const Seguir = async (cadastrar) => {
    if (cadastrar) {
      await axios.post(urlAPI + 'cadinteracao', {
        TB_TIPO_INTERACAO_ID: "1",
        TB_PESSOA_REMETENTE_ID: TB_PESSOA_IDD,
        TB_PESSOA_DESTINATARIO_ID: TB_PESSOA_ID
      }).then(response => {
        idSeguindo.current = response.data.response.TB_INTERACAO_ID;
        setSegue(true);
      }).catch(CatchError)
    } else {
      let seguindoId = null;
      props.seguindo.map(item => {
        if (item.TB_PESSOA_REMETENTE_ID == TB_PESSOA_IDD) seguindoId = item.TB_INTERACAO_ID;
      })
      if (idSeguindo.current) seguindoId = idSeguindo.current;
      await axios.put(urlAPI + 'delinteracao/' + seguindoId)
        .then(response => {
          setSegue(false);
        }).catch(CatchError)
    }
  }

  useEffect(() => {
    if (!props.pessoal) {
      props.seguindo.map(item => {
        if (item.TB_PESSOA_REMETENTE_ID == TB_PESSOA_IDD) setSegue(true);
      })
    }
  }, [props.seguindo]);

  // Animação da info sobre puxar a tela
  const translateYInfo = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    let animationTimeout = null;
    if (!props.carregando) {
      animationTimeout = setTimeout(() => {
        Animated.timing(translateYInfo, {
          toValue: -100,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }, 2000);
    }
    return () => clearTimeout(animationTimeout);
  }, [translateYInfo, props.carregando]);

  return (
    <View style={styles.container} onLayout={MedirAltura}>
      <View>
        <ImageBackground style={styles.imagemFundo} resizeMode="cover" source={require("../../assets/img/FundoPerfil.png")} />
        <View style={styles.Oval}></View>
        <View style={styles.Fundo}></View>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={33} color="white" />
          </TouchableOpacity>
          <Animated.View style={[styles.infoContainer, { transform: [{ translateY: translateYInfo }] }]}>
            <Text style={styles.infoText}>Puxe a tela para baixo para atualizar as informações</Text>
          </Animated.View>
          <TouchableOpacity onPress={() => setDropdownVisible(prev => !prev)}>
            <Entypo name="dots-three-vertical" size={30} color="white" />
          </TouchableOpacity>
          <Dropdown val={dropdownVisible} set={setDropdownVisible} item1={item1} item2={item2} item3={item3} valorScroll={valorScroll} />
          <ModalConfirmacao texto="Deseja sair da conta?" press={SairDaConta} val={modalSairVisible} set={setModalSairVisible} sim='Sair' />
          <ModalConfirmacao texto="Deseja desativar sua conta?" press={DesativarConta} val={modalDesativarVisible} set={setModalDesativarVisible} sim='Desativar' />
        </View>
        <View style={styles.profileContainer}>
          <View>
            {/* Foto e nome */}
            <Imagem id={TB_PESSOA_ID} existe={props.data.TB_PESSOA_POSSUI_IMG} style={styles.profileImage} />
            <Text style={styles.profileName}>{props.data.TB_PESSOA_NOME_PERFIL}</Text>
            {props.data.TB_TIPO_ID != 1 && <Text style={styles.tipoUsuario}>{RetornarTipoNome(props.data.TB_TIPO_ID)}</Text>}
          </View>
          <View style={styles.containerEstrelasSeguindo}>
            {/* Estrelas e seguindo */}
            <View style={styles.viewEstrelas}>
              <TouchableOpacity onPress={() => setSeguindoVisible(true)}>
                <Text style={styles.quantidadeSeguidores}>{props.seguindo.length}</Text>
                <Text style={styles.textoSeguidores}>{props.seguindo.length == 1 ? 'Seguidor' : 'Seguidores'}</Text>
              </TouchableOpacity>
              <ModalSeguindo seguindo={props.seguindo} val={seguindoVisible} set={setSeguindoVisible} />
              <Estrelas avaliacoes={props.avaliacoes} set={setAvaliacaoVisible} />
              <ModalAvaliacao avaliacoes={props.avaliacoes} val={avaliacaoVisible} set={setAvaliacaoVisible} />
            </View>
            {!props.pessoal &&
              <View>
                <TouchableOpacity style={styles.buttonSeguir} onPress={() => Seguir(!segue)}>
                  {!segue ?
                    <MaterialIcons name="person-add-alt-1" size={35} color='#84B794' />
                    :
                    <MaterialIcons name="person-remove-alt-1" size={35} color='#84B794' />
                  }
                </TouchableOpacity>
              </View>}
          </View>
        </View>
        {/* Bio */}
        <View style={styles.content}>
          <Text style={styles.contentText}>
            {props.data.TB_PESSOA_BIO && props.data.TB_PESSOA_BIO}
          </Text>
        </View>
        {/* Pix */}
        {props.data.TB_PESSOA_PIX &&
          <View style={[styles.content, { flexDirection: 'row' }]}>
            <Text style={styles.contentText}>Pix:</Text>
            <Text style={[styles.contentText, { color: corRosaForte }]}>
              {props.data.TB_PESSOA_PIX}
            </Text>
          </View>
        }
        {/* Botões */}
        <View style={styles.buttons}>
          {props.pessoal ? // Botões para a conta pessoal
            <BotaoPerfil texto='Alterar perfil' style={{ width: '90%' }} onPress={() => navigation.navigate('AlterarPerfil')} />
            : // Botões para a conta de outros
            <>
              <BotaoPerfil texto='Avaliar' onPress={() => setAvaliar(true)} />
              <Avaliar val={avaliar} set={setAvaliar} TB_PESSOA_ID={TB_PESSOA_ID} TB_PESSOA_IDD={TB_PESSOA_IDD} />
              <BotaoPerfil texto='Iniciar Chat' onPress={() => IniciarChat(TB_PESSOA_IDD, TB_PESSOA_ID, navigation.navigate, null)} />
            </>}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#C1E6CD',
  },
  imagemFundo: {
    position: 'absolute',
    height: "100%",
    width: '100%',
  },
  Oval: {
    position: 'absolute',
    width: windowWidth / 2,
    height: windowWidth / 2,
    top: 200,
    left: windowWidth / 4,
    borderRadius: 120,
    backgroundColor: '#CEF7FF',
    transform: [{ scaleX: 2.3 }],
    shadowColor: '#171717',
    shadowOffset: { width: 2, height: 4 },
  },
  Fundo: {
    position: 'absolute',
    width: '100%',
    height: 100,
    top: 300,
    backgroundColor: '#CEF7FF',
    shadowColor: '#519546',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  profileContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    shadowColor: '#171717',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 3,
    paddingHorizontal: 30,
    paddingTop: 50,
  },
  profileImage: {
    width: 170,
    height: 170,
    borderRadius: 100,
    marginBottom: 10,
    borderColor: '#fff',
    borderWidth: 2,
  },
  profileName: {
    maxWidth: 200,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#093C4B',
    textAlign: 'center',
    marginRight: 5,
  },
  buttons: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 30,
    backgroundColor: '#CEF7FF',
    justifyContent: 'space-around'
  },
  button: {
    backgroundColor: '#B2EDC5',
    width: '47%',
    borderRadius: 5,
    justifyContent: "center",
    alignItems: 'center',
    borderColor: "#84B794",
    borderWidth: 1,
    padding: 5
  },
  buttonText: {
    color: '#448659',
    fontSize: 16,
    textAlign: 'center'
  },
  content: {
    paddingHorizontal: 20,
    backgroundColor: '#CEF7FF',
  },
  contentText: {
    fontSize: 18,
    color: '#093C4B',
    textAlign: 'justify',
    paddingBottom: 5,
    marginLeft: 10
  },
  containerEstrelasSeguindo: {
    flexDirection: 'row',
    alignItems: 'center',
    top: 40
  },
  viewEstrelas: {
    paddingHorizontal: 25,
    top: 5
  },
  quantidadeSeguidores: {
    color: '#096D82',
    fontSize: 23,
    paddingVertical: 3,
    paddingHorizontal: 2,
    borderBottomWidth: 2,
    borderColor: '#216357',
    textAlign: 'center'
  },
  textoSeguidores: {
    color: '#5F7856',
    textAlign: 'center'
  },
  buttonSeguir: {
    backgroundColor: '#B2EDC5',
    borderRadius: 5,
    justifyContent: "center",
    alignItems: 'center',
    borderColor: "#84B794",
    borderWidth: 1,
    width: '100%',
    paddingVertical: 4,
    paddingHorizontal: 5
  },
  tipoUsuario: {
    fontStyle: 'italic',
    fontSize: 15,
    color: 'gray',
    textAlign: 'center',
    paddingBottom: 5
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    textAlign: 'center',
    color: '#fafafa',
    fontSize: 16
  }
});

export default PerfilLayout;
