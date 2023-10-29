import { useState, useEffect, useRef } from 'react';
import { StyleSheet, ActivityIndicator, TouchableOpacity, Text, View, TextInput, ScrollView, Dimensions, ToastAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { corBordaBoxCad, urlAPI } from '../constants';
import { AntDesign } from '@expo/vector-icons';
import DecodificarToken from '../utils/DecodificarToken';
import GrupoContatos from '../components/chat/GrupoContatos';

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');
let TB_PESSOA_IDD;

const HisChat = () => {
  const pessoasJson = useRef([])
  const [usuarios, setUsuarios] = useState([]);
  const [veterinarios, setVeterinarios] = useState([]);
  const [ongs, setOngs] = useState([]);
  const [casasderacao, setCasasderacao] = useState([]);
  const [desativados, setDesativados] = useState([]);
  const [pesquisa, setPesquisa] = useState("");

  const [carregando, setCarregando] = useState(true);

  const Selecionar = async () => {
    const decodedToken = await DecodificarToken();
    TB_PESSOA_IDD = decodedToken.TB_PESSOA_IDD;
    await axios.get(urlAPI + 'selchat/' + TB_PESSOA_IDD)
      .then(response => {
        pessoasJson.current = response.data;
        setCarregando(false);
      })
      .catch(error => {
        let erro = error.response.data;
        ToastAndroid.show(erro.message, ToastAndroid.SHORT);
        console.error('Erro ao selecionar:', erro.error, error);
      })
  };

  useEffect(() => {
    Selecionar();
  }, []);

  // Função para atualizar a lista de contatos com base no texto da pesquisa
  useEffect(() => {
    const Filtrar = (type) => {
      let pessoasFiltradas = pessoasJson.current
      return pessoasFiltradas
        .filter((pessoa) => pessoa.TB_PESSOA_NOME_PERFIL.toLowerCase().includes(pesquisa.toLowerCase()))
        .filter((pessoa) => type.includes(pessoa.TB_TIPO_ID))
        .filter((pessoa) => pessoa.TB_CHAT_STATUS);
    }
    const chatsDesativados = pessoasJson.current.filter((pessoa) => !pessoa.TB_CHAT_STATUS);
    setUsuarios(Filtrar([1, 7]));
    setVeterinarios(Filtrar([2]));
    setOngs(Filtrar([3, 4, 5]));
    setCasasderacao(Filtrar([6]));
    setDesativados(chatsDesativados)
  }, [pesquisa, pessoasJson.current]);

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.groupBox}>
          <Text style={styles.titulo}>Chat</Text>
          <View style={styles.searchBar}>
            <TextInput onChangeText={(text) => setPesquisa(text)} value={pesquisa} style={styles.searchInput} placeholder="Pesquisar" />
            {pesquisa !== '' &&
              <TouchableOpacity onPress={() => setPesquisa('')}>
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>}
          </View>
          {carregando ?
            <View style={styles.carregando}>
              <ActivityIndicator size="large" color={corBordaBoxCad} />
            </View> :
            <View style={styles.contacts}>
              <GrupoContatos data={usuarios} titulo="Usuários" />
              <GrupoContatos data={veterinarios} titulo="Veterinários" />
              <GrupoContatos data={ongs} titulo="Instituições/Protetores/Abrigos" />
              <GrupoContatos data={casasderacao} titulo="Casas de ração" />
              <GrupoContatos data={desativados} titulo="Chats desativados" desativado />
            </View>}
        </View>
      </SafeAreaView>
    </ScrollView >
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: windowHeight,
    backgroundColor: '#A9DDE8',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  searchBar: {
    padding: 10,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    flex: 1,
  },
  contacts: {
    marginTop: 10
  },
  groupBox: {
    minHeight: windowHeight - 80,
    width: '90%',
    paddingTop: 20,
    paddingBottom: 10,
    borderWidth: 2,
    borderColor: corBordaBoxCad,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 30,
    position: 'relative',
  },
  titulo: {
    fontSize: 22,
    color: corBordaBoxCad,
    position: 'absolute',
    top: -25,
    marginBottom: 10,
    marginLeft: 30,
    paddingHorizontal: 5,
    fontSize: 30,
    backgroundColor: '#A9DDE8',
  },
  carregando: {
    width: '100%',
    height: '100%',
    backgroundColor: '#A9DDE8',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    marginTop: 10,
    marginBottom: 10,
  }
});

export default HisChat;
