import { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, ScrollView, SafeAreaView, Dimensions } from "react-native";
import { corFundoCad } from "../../constants";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function Home({ navigation: { navigate } }) {

  return (
    <ScrollView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => navigate('Cadastroformulariodiario')} style={{ marginVertical: 5 }}><Text>form diario</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('Login')} style={{ marginVertical: 5 }}><Text>Voltar ao Login</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('HisChat')} style={{ marginVertical: 5 }}><Text>Ir para chats</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('Teste')} style={{ marginVertical: 5 }}><Text>Ir para teste</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('QuestionarioAdocao')} style={{ marginVertical: 5 }}><Text>Questionario Adoção</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('AlterarCad', { modoAlterar: false })} style={{ marginVertical: 5 }}><Text>Completar Cadastro</Text></TouchableOpacity>
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
    minHeight: windowHeight - 131
  },
});

export default Home;