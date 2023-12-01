import { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, ToastAndroid, TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";
import BotaoImg from "../../components/FormDiario/BotaoImg";
import ContainerCadastro from "../../components/cadastro/ContainerCadastro";
import axios from "axios";
import { corFundoCad, corFundoCampoCad, corPlaceholderCad, corRosaFraco, corTextoBotaoCad, urlAPI } from "../../constants";
import Perfil_post from "../../components/perfil/Perfil_post";
import Post from "../../components/perfil/Post";
import DecodificarToken from "../../utils/DecodificarToken";
import FormData from 'form-data';
import Mensagem from "../../components/cadastro/Mensagem";
import BotaoCadastrarAnimado from "../../components/cadastro/BotaoCadastrarAnimado";
import CatchError from "../../utils/CatchError";
import AlertPro from "react-native-alert-pro";
import VerificarTamanhoImagem from "../../utils/VerificarTamanhoImagem";

const CadPostagem = ({ navigation }) => {
  const TB_PESSOA_IDD = useRef(null);
  const TB_PESSOA_NOME_PERFIL = useRef('')
  const [imagem, setImagem] = useState(null);
  const [comentario, setComentario] = useState('');
  const [mensagem, setMensagem] = useState({});
  const alertRef = useRef(null);
  const [textoAlert, setTextoAlert] = useState('');

  const PegarId = async () => {
    const decodedToken = await DecodificarToken();
    TB_PESSOA_IDD.current = decodedToken.TB_PESSOA_IDD;
    TB_PESSOA_NOME_PERFIL.current = decodedToken.TB_PESSOA_NOME_PERFIL;
  }

  useEffect(() => {
    PegarId();
  }, [])

  const escolherImagem = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const mensagemArquivo = await VerificarTamanhoImagem(result);
      if (mensagemArquivo) {
        setTextoAlert(mensagemArquivo);
        alertRef.current.open();
        return
      }
      setImagem(result.assets[0].uri);
    }
  };

  const Cadastrar = async () => {
    if (imagem || comentario) {
      const formData = new FormData();

      formData.append('TB_POSTAGEM_TEXTO', comentario);
      formData.append('TB_PESSOA_ID', TB_PESSOA_IDD.current);
      if (imagem) {
        let image = {
          uri: imagem,
          type: 'image/jpeg',
          name: 'image.jpg',
        };
        formData.append('img', image);
        formData.append('TB_POSTAGEM_POSSUI_IMG', true);
      }

      await axios.post(urlAPI + 'cadpostagem', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }).then(response => {
        setMensagem({ color: '#fff', text: 'Postagem realizada!' });
        setTimeout(() => {
          navigation.goBack();
        }, 1000);
      }).catch(error => CatchError(error, false, setMensagem({ color: 'red', text: 'Houve um erro ao postar' })));
    } else {
      ToastAndroid.show('Insira uma imagem ou um comentario', ToastAndroid.SHORT);
    }
  }

  const dataPerfilPost = {
    TB_PESSOA_ID: TB_PESSOA_IDD.current,
    TB_PESSOA: { TB_PESSOA_NOME_PERFIL: TB_PESSOA_NOME_PERFIL.current }
  }

  return (
    <ContainerCadastro titulo='Faça sua postagem!'>
      <BotaoImg onPress={escolherImagem} texto={imagem ? 'Alterar Imagem' : ''} />
      {imagem && <BotaoImg onPress={() => setImagem(null)} texto='Remover Imagem' />}
      <TextInput placeholder="Digite um comentário" value={comentario} onChangeText={text => setComentario(text)} multiline style={styles.input} placeholderTextColor={corPlaceholderCad} />
      {(imagem || comentario) &&
        <>
          <Text style={styles.subtitle}>Pré-visualização:</Text>
          <Perfil_post data={dataPerfilPost} naoExibirOpcoes />
          <Post text={comentario} img={imagem} />
        </>}
      <Mensagem mensagem={mensagem} style={styles.subtitle} />
      <BotaoCadastrarAnimado texto="Postar" onPress={Cadastrar} width={250} />
      <AlertPro
        ref={alertRef}
        onConfirm={() => alertRef.current.close()}
        title="Arquivo inválido"
        message={textoAlert}
        showCancel={false}
        textConfirm="OK"
        customStyles={{ buttonConfirm: { backgroundColor: corRosaFraco } }}
      />
    </ContainerCadastro>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: corFundoCad,
  },
  input: {
    marginTop: '10%',
    width: '90%',
    fontSize: 18,
    paddingHorizontal: 10,
    padding: 5,
    backgroundColor: corFundoCampoCad,
    borderColor: corTextoBotaoCad,
    borderWidth: 1,
    borderRadius: 20,
    marginVertical: 5,
    color: '#000'
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginTop: 20,
    marginBottom: 10,
  },
  Botao: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
});

export default CadPostagem;