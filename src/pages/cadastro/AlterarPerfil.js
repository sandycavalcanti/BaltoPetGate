import { useState, useEffect, useRef } from "react";
import { StyleSheet, Dimensions, Text, View, Image, ScrollView, TouchableOpacity, ToastAndroid, ImageBackground, TextInput } from "react-native";
import Imagem from "../../components/geral/Imagem";
import GroupBox from '../../components/cadastro/GroupBox';
import BotaoCadastrar from '../../components/cadastro/BotaoCadastrar';
import { corFundo, urlAPI } from '../../constants';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import DecodificarToken from '../../utils/DecodificarToken';
import * as ImagePicker from 'expo-image-picker';
import FormData from 'form-data';
import CatchError from "../../utils/CatchError";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const AlterarPerfil = () => {
  const TB_PESSOA_IDD = useRef(null);
  const TB_TIPO_IDD = useRef(null);
  const urlImg = useRef('imagem');
  const [nomePerfil, setNomePerfil] = useState(null);
  const [bio, setBio] = useState(null);
  const [instagram, setInstagram] = useState(null);
  const [facebook, setFacebook] = useState(null);
  const [pix, setPix] = useState(null);
  const [image, setImage] = useState(null);
  const controller = new AbortController();

  const PegarId = async () => {
    const decodedToken = await DecodificarToken();
    TB_PESSOA_IDD.current = decodedToken.TB_PESSOA_IDD;
    TB_TIPO_IDD.current = decodedToken.TB_TIPO_IDD;
    urlImg.current = urlAPI + 'selpessoaimg/' + TB_PESSOA_IDD.current;
    Selecionar();
  }

  const Selecionar = async () => {
    await axios.post(urlAPI + 'selpessoa/filtrar', {
      TB_PESSOA_ID: TB_PESSOA_IDD.current
    }, { signal: controller.signal }).then(response => {
      const dados = response.data[0];
      setNomePerfil(dados.TB_PESSOA_NOME_PERFIL);
      setBio(dados.TB_PESSOA_BIO);
      setInstagram(dados.TB_PESSOA_INSTAGRAM);
      setFacebook(dados.TB_PESSOA_FACEBOOK);
      setPix(dados.TB_PESSOA_PIX);
    }).catch(error => {
      if (error.respose) {
        let erro = error.response.data;
        ToastAndroid.show(erro.message, ToastAndroid.SHORT);
        console.log('Erro ao selecionar:', erro.error);
      } else {
        console.error(error)
      }
    });
  }

  useEffect(() => {
    PegarId();
    return (() => {
      controller.abort();
    });
  }, []);

  const EscolherImagem = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const Alterar = async () => {
    const formData = new FormData();

    if (image) {
      let imagemData = {
        uri: image,
        type: 'image/jpeg',
        name: 'image.jpg',
      };
      formData.append('img', imagemData);
    }

    formData.append('TB_PESSOA_NOME_PERFIL', nomePerfil);
    formData.append('TB_PESSOA_BIO', bio);
    formData.append('TB_PESSOA_INSTAGRAM', instagram);
    formData.append('TB_PESSOA_FACEBOOK', facebook);
    formData.append('TB_PESSOA_PIX', pix);

    await axios.put(urlAPI + 'altpessoa/' + TB_PESSOA_IDD.current, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then(response => {
      ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
    }).catch(CatchError)
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <ImageBackground style={styles.imagemFundo} resizeMode="cover" source={require("../../../assets/img/FundoPerfil.png")} />
        <View style={styles.Oval}></View>
        <View style={styles.profileContainer}>
          {!image ?
            <Imagem style={styles.profileImage} url={urlImg.current} />
            :
            <Image style={styles.profileImage} source={{ uri: image }} />
          }
        </View>
        <TouchableOpacity style={styles.AltImagem} onPress={EscolherImagem} >
          <Ionicons name="camera-outline" size={30} color='#096D82' />
        </TouchableOpacity>
        <View style={styles.GroupContainer}>
          <GroupBox corFundoTexto={corFundo} esquerda corTexto='#096D82' titulo='Nome de perfil:'>
            <TextInput style={styles.Input} value={nomePerfil} onChangeText={text => setNomePerfil(text)} />
          </GroupBox>
          <GroupBox corFundoTexto={corFundo} esquerda corTexto='#096D82' titulo='Adicionar a bio:'>
            <TextInput style={styles.Input} value={bio} onChangeText={text => setBio(text)} multiline />
          </GroupBox>
          <GroupBox corFundoTexto={corFundo} esquerda corTexto='#096D82' titulo='Adicionar link para Instagram:'>
            <TextInput style={styles.Input} value={instagram} onChangeText={text => setInstagram(text)} />
          </GroupBox>
          <GroupBox corFundoTexto={corFundo} esquerda corTexto='#096D82' titulo='Adicionar link para facebook:'>
            <TextInput style={styles.Input} value={facebook} onChangeText={text => setFacebook(text)} />
          </GroupBox>
          {(TB_TIPO_IDD.current == 2 || TB_TIPO_IDD.current == 3 || TB_TIPO_IDD.current == 4) &&
            <GroupBox corFundoTexto={corFundo} esquerda corTexto='#096D82' titulo='Adicionar link para pix:'>
              <TextInput style={styles.Input} value={pix} onChangeText={text => setPix(text)} />
            </GroupBox>}
          <BotaoCadastrar texto="Confirmar alterações" onPress={Alterar} />
        </View>
      </View >
    </ScrollView >
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
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
  }
});
export default AlterarPerfil;