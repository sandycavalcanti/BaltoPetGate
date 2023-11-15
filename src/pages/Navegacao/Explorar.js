import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View, StyleSheet } from "react-native";
import axios from 'axios';
import { corFundoCad, urlAPI, urlLocal } from "../../constants";
import Perfil_post from '../../components/perfil/Perfil_post';
import Post from '../../components/perfil/Post';

export default function Explorar({ navigation: { navigate } }) {

  const [select, setSelect] = useState([]);

  const Selecionar = () => {
    axios.get(urlAPI + 'selpostagem')
      .then((response) => {
        setSelect(response.data)
      }).catch((error) => {
        console.error('Error:', error)
      })
  }

  useEffect(() => {
    Selecionar()
  }, []);

  return (
    <View style={styles.container}>
      <FlatList style={styles.Lista}
        data={select}
        renderItem={({ item }) => (
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
