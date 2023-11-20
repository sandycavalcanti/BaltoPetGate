import { useState, useEffect, useRef } from 'react';
import { StyleSheet, ActivityIndicator, TouchableOpacity, Text, View, TextInput, ScrollView, Dimensions, ToastAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { corBordaBoxCad, urlAPI } from '../constants';
import { AntDesign } from '@expo/vector-icons';
import DecodificarToken from '../utils/DecodificarToken';
import GrupoContatos from '../components/chat/GrupoContatos';

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

const HisChat = () => {
  const TB_PESSOA_IDD = useRef(null)
  const pessoasJson = useRef([])
  const usuarios = useRef([])
  const veterinarios = useRef([])
  const ongs = useRef([])
  const casasderacao = useRef([])
  const desativados = useRef([])
  const [pesquisa, setPesquisa] = useState("");
  const [refresh, setRefresh] = useState(0);

  const controller = new AbortController();
  const [carregando, setCarregando] = useState(true);

  const Selecionar = async () => {
    const decodedToken = await DecodificarToken();
    TB_PESSOA_IDD.current = decodedToken.TB_PESSOA_IDD;
    await axios.get(urlAPI + 'selchat/' + TB_PESSOA_IDD.current, { signal: controller.signal })
      .then(response => {
        if (response.data) {
          pessoasJson.current = response.data;
          setCarregando(false);
        }
      })
      .catch(error => {
        let erro = error.response.data;
        if (error.response.status !== 404) {
          console.error(erro.error, error);
        } else {
          console.log(erro.message);
        }
        ToastAndroid.show(erro.message, ToastAndroid.SHORT);
      })
  };

  useEffect(() => {
    Selecionar();
    return (() => {
      controller.abort();
    })
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
    usuarios.current = Filtrar([1, 7]);
    veterinarios.current = Filtrar([2]);
    ongs.current = Filtrar([3, 4, 5]);
    casasderacao.current = Filtrar([6]);
    desativados.current = chatsDesativados;
    refreshPage();
  }, [pesquisa, pessoasJson.current]);

  const refreshPage = () => {
    setRefresh(prev => prev + 1);
  }
  
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.groupBox}>
          <Text style={styles.titulo}>Chat</Text>
          <View style={styles.searchBar}>
            <TextInput onChangeText={text => setPesquisa(text)} value={pesquisa} style={styles.searchInput} placeholder="Pesquisar" />
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
              <GrupoContatos data={usuarios.current} titulo="Usuários" />
              <GrupoContatos data={veterinarios.current} titulo="Veterinários" />
              <GrupoContatos data={ongs.current} titulo="Instituições/Protetores/Abrigos" />
              <GrupoContatos data={casasderacao.current} titulo="Casas de ração" />
              <GrupoContatos data={desativados.current} titulo="Chats desativados" desativado />
            </View>}
        </View>
      </SafeAreaView>
    </ScrollView >
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: windowHeight - 25,
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
