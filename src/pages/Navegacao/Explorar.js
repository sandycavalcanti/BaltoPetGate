import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View, StyleSheet } from "react-native";
import axios from 'axios';
import { corFundoCad, urlAPI } from "../../constants";
import Perfil_post from '../../components/perfil/Perfil_post';
import Post from '../../components/perfil/Post';

const Explorar = ({ navigation: { navigate } }) => {
  const [select, setSelect] = useState([]);
  const controller = new AbortController();

  const Selecionar = () => {
    axios.get(urlAPI + 'selpostagem', { signal: controller.signal })
      .then(response => {
        setSelect(response.data)
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

  return (
    <View style={styles.container}>
      <FlatList style={styles.Lista} data={select} keyExtractor={item => item.TB_POSTAGEM_ID} renderItem={({ item }) => (
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
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    width: '100%',
    height: '100%',
    padding: 0,
  },
  Lista: {
    width: '100%'
  }
});

export default Explorar;