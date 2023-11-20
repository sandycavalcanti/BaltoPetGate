import { useEffect, useRef, useState } from 'react';
import { FlatList, View, StyleSheet, ToastAndroid, ActivityIndicator } from "react-native";
import axios from 'axios';
import { corFundoCad, corRosaForte, urlAPI } from "../../constants";
import Perfil_post from '../../components/perfil/Perfil_post';
import Post from '../../components/perfil/Post';

const Explorar = ({ navigation: { navigate } }) => {
  const [select, setSelect] = useState([]);
  const carregando = useRef(true)
  const [isFetching, setIsFetching] = useState(false);
  const controller = new AbortController();

  const Selecionar = () => {
    axios.get(urlAPI + 'selpostagem', { signal: controller.signal })
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
          ToastAndroid.show('Um erro aconteceu', ToastAndroid.SHORT);
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
    <View style={styles.container}>
      {carregando.current && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator color={corRosaForte} size='large' /></View>}
      <FlatList style={styles.Lista} data={select} onRefresh={onRefresh} refreshing={isFetching} keyExtractor={item => item.TB_POSTAGEM_ID} renderItem={({ item }) => (
        <>
          <Perfil_post data={item} />
          <Post data={item} />
        </>
      )}
      />
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
  }
});

export default Explorar;