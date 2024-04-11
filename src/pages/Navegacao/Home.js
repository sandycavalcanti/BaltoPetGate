import { FlatList, Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { useState, useEffect, useRef } from "react";
import DecodificarToken from "../../utils/DecodificarToken";
import axios from 'axios';
import { corFundoCad, corRosaForte, urlAPI } from "../../constants";
import Perfil_post from '../../components/perfil/Perfil_post';
import Post from '../../components/perfil/Post';
import CatchError from "../../utils/CatchError";

const Home = ({ navigation: { navigate } }) => {
  const [select, setSelect] = useState([]);
  const TB_PESSOA_IDD = useRef(null);
  const temConteudo = useRef(true);
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
      }).catch(error => CatchError(error, false, null, () => {temConteudo.current = false}))
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

  const estaCarregando = carregando.current;

  return (
    <View style={styles.container}>
      {estaCarregando &&
        <View style={styles.containerCarregando}>
          <ActivityIndicator color={corRosaForte} size='large' />
        </View>
      }
      {temConteudo ?
        <>
          <FlatList style={styles.Lista} data={select} onRefresh={onRefresh} refreshing={isFetching} keyExtractor={item => item.TB_POSTAGEM_ID}
            renderItem={({ item }) => {
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
  containerCarregando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textoPadrao: {
    width: '80%',
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
  },
});

export default Home;