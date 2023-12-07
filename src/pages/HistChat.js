import { useState, useEffect, useRef, useMemo } from 'react';
import { StyleSheet, ActivityIndicator, TouchableOpacity, Text, View, TextInput, ScrollView, Dimensions, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { corBordaBoxCad, urlAPI } from '../constants';
import { AntDesign } from '@expo/vector-icons';
import DecodificarToken from '../utils/DecodificarToken';
import GrupoContatos from '../components/chat/GrupoContatos';
import RemoverAcentos from '../utils/RemoverAcentos';
import CatchError from '../utils/CatchError';

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

const HistChat = () => {
  const TB_PESSOA_IDD = useRef(null)
  const pessoasJson = useRef([])
  const [pesquisa, setPesquisa] = useState("");
  const textInputRef = useRef(null);

  const controller = new AbortController();
  const [carregando, setCarregando] = useState(true);
  const empty = useRef(false)

  const NenhumChatIniciado = () => {
    empty.current = true;
    setCarregando(false);
  }

  const Selecionar = async () => {
    const decodedToken = await DecodificarToken();
    TB_PESSOA_IDD.current = decodedToken.TB_PESSOA_IDD;
    await axios.get(urlAPI + 'selchat/' + TB_PESSOA_IDD.current, { signal: controller.signal })
      .then(response => {
        pessoasJson.current = response.data;
        setCarregando(false);
      })
      .catch(error => CatchError(error, false, null, null, () => NenhumChatIniciado()));
  };

  useEffect(() => {
    Selecionar();
    return (() => {
      controller.abort();
    })
  }, []);

  // Função para atualizar a lista de contatos com base no texto da pesquisa
  const FiltrarPorTipo = (type) => {
    return pessoasJson.current
      .filter(pessoa => RemoverAcentos(pessoa.TB_PESSOA_NOME_PERFIL).includes(RemoverAcentos(pesquisa)))
      .filter(pessoa => type.includes(pessoa.TB_TIPO_ID))
      .filter(pessoa => pessoa.TB_CHAT_STATUS);
  }

  const FiltrarDesativados = () => {
    return pessoasJson.current
      .filter(pessoa => RemoverAcentos(pessoa.TB_PESSOA_NOME_PERFIL).includes(RemoverAcentos(pesquisa)))
      .filter(pessoa => !pessoa.TB_CHAT_STATUS)
  }

  const usuarios = useMemo(() => FiltrarPorTipo([1, 7]), [pessoasJson.current, pesquisa]);
  const veterinarios = useMemo(() => FiltrarPorTipo([2]), [pessoasJson.current, pesquisa]);
  const ongs = useMemo(() => FiltrarPorTipo([3, 4, 5]), [pessoasJson.current, pesquisa]);
  const casasderacao = useMemo(() => FiltrarPorTipo([6]), [pessoasJson.current, pesquisa]);
  const desativados = useMemo(() => FiltrarDesativados(), [pessoasJson.current, pesquisa]);

  const Fechar = () => {
    setPesquisa('');
    textInputRef.current.blur();
  }

  return (
    <ScrollView keyboardShouldPersistTaps='always'>
      <SafeAreaView style={styles.container}>
        <View style={styles.groupBox}>
          <Text style={styles.titulo}>Chat</Text>
          {carregando ?
            <View style={styles.carregando}>
              <ActivityIndicator size="large" color={corBordaBoxCad} />
            </View> : !empty.current ?
              <>
                {/* Barra de pesquisa */}
                <View style={styles.searchBar}>
                  <TextInput onChangeText={text => setPesquisa(text)} value={pesquisa} style={styles.searchInput} placeholder="Pesquisar" ref={textInputRef} />
                  {pesquisa !== '' &&
                    <TouchableOpacity onPress={Fechar}>
                      <AntDesign name="close" size={24} color="black" />
                    </TouchableOpacity>}
                </View>
                {/* Grupo de contatos */}
                <View style={styles.contacts}>
                  <GrupoContatos data={usuarios} titulo="Usuários" />
                  <GrupoContatos data={veterinarios} titulo="Veterinários" />
                  <GrupoContatos data={ongs} titulo="Instituições/Protetores/Abrigos" />
                  <GrupoContatos data={casasderacao} titulo="Casas de ração" />
                  <GrupoContatos data={desativados} titulo="Chats desativados" desativado />
                </View>
              </>
              :
              <View style={styles.viewEmpty}>
                <Text style={styles.textEmpty}>Nenhum Chat iniciado</Text>
              </View>}
        </View>
        <StatusBar animated backgroundColor={'#A9DDE8'} hidden={false} />
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
    marginHorizontal: 10,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  searchInput: {
    height: 40,
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
  },
  viewEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textEmpty: {
    color: '#fafafa',
    fontSize: 20,
  }
});

export default HistChat;
