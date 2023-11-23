import { useState, useEffect } from "react";
import { StyleSheet, Dimensions, Text, View, Alert, StatusBar, Image, ScrollView, TouchableOpacity, ToastAndroid, ImageBackground } from "react-native";
import { Entypo, AntDesign } from '@expo/vector-icons';
import { corBordaBoxCad, urlAPI } from "../constants";
import { useNavigation } from '@react-navigation/native';
import Dropdown from "../components/geral/Dropdown";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalConfirmacao from "../components/geral/ModalConfirmacao";
import Imagem from "../components/geral/Imagem";
import { Modal, ModalContent } from "react-native-modals";
import Avaliacoes from "../components/Avaliacao/Avaliacoes";
import Avaliar from "../components/Avaliacao/Avaliar";
import IniciarChat from "../utils/IniciarChat";
import RetornarTipoNome from "../utils/RetornarTipoNome";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
let scrollY = 0;
let item1 = item2 = item3 = {};

const PerfilLayout = (props) => {
  const navigation = useNavigation();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [avaliacaoVisible, setAvaliacaoVisible] = useState(false);
  const [avaliar, setAvaliar] = useState(false);
  const [valorScroll, setValorScroll] = useState(0);
  scrollY = props.scrollY;
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
    setTimeout(() => { listener = scrollY.addListener(value => { clearTimeout(timeoutId); timeoutId = setTimeout(() => { const valorScrollInteiro = Math.trunc(value.value); setValorScroll(valorScrollInteiro); if (valorScrollInteiro > 200) setDropdownVisible(false); }, 100); }); }, 2500);
    return () => scrollY.removeListener(listener);
  }, [scrollY]);

  if (props.pessoal) {
    item1 = {
      texto: 'Alterar minhas informações',
      press: () => navigation.navigate('AlterarCad', { modoAlterar: true })
    }
    item2 = {
      texto: 'Desativar conta',
      press: () => Alert.alert(
        "Desativar o Perfil",
        "Tem certeza de que deseja desativar sua conta? Ela não poderá ser reativada.",
        [{
          text: "Não",
          style: "cancel"
        },
        {
          text: "Sim",
          onPress: async () => {
            await AsyncStorage.removeItem('token');
            await axios.put(urlAPI + 'delpessoa/' + TB_PESSOA_ID);
            navigation.navigate('Login');
          }
        }]
      )
    }
    item3 = {
      texto: 'Sair da conta',
      press: () => { setModalVisible(true); setDropdownVisible(false); }
    }
  } else {
    item1 = {
      texto: 'Denunciar perfil',
      press: () => { }
    }
    item2 = {
      texto: 'Bloquear pessoa',
      press: () => { }
    }
    item3 = null;
  }

  const SairDaConta = async () => {
    await AsyncStorage.removeItem('token');
    navigation.navigate('Login');
  }

  const Nota = Math.round(props.avaliacoes.media)
  const possuiAvaliacoes = Object.keys(props.avaliacoes).length !== 0;

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
          <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)}>
            <Entypo name="dots-three-vertical" size={30} color="white" />
          </TouchableOpacity>
          <Dropdown val={dropdownVisible} set={setDropdownVisible} item1={item1} item2={item2} item3={item3} valorScroll={valorScroll} />
          <ModalConfirmacao texto="Deseja sair da conta?" press={SairDaConta} val={modalVisible} set={setModalVisible} sim='Sair' />
        </View>
        <View style={styles.profileContainer}>
          <View>
            <Imagem url={urlImg} style={styles.profileImage} />
            <Text style={styles.profileName}>{props.data.TB_PESSOA_NOME_PERFIL}</Text>
            {props.data.TB_TIPO_ID != 1 && <Text style={[{ fontStyle: 'italic', fontSize: 15, color: 'gray', textAlign: 'center' }]}>{RetornarTipoNome(props.data.TB_TIPO_ID)}</Text>}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', top: 20 }}>
            <View style={{ paddingHorizontal: 25, top: 5 }}>
              <Text style={{ color: '#096D82', fontSize: 23, paddingVertical: 3, paddingHorizontal: 2, borderBottomWidth: 2, borderColor: '#216357', textAlign: 'center' }}>{props.seguindo.length}</Text>
              <Text style={{ color: '#5F7856', textAlign: 'center' }}>{props.seguindo.length == 1 ? 'Seguidor' : 'Seguidores'}</Text>
              {possuiAvaliacoes ?
                <TouchableOpacity onPress={() => setAvaliacaoVisible(true)}>
                  <View style={styles.ratingContainer}>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <AntDesign key={index} name={index < Nota ? 'star' : 'staro'} size={18} color={index < Nota ? 'gold' : 'gray'} />
                    ))}
                  </View>
                </TouchableOpacity>
                :
                <View style={styles.ratingContainer}>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <AntDesign key={index} name={'star'} size={18} color={'#ddd'} />
                  ))}
                </View>
              }
              <Modal visible={avaliacaoVisible} onTouchOutside={() => setAvaliacaoVisible(false)}>
                <View style={styles.ContainerAvaliacao} >
                  <ScrollView style={{ flex: 1 }}>
                    <View>
                      {props.avaliacoes.Selecionar && props.avaliacoes.Selecionar.map((item, index) => <Avaliacoes key={index} data={item} />)}
                    </View>
                  </ScrollView>
                </View>
              </Modal>
            </View>
            {!props.pessoal &&
              <View>
                <TouchableOpacity style={[styles.button, { width: '100%', paddingVertical: 4, paddingHorizontal: 5 }]} >
                  <Text style={[styles.buttonText, { fontSize: 17 }]}>Seguir</Text>
                </TouchableOpacity>
              </View>}
          </View>
        </View>
        <View style={styles.content}>
          <Text style={styles.contentText}>
            {props.data.TB_PESSOA_BIO && props.data.TB_PESSOA_BIO}
          </Text>
        </View>
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
              <Modal visible={avaliar} onTouchOutside={() => setAvaliar(false)}>
                <View style={styles.ContainerAvaliar} >
                  <ScrollView style={{ flex: 1 }}>
                    <View>
                      <Avaliar TB_PESSOA_ID={TB_PESSOA_ID} TB_PESSOA_IDD={TB_PESSOA_IDD} />
                    </View>
                  </ScrollView>
                </View>
              </Modal>
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
    height: 130,
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
    fontSize: 16
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
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  ContainerAvaliacao: {
    width: 320,
    height: 500,
    backgroundColor: '#EFEFEF',
    borderColor: '#CF8989',
    borderWidth: 2,
    borderRadius: 6
  },
  ContainerAvaliar: {
    width: 320,
    minHeight: 200,
    backgroundColor: '#EFEFEF',
    borderColor: '#CF8989',
    borderWidth: 2,
    borderRadius: 6
  },
});

export default PerfilLayout;
