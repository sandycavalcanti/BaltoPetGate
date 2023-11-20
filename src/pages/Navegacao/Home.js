import { TouchableOpacity, Text, View, StyleSheet, ScrollView, SafeAreaView, Dimensions } from "react-native";
import { corFundoCad } from "../../constants";

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

function Home({ navigation: { navigate } }) {

  return (
    <ScrollView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => navigate('Cadastroformulariodiario')}><Text>form diario</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('Login')}><Text>Voltar ao Login</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('HisChat')}><Text>Ir para chats</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('QuestionarioAdocao')}><Text>Questionario Adoção</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('AlterarCad', { modoAlterar: false })}><Text>Completar Cadastro</Text></TouchableOpacity>
        <View style={{ alignItems: 'center', justifyContent: 'center', rowGap: 5, marginTop: 15 }}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Telas temporárias e de teste:</Text>
          <TouchableOpacity onPress={() => navigate('Teste')}><Text>Teste</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => navigate('uploadimg')}><Text>Upload Img</Text></TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView >
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: corFundoCad,
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 5,
    width: '100%',
    minHeight: windowHeight - 131
  },
});

export default Home;