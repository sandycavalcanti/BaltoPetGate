import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View, StyleSheet } from "react-native";
import axios from 'axios';
import { corFundoCad, urlAPI } from "../../constants";
import Post from '../../components/perfil/Post'; // Certifique-se de que este caminho está correto

export default function Explorar(){

  const handlePostPress = (post) => {
    console.log('Post pressionado:', post);
  };

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
      <FlatList
        data={select}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePostPress(item)}>
            <Post data={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: corFundoCad,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
    padding: 0,
  },
});
