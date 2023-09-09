import { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, TextInput, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import axios from 'axios';
import Contato from '../components/histChat/Contato';
import { corBordaBoxCad, urlAPI } from '../constants';
import { AntDesign } from '@expo/vector-icons';

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

const HisChat = ({ navigation: { navigate } }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [veterinarios, setVeterinarios] = useState([]);
  const [ongs, setOngs] = useState([]);
  const [casasderacao, setCasasderacao] = useState([]);
  const [pessoasJson, setPessoasJson] = useState([]);
  const [pesquisa, setPesquisa] = useState("");

  useEffect(() => {
    const Selecionar = async () => {
      try {
        await axios.get(urlAPI + 'selpessoa')
          .then((response) => {
            setPessoasJson(response.data);
          }).catch((error) => {
            let erro = error.response.data.message;
            setPessoasJson(erro)
            console.error('Erro ao selecionar:', erro);
          })
      } catch (error) {
        console.error('Erro ao selecionar:', error);
      }
    };
    Selecionar();
  }, []);

  // Função para atualizar a lista de contatos com base no texto da pesquisa
  useEffect(() => {

    const Filtrar = (type) => {
      return pessoasJson
        .filter((pessoa) => pessoa.TB_PESSOA_NOME_PERFIL.toLowerCase().includes(pesquisa.toLowerCase()))
        .filter((pessoa) => pessoa.TB_TIPO_ID === type);
    }
    const FiltrarOngs = () => {
      return pessoasJson
        .filter((pessoa) => pessoa.TB_PESSOA_NOME_PERFIL.toLowerCase().includes(pesquisa.toLowerCase()))
        .filter((pessoa) => [3, 4, 5].includes(pessoa.TB_TIPO_ID));
    }
    setUsuarios(Filtrar(1))
    setVeterinarios(Filtrar(2))
    setOngs(FiltrarOngs())
    setCasasderacao(Filtrar(6))
  }, [pesquisa, pessoasJson]);

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.groupBox}>
          <Text style={styles.titulo}>Chat</Text>
          <View style={styles.searchBar}>
            <TextInput onChangeText={(text) => setPesquisa(text)} value={pesquisa} style={styles.searchInput} placeholder="Search" />
            {pesquisa !== '' ?
              <TouchableOpacity onPress={() => setPesquisa('')}>
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>
              : null}
          </View>
          <View style={styles.contacts}>
            <View style={styles.contact}>
              {usuarios.length !== 0 ? <Text style={styles.categoria}>Usuários</Text> : null}
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {usuarios.map((pessoa) => (
                  <Contato key={pessoa.TB_PESSOA_ID} nome={pessoa.TB_PESSOA_NOME_PERFIL} />
                ))}
              </ScrollView>
            </View>
            <View style={styles.contact}>
              {veterinarios.length !== 0 ? <Text style={styles.categoria}>Veterinarios</Text> : null}
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {veterinarios.map((pessoa) => (
                  <Contato key={pessoa.TB_PESSOA_ID} nome={pessoa.TB_PESSOA_NOME_PERFIL} />
                ))}
              </ScrollView>
            </View>
            <View style={styles.contact}>
              {ongs.length !== 0 ? <Text style={styles.categoria}>Instituições/Protetores/Abrigos</Text> : null}
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {ongs.map((pessoa) => (
                  <Contato key={pessoa.TB_PESSOA_ID} nome={pessoa.TB_PESSOA_NOME_PERFIL} />
                ))}
              </ScrollView>
            </View>
            <View style={styles.contact}>
              {casasderacao.length !== 0 ? <Text style={styles.categoria}>Casas de ração</Text> : null}
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {casasderacao.map((pessoa) => (
                  <Contato key={pessoa.TB_PESSOA_ID} nome={pessoa.TB_PESSOA_NOME_PERFIL} />
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
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
    flex: 1,
    padding: 10,
  },
  contact: {
    alignItems: 'flex-start',
  },
  categoria: {
    fontSize: 20,
    color: "white",
    marginLeft: 10
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
});

export default HisChat;
