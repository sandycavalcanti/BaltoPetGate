import { useState, useEffect, useRef } from "react";
import { StyleSheet, Dimensions, Text, View, Image, ScrollView, TouchableOpacity, StatusBar, ImageBackground, TextInput, ActivityIndicator } from "react-native";
import Imagem from "../../components/geral/Imagem";
import GroupBox from '../../components/cadastro/GroupBox';
import { corFundo, corRosaForte, corRosaFraco, urlAPI } from '../../constants';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import DecodificarToken from '../../utils/DecodificarToken';
import * as ImagePicker from 'expo-image-picker';
import FormData from 'form-data';
import CatchError from "../../utils/CatchError";
import BotaoCadastrarAnimado from "../../components/cadastro/BotaoCadastrarAnimado";
import Mensagem from "../../components/cadastro/Mensagem";
import AlertPro from "react-native-alert-pro";
import VerificarTamanhoImagem from "../../utils/VerificarTamanhoImagem";
import BotaoCheckBox from "../../components/geral/BotaoCheckBox";

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

const AlterarPerfil = ({ navigation }) => {
  const TB_PESSOA_IDD = useRef(null);
  const TB_TIPO_IDD = useRef(null);
  const nomePerfil = useRef('');
  const bio = useRef('');
  const instagram = useRef('');
  const facebook = useRef('');
  const pix = useRef('');
  const link = useRef('');
  const possuiImg = useRef(false);
  const [habilitado, setHabilitado] = useState(false);
  const [image, setImage] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [mensagem, setMensagem] = useState({});
  const alertRef = useRef(null);
  const tituloAlert = useRef('');
  const [textoAlert, setTextoAlert] = useState('');
  const controller = new AbortController();

  const PegarId = async () => {
    const decodedToken = await DecodificarToken();
    TB_PESSOA_IDD.current = decodedToken.TB_PESSOA_IDD;
    TB_TIPO_IDD.current = decodedToken.TB_TIPO_IDD;
    Selecionar();
  }

  const Selecionar = async () => {
    await axios.post(urlAPI + 'selpessoa/filtrar', {
      TB_PESSOA_ID: TB_PESSOA_IDD.current
    }, { signal: controller.signal }).then(response => {
      const dados = response.data[0];
      nomePerfil.current = dados.TB_PESSOA_NOME_PERFIL;
      bio.current = dados.TB_PESSOA_BIO;
      instagram.current = dados.TB_PESSOA_INSTAGRAM;
      facebook.current = dados.TB_PESSOA_FACEBOOK;
      pix.current = dados.TB_PESSOA_PIX;
      link.current = dados.TB_PESSOA_LINK;
      possuiImg.current = dados.TB_PESSOA_POSSUI_IMG;
      if (pix.current || link.current) {
        setHabilitado(true);
      }
      setCarregando(false);
    }).catch(CatchError);
  }

  useEffect(() => {
    PegarId();
    return (() => {
      controller.abort();
    });
  }, []);

  const EscolherImagem = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const mensagemArquivo = await VerificarTamanhoImagem(result);
      if (mensagemArquivo) {
        tituloAlert.current = "Arquivo inválido";
        setTextoAlert(mensagemArquivo);
        alertRef.current.open();
        return
      }
      setImage(result.assets[0].uri);
    }
  };

  const Alterar = async () => {
    if (nomePerfil.current.length < 3) {
      tituloAlert.current = "Campos inválidos";
      setTextoAlert("Nome de perfil inválido");
      alertRef.current.open();
      return;
    }

    const formData = new FormData();

    if (image) {
      let imagemData = {
        uri: image,
        type: 'image/jpeg',
        name: 'image.jpg',
      };
      formData.append('img', imagemData);
    }

    formData.append('TB_PESSOA_NOME_PERFIL', nomePerfil.current);
    if (bio.current) {
      formData.append('TB_PESSOA_BIO', bio.current);
    }
    if (instagram.current) {
      formData.append("TB_PESSOA_INSTAGRAM", instagram.current);
    }
    if (facebook.current) {
      formData.append("TB_PESSOA_FACEBOOK", facebook.current);
    }
    if (pix.current) {
      formData.append("TB_PESSOA_PIX", pix.current);
    }

    await axios.put(urlAPI + 'altpessoa/' + TB_PESSOA_IDD.current, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then(response => {
      setMensagem({ color: '#fafafa', text: 'Alterações feitas' });
      setTimeout(() => {
        navigation.goBack();
      }, 1000);
    }).catch(CatchError)
  }

  const jaAtivado = Boolean(pix.current || link.current);

  return (
    <ScrollView style={styles.container}>
      <View>
        <ImageBackground style={styles.imagemFundo} resizeMode="cover" source={require("../../../assets/img/FundoPerfil.png")} />
        {carregando ?
          <View style={styles.containerCarregando}>
            <ActivityIndicator size='large' color={corRosaForte} />
          </View>
          :
          <>
            <View style={styles.Oval}></View>
            <View style={styles.profileContainer}>
              {!image ?
                <Imagem style={styles.profileImage} id={TB_PESSOA_IDD.current} existe={possuiImg.current} />
                :
                <Image style={styles.profileImage} source={{ uri: image }} />
              }
            </View>
            <TouchableOpacity style={styles.AltImagem} onPress={EscolherImagem} >
              <Ionicons name="camera-outline" size={30} color='#096D82' />
            </TouchableOpacity>
            <View style={styles.GroupContainer}>
              <GroupBox corFundoTexto={corFundo} esquerda corTexto='#096D82' titulo='Nome de perfil:'>
                <TextInput style={styles.Input} defaultValue={nomePerfil.current} onChangeText={text => nomePerfil.current = text} />
              </GroupBox>
              <GroupBox corFundoTexto={corFundo} esquerda corTexto='#096D82' titulo='Adicionar a bio:'>
                <TextInput style={styles.Input} defaultValue={bio.current} onChangeText={text => bio.current = text} multiline />
              </GroupBox>
              <GroupBox corFundoTexto={corFundo} esquerda corTexto='#096D82' titulo='Adicionar link para Instagram:'>
                <TextInput style={styles.Input} defaultValue={instagram.current} onChangeText={text => instagram.current = text} />
              </GroupBox>
              <GroupBox corFundoTexto={corFundo} esquerda corTexto='#096D82' titulo='Adicionar link para facebook:'>
                <TextInput style={styles.Input} defaultValue={facebook.current} onChangeText={text => facebook.current = text} />
              </GroupBox>
              {(TB_TIPO_IDD.current == 2 || TB_TIPO_IDD.current == 3 || TB_TIPO_IDD.current == 4) &&
                <>
                  <BotaoCheckBox texto='Habilitar doações' onPress={() => setHabilitado(prev => !prev)} styleBotao={styles.checkBox} corBoxAtivado={corRosaForte} jaativado={jaAtivado} />
                  {habilitado && <>
                    <GroupBox corFundoTexto={corFundo} esquerda corTexto='#096D82' titulo='Adicionar chave pix:'>
                      <TextInput style={styles.Input} defaultValue={pix.current} onChangeText={text => pix.current = text} />
                    </GroupBox>
                    <GroupBox corFundoTexto={corFundo} esquerda corTexto='#096D82' titulo='Adicionar link para doação:'>
                      <TextInput style={styles.Input} defaultValue={link.current} onChangeText={text => link.current = text} />
                    </GroupBox>
                  </>
                  }
                </>}
              <Mensagem mensagem={mensagem} style={styles.subtitle} />
              <BotaoCadastrarAnimado texto="Confirmar alterações" onPress={Alterar} width={300} />
              <AlertPro
                ref={alertRef}
                onConfirm={() => alertRef.current.close()}
                title={tituloAlert.current}
                message={textoAlert}
                showCancel={false}
                textConfirm="OK"
                customStyles={{ buttonConfirm: { backgroundColor: corRosaFraco } }}
              />
            </View>
          </>
        }
        <StatusBar animated hidden={false} backgroundColor={'#000000'} />
      </View>
    </ScrollView >
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#CEF7FF',
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
    height: 150,
    top: 300,
    backgroundColor: '#CEF7FF',
    shadowColor: '#519546',
  },
  GroupContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#CEF7FF',
  },
  profileContainer: {
    width: '100%',
    shadowColor: '#171717',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 3,
    paddingHorizontal: 30,
    paddingTop: 120
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 10,
    borderColor: '#fff',
    borderWidth: 2,
  },
  Input: {
    width: '100%',
    fontSize: 20,
    paddingHorizontal: 10
  },
  AltImagem: {
    position: 'absolute',
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    marginTop: 260,
    marginLeft: 180,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#096D82',
  },
  containerCarregando: {
    minHeight: windowHeight,
    justifyContent: 'center',
    alignItems: 'center'
  },
  subtitle: {
    fontSize: 18,
    color: '#096D82',
  },
  checkBox: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 10
  }
});

export default AlterarPerfil;