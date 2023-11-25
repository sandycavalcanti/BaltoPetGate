import { useState, useEffect, useRef } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ToastAndroid, TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";
import BotaoImg from "../../components/FormDiario/BotaoImg";
import ContainerCadastro from "../../components/cadastro/ContainerCadastro";
import axios from "axios";
import { corFundoCad, corFundoCampoCad, corPlaceholderCad, corTextoBotaoCad, urlAPI } from "../../constants";
import Perfil_post from "../../components/perfil/Perfil_post";
import Post from "../../components/perfil/Post";
import DecodificarToken from "../../utils/DecodificarToken";
import FormData from 'form-data';
import { useRoute } from "@react-navigation/native";
import CatchError from "../../utils/CatchError";
import Mensagem from "../../components/cadastro/Mensagem";
import BotaoCadastrarAnimado from "../../components/cadastro/BotaoCadastrarAnimado";

const AlterarPostagem = ({ navigation }) => {
  const route = useRoute();
  const { id } = route.params;
  const TB_PESSOA_IDD = useRef(null);
  const TB_PESSOA_NOME_PERFIL = useRef('')
  const [imagem, setImagem] = useState(null);
  const [comentario, setComentario] = useState('');
  const [mensagem, setMensagem] = useState({});
  const comentarioOriginal = useRef('');
  const possuiImgOriginal = useRef(false);
  const controller = new AbortController();

  const PegarId = async () => {
    const decodedToken = await DecodificarToken();
    TB_PESSOA_IDD.current = decodedToken.TB_PESSOA_IDD;
    TB_PESSOA_NOME_PERFIL.current = decodedToken.TB_PESSOA_NOME_PERFIL;
  }

  const Selecionar = async () => {
    axios.post(urlAPI + 'selpostagem/filtrar', {
      TB_POSTAGEM_ID: id
    }, { signal: controller.signal })
      .then(response => {
        const dados = response.data[0];
        setComentario(dados.TB_POSTAGEM_TEXTO);
        comentarioOriginal.current = dados.TB_POSTAGEM_TEXTO;
        possuiImgOriginal.current = dados.TB_POSTAGEM_POSSUI_IMG;
        if (dados.TB_POSTAGEM_POSSUI_IMG) {
          setImagem(urlAPI + 'selpostagemimg/' + dados.TB_POSTAGEM_ID);
        }
      })
      .catch(CatchError);
  };

  useEffect(() => {
    PegarId();
    Selecionar();
    return (() => {
      controller.abort();
    })
  }, [])

  const escolherImagem = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImagem(result.assets[0].uri);
    }
  };

  const Alterar = async () => {
    if ((comentario !== comentarioOriginal.current) || (!imagem == possuiImgOriginal.current)) {
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
        } else {
          formData.append('img', null);
          formData.append('TB_POSTAGEM_POSSUI_IMG', false);
        }

        await axios.put(urlAPI + 'altpostagem/' + id, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        }).then(response => {
          setMensagem({ color: '#fff', text: 'Postagem editada!' });
          setTimeout(() => {
            navigation.goBack();
          }, 2000);
        }).catch(error => {
          if (error.response) {
            let erro = error.response.data;
            ToastAndroid.show(erro.message, ToastAndroid.SHORT);
            console.error(erro.error, error);
          } else {
            console.error(error);
            setMensagem({ color: 'red', text: 'Houve um erro ao postar' });
          }
        })
      } else {
        ToastAndroid.show('Insira uma imagem ou um comentario', ToastAndroid.SHORT);
      }
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
      <TextInput placeholder="Digite um comentário" value={comentario} onChangeText={text => setComentario(text)} autoCorrect={false} multiline style={styles.input} placeholderTextColor={corPlaceholderCad} />
      {(imagem || comentario) &&
        <>
          <Text style={styles.subtitle}>Pré-visualização:</Text>
          <Perfil_post data={dataPerfilPost} naoExibirOpcoes />
          <Post text={comentario} img={imagem} />
        </>}
      <Mensagem mensagem={mensagem} style={styles.subtitle} />
      <BotaoCadastrarAnimado texto="Editar" onPress={Alterar} width={250} />
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

export default AlterarPostagem;