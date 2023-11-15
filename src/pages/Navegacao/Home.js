import { TouchableOpacity, FlatList, Text, View, StyleSheet, ScrollView, SafeAreaView, Dimensions, } from "react-native";
import { useState, useEffect } from "react";
import DecodificarToken from "../../utils/DecodificarToken";
import axios from 'axios';
import { corFundoCad, urlAPI } from "../../constants";
import Perfil_post from '../../components/perfil/Perfil_post';
import Post from '../../components/perfil/Post';

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

const Home = ({ navigation: { navigate } }) => {
  const [temporario, setTemporario] = useState(false);

  const [select, setSelect] = useState([]);
  const controller = new AbortController();

  const Selecionar = async () => {
    const decodedToken = await DecodificarToken();
    const TB_PESSOA_IDD = decodedToken.TB_PESSOA_IDD;
    await axios.get(urlAPI + 'selpostagemseguindo/' + TB_PESSOA_IDD, { signal: controller.signal })
      .then((response) => {
        setSelect(response.data)
      }).catch((error) => {
        if (error.response) {
          let erro = error.response.data;
          ToastAndroid.show(erro.message, ToastAndroid.SHORT);
          console.error(erro.error, error);
        } else {
          console.error('Error:', error);
        }
      })
  }

  useEffect(() => {
    Selecionar();
    return (() => {
      controller.abort();
    })
  }, []);

  return (
    <>
      {temporario ? (
        <View style={styles.container}>
          {select.length !== 0 &&
            <FlatList style={styles.Lista} data={select} keyExtractor={item => item.TB_POSTAGEM_ID} renderItem={item => (
              <>
                <Perfil_post navigate={navigate} data={item} />
                <Post data={item} />
              </>
            )} />}
          <Text style={styles.textoPadrao}>Aqui você verá as postagens de quem você seguir</Text>
        </View>
      ) : (
        <ScrollView style={{ flex: 1 }}>
          <SafeAreaView style={styles.containertemp}>
            <TouchableOpacity onPress={() => navigate("Cadastroformulariodiario")}>
              <Text>form diario</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate("Login")}>
              <Text>Voltar ao Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setTemporario(true)}>
              <Text>Ativar a Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate("HisChat")}>
              <Text>Ir para chats</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate("QuestionarioAdocao")}>
              <Text>Questionario Adoção</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate("AlterarCad", { modoAlterar: false })}>
              <Text>Completar Cadastro</Text>
            </TouchableOpacity>
            <View style={{ alignItems: "center", justifyContent: "center", rowGap: 5, marginTop: 15 }}>
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                Telas temporárias e de teste:
              </Text>
              <TouchableOpacity onPress={() => navigate("Teste")}>
                <Text>Teste</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigate("uploadimg")}>
                <Text>Upload Img</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: corFundoCad,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    height: '100%',
    padding: 0,
  },
  Lista: {
    width: '100%',
  },
  textoPadrao: {
    width: '80%',
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
  },
  containertemp: {
    backgroundColor: corFundoCad,
    alignItems: "center",
    justifyContent: "center",
    rowGap: 5,
    width: "100%",
    minHeight: windowHeight - 131,
  },
});

export default Home;