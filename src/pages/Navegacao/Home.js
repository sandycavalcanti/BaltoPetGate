import { TouchableOpacity, FlatList, Text, View, StyleSheet, ScrollView, SafeAreaView, Dimensions, ActivityIndicator } from "react-native";
import { useState, useEffect, useRef } from "react";
import DecodificarToken from "../../utils/DecodificarToken";
import axios from 'axios';
import { corFundoCad, urlAPI } from "../../constants";
import Perfil_post from '../../components/perfil/Perfil_post';
import Post from '../../components/perfil/Post';

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

const Home = ({ navigation: { navigate } }) => {
  const [temporario, setTemporario] = useState(false);

  const [select, setSelect] = useState([]);
  const TB_PESSOA_IDD = useRef(null);
  const carregando = useRef(true);
  const [isFetching, setIsFetching] = useState(false);
  const controller = new AbortController();

  const Selecionar = async () => {
    const decodedToken = await DecodificarToken();
    TB_PESSOA_IDD.current = decodedToken.TB_PESSOA_IDD;
    await axios.get(urlAPI + 'selpostagemseguindo/' + TB_PESSOA_IDD.current, { signal: controller.signal })
      .then(response => {
        if (carregando.current) carregando.current = false;
        setSelect(response.data);
        setIsFetching(false);
      }).catch(error => {
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

  const onRefresh = () => {
    setIsFetching(true);
    Selecionar();
  }

  return (
    <>
      {temporario ? (
        <View style={styles.container}>
          {select.length !== 0 ?
            <>
              {carregando.current && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator color={corRosaForte} size='large' /></View>}
              <FlatList style={styles.Lista} data={select} onRefresh={onRefresh} refreshing={isFetching} keyExtractor={item => item.TB_POSTAGEM_ID} renderItem={({ item }) => {
                const pessoal = item.TB_PESSOA_ID == TB_PESSOA_IDD.current;
                return (
                  <>
                    <Perfil_post data={item} pessoal={pessoal} />
                    <Post data={item} />
                  </>
                )
              }} />
            </>
            :
            <Text style={styles.textoPadrao}>Aqui você verá as postagens de quem você seguir</Text>
          }
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