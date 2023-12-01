import { useState, useEffect } from "react";
import { StyleSheet, Dimensions, Text, View, Alert, ScrollView, TouchableOpacity, ToastAndroid, ImageBackground } from "react-native";
import { Entypo, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { corRosaForte, corRosaFraco, urlAPI } from "../constants";
import Dropdown from "../components/geral/Dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalConfirmacao from "../components/geral/ModalConfirmacao";
import Imagem from "../components/geral/Imagem";
import { Modal } from "react-native-modals";
import Avaliar from "../components/Avaliacao/Avaliar";
import IniciarChat from "../utils/IniciarChat";
import RetornarTipoNome from "../utils/RetornarTipoNome";
import DesativarCampo from "../utils/DesativarCampo";
import Estrelas from "../components/Avaliacao/Estrelas";
import ModalAvaliacao from "../components/Avaliacao/ModalAvaliacao";
import ModalAvaliar from "../components/Avaliacao/ModalAvaliar";

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

const PerfilLayout = (props) => {
  const navigation = props.navigation;
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [modalSairVisible, setModalSairVisible] = useState(false);
  const [modalDesativarVisible, setModalDesativarVisible] = useState(false);
  const [avaliacaoVisible, setAvaliacaoVisible] = useState(false);
  const [avaliar, setAvaliar] = useState(false);
  const [valorScroll, setValorScroll] = useState(-20);
  let scrollY = props.scrollY ? props.scrollY : 0;
  const TB_PESSOA_ID = props.data.TB_PESSOA_ID;
  const TB_PESSOA_IDD = props.TB_PESSOA_IDD;

  const urlImg = urlAPI + 'selpessoaimg/' + TB_PESSOA_ID;

  const MedirAltura = (event) => {
    const height = event.nativeEvent.layout.height;
    props.setPerfilHeight(height);
  };

  useEffect(() => {
    let timeoutId = null;
    let listener;
    setTimeout(() => { listener = scrollY.addListener(value => { clearTimeout(timeoutId); timeoutId = setTimeout(() => { const valorScrollInteiro = Math.trunc(value.value); setValorScroll(valorScrollInteiro); if (valorScrollInteiro > 200) setDropdownVisible(false); }, 100); }); }, 500);
    return () => scrollY.removeListener(listener);
  }, [scrollY]);

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
    console.log('Bloquear')
  }

  const DenunciarPessoa = () => {
    console.log('Bloquear')
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

  return (
    <View style={styles.container} onLayout={MedirAltura}>
      <View>
        <ImageBackground style={styles.imagemFundo} resizeMode="cover" source={require("../../assets/img/FundoPerfil.png")} />
        <View style={styles.Oval}></View>
        <View style={styles.Fundo}></View>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={33} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setDropdownVisible(prev => !prev)}>
            <Entypo name="dots-three-vertical" size={30} color="white" />
          </TouchableOpacity>
          <Dropdown val={dropdownVisible} set={setDropdownVisible} item1={item1} item2={item2} item3={item3} valorScroll={valorScroll} />
          <ModalConfirmacao texto="Deseja sair da conta?" press={SairDaConta} val={modalSairVisible} set={setModalSairVisible} sim='Sair' />
          <ModalConfirmacao texto="Deseja desativar sua conta?" press={DesativarConta} val={modalDesativarVisible} set={setModalDesativarVisible} sim='Desativar' />
        </View>
        <View style={styles.profileContainer}>
          <View>
            <Imagem url={urlImg} style={styles.profileImage} />
            <Text style={styles.profileName}>{props.data.TB_PESSOA_NOME_PERFIL}</Text>
            {props.data.TB_TIPO_ID != 1 && <Text style={styles.tipoUsuario}>{RetornarTipoNome(props.data.TB_TIPO_ID)}</Text>}
          </View>
          <View style={styles.containerEstrelasSeguindo}>
            <View style={styles.viewEstrelas}>
              <Text style={styles.quantidadeSeguidores}>{props.seguindo.length}</Text>
              <Text style={styles.textoSeguidores}>{props.seguindo.length == 1 ? 'Seguidor' : 'Seguidores'}</Text>
              <Estrelas avaliacoes={props.avaliacoes} set={setAvaliacaoVisible} />
              <ModalAvaliacao avaliacoes={props.avaliacoes} val={avaliacaoVisible} set={setAvaliacaoVisible} />
            </View>
            {!props.pessoal &&
              <View>
                <TouchableOpacity style={styles.buttonSeguir}>
                  <MaterialIcons name="person-add-alt-1" size={35} color='#84B794' />
                </TouchableOpacity>
              </View>}
          </View>
        </View>
        <View style={styles.content}>
          <Text style={styles.contentText}>
            {props.data.TB_PESSOA_BIO && props.data.TB_PESSOA_BIO}
          </Text>
        </View>
        {/* Botões */}
        <View style={styles.buttons}>
          {props.pessoal ?
            <>
              <TouchableOpacity style={[styles.button, { width: '90%' }]} onPress={() => navigation.navigate('AlterarPerfil')}>
                <Text style={styles.buttonText}>Alterar perfil</Text>
              </TouchableOpacity>
            </>
            :
            <>
              <TouchableOpacity style={styles.button} onPress={() => setAvaliar(true)}>
                <Text style={styles.buttonText}>Avaliar</Text>
              </TouchableOpacity>
              <ModalAvaliar val={avaliar} set={setAvaliar} TB_PESSOA_ID={TB_PESSOA_ID} TB_PESSOA_IDD={TB_PESSOA_IDD} />
              <TouchableOpacity style={styles.button} onPress={() => IniciarChat(TB_PESSOA_IDD, TB_PESSOA_ID, navigation.navigate, null)}>
                <Text style={styles.buttonText}>Iniciar Chat</Text>
              </TouchableOpacity>
            </>}
        </View>
      </View>
    </View >
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
    paddingBottom: 20,
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
    paddingBottom: 5
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
    textAlign: 'center'
  }
});

export default PerfilLayout;
