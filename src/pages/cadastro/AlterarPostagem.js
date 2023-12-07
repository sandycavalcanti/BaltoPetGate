import { useState, useEffect, useRef } from "react";
import { View, Text, Image, StyleSheet, StatusBar, ToastAndroid, TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";
import ContainerCadastro from "../../components/cadastro/ContainerCadastro";
import axios from "axios";
import { corFundoCad, corFundoCampoCad, corPlaceholderCad, corRosaFraco, corTextoBotaoCad, urlAPI } from "../../constants";
import Perfil_post from "../../components/perfil/Perfil_post";
import Post from "../../components/perfil/Post";
import DecodificarToken from "../../utils/DecodificarToken";
import FormData from 'form-data';
import { useRoute } from "@react-navigation/native";
import CatchError from "../../utils/CatchError";
import Mensagem from "../../components/cadastro/Mensagem";
import BotaoCadastrarAnimado from "../../components/cadastro/BotaoCadastrarAnimado";
import AlertPro from "react-native-alert-pro";
import VerificarTamanhoImagem from "../../utils/VerificarTamanhoImagem";
import BotaoCadastrar from "../../components/cadastro/BotaoCadastrar";

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
  const alertRef = useRef(null);
  const [textoAlert, setTextoAlert] = useState('');
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

  const Alterar = async () => {
    if ((comentario !== comentarioOriginal.current) || (!imagem == possuiImgOriginal.current)) {
      if (imagem || comentario) {
        const formData = new FormData();

        formData.append('TB_POSTAGEM_TEXTO_ALTERADO', comentario);
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
          }, 1000);
        }).catch(error => CatchError(error, false, setMensagem({ color: 'red', text: 'Houve um erro ao editar a postagem' })));
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
    <ContainerCadastro titulo='Edite sua postagem!'>
      <BotaoCadastrar texto={imagem ? 'Alterar Imagem' : 'Acresentar uma imagem'} onPress={escolherImagem} styleBotao={{ backgroundColor: '#EEECEC', width: '90%' }} styleTexto={{ color: '#8EBF81' }} />
      {imagem && <BotaoCadastrar texto='Remover Imagem' onPress={() => setImagem(null)} styleBotao={{ backgroundColor: '#EEECEC', width: '90%' }} styleTexto={{ color: '#8EBF81' }} />}
      <TextInput placeholder="Digite um comentário" value={comentario} onChangeText={text => setComentario(text)} autoCorrect={false} multiline style={styles.input} placeholderTextColor={corPlaceholderCad} />
      {(imagem || comentario) &&
        <>
          <Text style={styles.subtitle}>Pré-visualização:</Text>
          <Perfil_post data={dataPerfilPost} naoExibirOpcoes />
          <Post text={comentario} img={imagem} alterado />
        </>}
      <Mensagem mensagem={mensagem} style={styles.subtitle} />
      <Text style={styles.dica}>Você só poderá editar essa postagem uma vez</Text>
      <BotaoCadastrarAnimado texto="Editar" onPress={Alterar} width={250} />
      <AlertPro
        ref={alertRef}
        onConfirm={() => alertRef.current.close()}
        title="Arquivo inválido"
        message={textoAlert}
        showCancel={false}
        textConfirm="OK"
        customStyles={{ buttonConfirm: { backgroundColor: corRosaFraco } }}
      />
      <StatusBar hidden />
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
  dica: {
    fontSize: 15,
    color: 'gray',
    textAlign: 'center'
  }
});

export default AlterarPostagem;