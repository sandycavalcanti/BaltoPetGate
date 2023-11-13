import { useEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, TextInput, Dimensions, StatusBar, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Octicons, Feather, Ionicons } from '@expo/vector-icons';
import { corFundoNavegacao, urlAPI } from '../../constants';
import Home from './Home';
import Explorar from './Explorar';
import Mapa from './Mapa';
import Animal from './Animal';
import axios from 'axios';
import Imagem from '../../components/geral/Imagem';
import HeaderExplorar from '../../components/geral/HeaderExplorar';

const Tab = createBottomTabNavigator();
const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

const Menu = ({ navigation: { navigate } }) => {
    const [dadosPessoas, setDadosPessoas] = useState([]);
    const usuarios = useRef([]);
    const [resultsVisible, setResultsVisible] = useState(false);
    const [pesquisa, setPesquisa] = useState('');
    const [refresh, setRefresh] = useState(0);

    const controller = new AbortController();

    const Selecionar = async () => {
        await axios.get(urlAPI + 'selpessoas', { signal: controller.signal })
            .then(response => {
                setDadosPessoas(response.data);
            }).catch(error => {
                let erro = error.response.data;
                ToastAndroid.show(erro.message, ToastAndroid.SHORT);
                console.error(erro.error, error);
            });
    }

    useEffect(() => {
        Selecionar();
        return (() => {
            controller.abort();
        })
    }, []);

    // Função para atualizar a lista de pessoas com base no texto da pesquisa
    useEffect(() => {
        const Filtrar = (type) => {
            let pessoasFiltradas = dadosPessoas
            return pessoasFiltradas
                .filter((pessoa) => pessoa.TB_PESSOA_NOME_PERFIL.toLowerCase().includes(pesquisa.toLowerCase()))
                .filter((pessoa) => type.includes(pessoa.TB_TIPO_ID))
        }
        usuarios.current = Filtrar([1, 2, 3, 4, 5, 6, 7]);
        refreshPage();
    }, [pesquisa, dadosPessoas]);

    const refreshPage = () => {
        setRefresh(prev => prev + 1);
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Tab.Navigator screenOptions={{ tabBarStyle: styles.container, header: () => <HeaderExplorar pesquisa={pesquisa} setPesquisa={setPesquisa} setResultsVisible={setResultsVisible} />, tabBarShowLabel: false, title: '' }} >
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        tabBarIcon: () => <Octicons name="home" size={30} color="white" />,
                    }} />
                <Tab.Screen
                    name="Explorar"
                    component={Explorar}
                    options={{
                        tabBarIcon: () => <Ionicons name="search-sharp" size={35} color="white" />,
                    }} />
                <Tab.Screen
                    name="Mapa"
                    component={Mapa}
                    options={{
                        tabBarIcon: () => <Feather name="map-pin" size={30} color="white" />,
                    }} />
                <Tab.Screen
                    name="Animal"
                    component={Animal}
                    options={{
                        tabBarIcon: () => <Ionicons name="paw-outline" size={33} color="white" />,
                    }} />
            </Tab.Navigator>
            {resultsVisible &&
                <View style={[styles.containerResults, {}]}>
                    <ScrollView>
                        {usuarios.current.map((item) => {
                            const urlImg = urlAPI + 'selpessoaimg/' + item.TB_PESSOA_ID
                            return (
                                <View style={styles.contatoPessoa} key={item.TB_PESSOA_ID}>
                                    <Imagem url={urlImg} />
                                    <Text>{item.TB_PESSOA_NOME_PERFIL}</Text>
                                </View>
                            )
                        })}
                    </ScrollView>
                </View>}
            <StatusBar />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: corFundoNavegacao,
        borderTopColor: 'white',
        borderTopWidth: 2,
        alignItems: 'center'
    },
    headerEsquerda: {
        backgroundColor: corFundoNavegacao,
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        justifyContent: 'space-around',
        display: 'flex',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    barraPesquisa: {
        flex: 2,
        backgroundColor: '#fff',
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 5
    },
    Botao: {
        marginLeft: 10,
        marginRight: 10
    },
    IconePesquisa: {
        marginLeft: 4,
        marginRight: 4
    },
    botao: {
        backgroundColor: 'blue',
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    campo: {
        flex: 1
    },
    containerResults: {
        position: 'absolute',
        backgroundColor: '#fafafa',
        width: windowWidth - 40,
        maxHeight: windowHeight - 140,
        justifyContent: 'center',
        top: 55,
        left: 0,
        right: 0,
    },
    contatoPessoa: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        marginVertical: 5,
        alignItems: 'center',
        columnGap: 10
    },
});

export default Menu;
