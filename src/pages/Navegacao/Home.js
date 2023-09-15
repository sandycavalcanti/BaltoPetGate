import { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import axios from 'axios';
import { urlAPI } from '../../constants';
import { corFundoCad } from "../../constants";

let modoAlterar = false;

function Home({ navigation: { navigate } }) {

  const [select, setSelect] = useState([]);

  const Selecionar = () => {
    axios.get(urlAPI + 'selpessoa')
      .then((response) => {
        setSelect(response.data);
      }).catch((error) => {
        let erro = error.response.data.message;
        console.error('Erro ao selecionar:', erro);
      })
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => navigate('Login')} style={{ marginVertical: 5 }}><Text>Voltar ao Login</Text></TouchableOpacity>
        <TouchableOpacity onPress={Selecionar} style={{ marginVertical: 5 }}><Text>Selecionar pessoas</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('HisChat')} style={{ marginVertical: 5 }}><Text>Ir para chats</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('Teste')} style={{ marginVertical: 5 }}><Text>Ir para teste</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('AlterarCad', { modoAlterar })} style={{ marginVertical: 5 }}><Text>Completar Cadastro</Text></TouchableOpacity>
        {select && select.map((user, index) => (
          <View key={index} style={{ marginVertical: 10, alignItems: 'center' }}>
            <Text>{`ID: ${user.TB_PESSOA_ID}`}</Text>
            <Text>{`Nome: ${user.TB_PESSOA_EMAIL}`}</Text>
            <Text>{`Email: ${user.TB_PESSOA_NOME_PERFIL}`}</Text>
            <Text>{`TipoID: ${user.TB_TIPO_ID}`}</Text>
          </View>
        ))}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: corFundoCad,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
});

export default Home;