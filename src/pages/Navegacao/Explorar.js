import { useEffect, useRef, useState } from 'react';
import { FlatList, View, StyleSheet, ToastAndroid, ActivityIndicator } from "react-native";
import axios from 'axios';
import { corFundoCad, corRosaForte, urlAPI } from "../../constants";
import Perfil_post from '../../components/perfil/Perfil_post';
import Post from '../../components/perfil/Post';
import DecodificarToken from '../../utils/DecodificarToken';
import CatchError from '../../utils/CatchError';

const Explorar = ({ navigation: { navigate } }) => {
  const [select, setSelect] = useState([]);
  const TB_PESSOA_IDD = useRef(null);
  const carregando = useRef(true);
  const [isFetching, setIsFetching] = useState(false);
  const controller = new AbortController();

  const PegarId = async () => {
    const decodedToken = await DecodificarToken();
    TB_PESSOA_IDD.current = decodedToken.TB_PESSOA_IDD;
  }

  const Selecionar = () => {
    axios.get(urlAPI + 'selpostagem', { signal: controller.signal })
      .then(response => {
        if (carregando.current) carregando.current = false;
        setSelect(response.data);
        setIsFetching(false);
      }).catch(CatchError)
  }

  useEffect(() => {
    Selecionar();
    PegarId();
    return (() => {
      controller.abort();
    })
  }, []);

  const onRefresh = () => {
    setIsFetching(true);
    Selecionar();
  }

  return (
    <View style={styles.container}>
      {carregando.current && <View style={styles.containerCarregando}><ActivityIndicator color={corRosaForte} size='large' /></View>}
      <FlatList style={styles.Lista} data={select} onRefresh={onRefresh} refreshing={isFetching} keyExtractor={item => item.TB_POSTAGEM_ID} renderItem={({ item }) => {
        const pessoal = item.TB_PESSOA_ID == TB_PESSOA_IDD.current;
        const postagemId = item.TB_POSTAGEM_ID;
        const podeEditar = item.createdAt == item.updatedAt;
        return (
          <>
            <Perfil_post data={item} pessoal={pessoal} tipo='postagem' itemId={postagemId} onRefresh={onRefresh} podeEditar={podeEditar} />
            <Post data={item} />
          </>
        )
      }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: corFundoCad,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    padding: 0,
  },
  Lista: {
    width: '100%'
  },
  containerCarregando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Explorar;