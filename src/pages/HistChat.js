import { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, TouchableOpacity, Text, View, TextInput, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import axios from 'axios';
import { corBordaBoxCad, urlAPI } from '../constants';
import { AntDesign } from '@expo/vector-icons';
import DecodificarToken from '../utils/DecodificarToken';
import GrupoContatos from '../components/chat/GrupoContatos';

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');
let TB_PESSOA_IDD;

const HisChat = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [veterinarios, setVeterinarios] = useState([]);
  const [ongs, setOngs] = useState([]);
  const [casasderacao, setCasasderacao] = useState([]);
  const [pessoasJson, setPessoasJson] = useState([]);
  const [pesquisa, setPesquisa] = useState("");

  const [carregando, setCarregando] = useState(true);

  const Selecionar = async () => {
    const decodedToken = await DecodificarToken();
    TB_PESSOA_IDD = decodedToken.TB_PESSOA_IDD;
    await axios.get(urlAPI + 'selchat/' + TB_PESSOA_IDD)
      .then(response => {
        setPessoasJson(response.data);
        // setTimeout(() => {
        setCarregando(false);
        // }, 600)
      })
      .catch(error => {
        let erro = error.response.data.message;
        setPessoasJson(erro);
        console.error('Erro ao selecionar:', error.response.data);
      })
  };

  useEffect(() => {
    Selecionar();
  }, []);

  // Função para atualizar a lista de contatos com base no texto da pesquisa
  useEffect(() => {
    const Filtrar = (type) => {
      return pessoasJson
        .filter((pessoa) => pessoa.TB_PESSOA_NOME_PERFIL.toLowerCase().includes(pesquisa.toLowerCase()))
        .filter((pessoa) => type.includes(pessoa.TB_TIPO_ID));
    }
    setUsuarios(Filtrar([1, 7]));
    setVeterinarios(Filtrar([2]));
    setOngs(Filtrar([3, 4, 5]));
    setCasasderacao(Filtrar([6]));
  }, [pesquisa, pessoasJson]);

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
          {carregando &&
            <View style={styles.carregando}>
              <ActivityIndicator size="large" color={corBordaBoxCad} />
            </View>}
          <View style={styles.contacts}>
            <GrupoContatos data={usuarios} titulo="Usuários" />
            <GrupoContatos data={veterinarios} titulo="Veterinários" />
            <GrupoContatos data={ongs} titulo="Instituições/Protetores/Abrigos" />
            <GrupoContatos data={casasderacao} titulo="Casas de ração" />
          </View>
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
    marginTop: 40,
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
