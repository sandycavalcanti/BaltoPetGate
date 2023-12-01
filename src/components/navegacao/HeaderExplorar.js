import { Text, TouchableOpacity, StyleSheet, View, TextInput, Dimensions, ScrollView, Animated, Easing, ToastAndroid, Pressable, Keyboard } from 'react-native';
import { Octicons, Feather, Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import Dropdown from '../geral/Dropdown';
import { corFundoNavegacao, urlAPI } from '../../constants';
import { useState, useRef, useEffect, useMemo } from 'react';
import DecodificarToken from '../../utils/DecodificarToken';
import axios from 'axios';
import Imagem from '../geral/Imagem';
import { useNavigation } from '@react-navigation/native';
import { Divider } from 'react-native-elements';
import ModalFiltrarPesquisa from './ModalFiltrarPesquisa';
import RetornarTipoNome from '../../utils/RetornarTipoNome';
import RemoverAcentos from '../../utils/RemoverAcentos';
import CatchError from '../../utils/CatchError';

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');
function ChecarTiposFiltro(array) {
    const indicesTrueArray = [];
    array.map((value, index) => {
        if (value) {
            indicesTrueArray.push(index + 1);
        }
        return null;
    });
    return indicesTrueArray;
}
function ChecarEspeciesFiltro(array) {
    const indicesTrueArray = [];
    array.map((value, index) => {
        if (value) {
            let tipo = index == 0 ? 'CACHORRO' : 'GATO';
            indicesTrueArray.push(tipo);
        }
        return null;
    });
    return indicesTrueArray;
}
function ChecarAplicacoesFiltro(array) {
    if (array[0] && !array[1]) {
        return ['SIM'];
    } else if (!array[0] && array[1]) {
        return ['NAO'];
    } else if (!array[0] && !array[1]) {
        return ['INDEFINIDO'];
    } else {
        return ['SIM', 'NAO', 'INDEFINIDO'];
    }
}

const HeaderExplorar = (props) => {
    const TB_PESSOA_IDD = useRef(null);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const dadosPessoas = useRef([]);
    const dadosAnimais = useRef([]);
    const [pesquisa, setPesquisa] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [resultsVisible, setResultsVisible] = useState(false);
    const filtroSelecionar = useRef(true);
    const filtroTipo = useRef(Array(6).fill(true));
    const filtroEspecie = useRef(Array(2).fill(true));
    const filtroCastrado = useRef(Array(2).fill(true));
    const filtroVermifugado = useRef(Array(2).fill(true));
    const filtroMicrochipado = useRef(Array(2).fill(true));
    const textInputRef = useRef(null);
    const navigation = useNavigation();

    const controller = new AbortController();

    const Selecionar = () => {
        axios.get(urlAPI + 'selpessoaspesquisa', { signal: controller.signal })
            .then(response => {
                if (response.data) dadosPessoas.current = response.data;
            }).catch(CatchError);
        axios.get(urlAPI + 'selanimaispesquisa', { signal: controller.signal })
            .then(response => {
                if (response.data) dadosAnimais.current = response.data;
            }).catch(CatchError);
    }

    const PegarId = async () => {
        const decodedToken = await DecodificarToken();
        TB_PESSOA_IDD.current = decodedToken.TB_PESSOA_IDD;
    }

    useEffect(() => {
        Selecionar();
        PegarId();
        return (() => {
            controller.abort();
        })
    }, []);

    // Função para atualizar a lista de pessoas com base no texto da pesquisa
    const FiltrarPessoasPorTipo = (type) => {
        return dadosPessoas.current
            .filter(pessoa => RemoverAcentos(pessoa.TB_PESSOA_NOME_PERFIL).includes(RemoverAcentos(pesquisa)))
            .filter(pessoa => type.includes(pessoa.TB_TIPO_ID))
    }

    const FiltrarAnimais = (especie, castrado, vermifugado, microchipado) => {
        return dadosAnimais.current
            .filter(animal => RemoverAcentos(animal.TB_ANIMAL_NOME).includes(RemoverAcentos(pesquisa)))
            .filter(animal => especie.includes(animal.TB_ANIMAL_ESPECIE))
            .filter(animal => castrado.includes(animal.TB_ANIMAL_CASTRADO))
            .filter(animal => vermifugado.includes(animal.TB_ANIMAL_VERMIFUGADO))
            .filter(animal => microchipado.includes(animal.TB_ANIMAL_MICROCHIP))
    }

    const usuarios = useMemo(() => {
        const tipos = ChecarTiposFiltro(filtroTipo.current)
        if (filtroSelecionar.current)
            return FiltrarPessoasPorTipo(tipos);
    }, [dadosPessoas.current, pesquisa, filtroSelecionar.current, filtroTipo.current]);

    const animais = useMemo(() => {
        const tiposEspecies = ChecarEspeciesFiltro(filtroEspecie.current);
        const tiposCastrados = ChecarAplicacoesFiltro(filtroCastrado.current);
        const tiposVermifugados = ChecarAplicacoesFiltro(filtroVermifugado.current);
        const tiposMicrochipados = ChecarAplicacoesFiltro(filtroMicrochipado.current);
        if (!filtroSelecionar.current)
            return FiltrarAnimais(tiposEspecies, tiposCastrados, tiposVermifugados, tiposMicrochipados);
    }, [dadosAnimais.current, pesquisa, filtroSelecionar.current, filtroEspecie.current, filtroCastrado.current, filtroVermifugado.current, filtroMicrochipado.current]);

    const item1 = {
        icone: <Ionicons name="paw-outline" size={28} color="black" />,
        texto: 'Cadastrar um animal',
        press: () => navigation.navigate('CadastroAnimal')
    }
    const item2 = {
        icone: <AntDesign name="picture" size={28} color="black" />,
        texto: 'Cadastrar uma postagem',
        press: () => navigation.navigate('CadPostagem')
    }
    const item3 = {
        icone: <Feather name="map-pin" size={28} color="black" />,
        texto: 'Cadastrar um ponto de alimentação',
        press: () => navigation.navigate('CadastroPontoAlimento')
    }

    const Abrir = () => {
        animateIn();
    }

    const Fechar = () => {
        setPesquisa('');
        textInputRef.current.blur();
        animateOut();
    }

    const AbrirModal = () => {
        setModalVisible(true);
        Keyboard.dismiss();
    }

    const translateY = useRef(new Animated.Value(-1000)).current;

    const animateIn = () => {
        Animated.timing(translateY, {
            toValue: 55,
            duration: 250,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start(() => setResultsVisible(true));
    };

    const animateOut = () => {
        Animated.timing(translateY, {
            toValue: -1000,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start(() => setResultsVisible(false));
    };

    return (
        <>
            <View style={styles.header}>
                <TouchableOpacity style={styles.Botao} onPress={() => navigation.navigate('Perfil', { id: TB_PESSOA_IDD.current })}>
                    <Octicons name="person" size={35} color="white" />
                </TouchableOpacity>
                <View style={styles.barraPesquisa}>
                    <MaterialIcons style={styles.IconePesquisa} name="search" size={25} color="#097396" />
                    <TextInput placeholder='Pesquisar' style={styles.campo} onChangeText={text => setPesquisa(text)} value={pesquisa} onFocus={Abrir} ref={textInputRef} />
                    {resultsVisible && <>
                        <TouchableOpacity onPress={AbrirModal}>
                            <Ionicons name="options" size={30} color="#aaaaaa" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={Fechar}>
                            <AntDesign name="close" size={25} color="black" />
                        </TouchableOpacity>
                    </>}
                </View>
                <ModalFiltrarPesquisa val={modalVisible} set={setModalVisible} filtroSelecionar={filtroSelecionar} filtroTipo={filtroTipo} filtroEspecie={filtroEspecie} filtroCastrado={filtroCastrado} filtroVermifugado={filtroVermifugado} filtroMicrochipado={filtroMicrochipado} />
                <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)} style={styles.Botao}>
                    <Octicons name="diff-added" size={30} color="white" />
                </TouchableOpacity>
                <Dropdown val={dropdownVisible} set={setDropdownVisible} item1={item1} item2={item2} item3={item3} />
            </View>
            <Animated.View style={[styles.containerAnimated, { transform: [{ translateY }] }]}>
                <View style={styles.containerResults}>
                    <ScrollView keyboardShouldPersistTaps='always'>
                        {filtroSelecionar.current ?
                            usuarios.map(item => {
                                const urlImg = urlAPI + 'selpessoaimg/' + item.TB_PESSOA_ID;
                                let tipoNome;
                                if (item.TB_TIPO_ID != 1) {
                                    tipoNome = RetornarTipoNome(item.TB_TIPO_ID);
                                }
                                return (
                                    <Pressable key={item.TB_PESSOA_ID} onPress={() => navigation.navigate('Perfil', { id: item.TB_PESSOA_ID })}>
                                        <View style={styles.contatoPessoa}>
                                            <Imagem url={urlImg} style={styles.contatoImagem} />
                                            <View>
                                                <Text>{item.TB_PESSOA_NOME_PERFIL}</Text>
                                                {tipoNome && <Text style={styles.contatoTipo}>{tipoNome}</Text>}
                                            </View>
                                        </View>
                                        <Divider orientation="vertical" width={1} color="grey" />
                                    </Pressable>
                                )
                            })
                            :
                            animais.map(item => {
                                const urlImg = urlAPI + 'selanimalimg/' + item.TB_ANIMAL_ID;
                                let tipoNome = item.TB_ANIMAL_ESPECIE == 'CACHORRO' ? 'Cachorro' : 'Gato';
                                return (
                                    <Pressable key={item.TB_ANIMAL_ID} onPress={() => navigation.navigate('Ficha', { id: item.TB_ANIMAL_ID })}>
                                        <View style={styles.contatoPessoa}>
                                            <Imagem url={urlImg} style={styles.contatoImagem} />
                                            <View>
                                                <Text>{item.TB_ANIMAL_NOME}</Text>
                                                {tipoNome && <Text style={styles.contatoTipo}>{tipoNome}</Text>}
                                            </View>
                                        </View>
                                        <Divider orientation="vertical" width={1} color="grey" />
                                    </Pressable>
                                )
                            })
                        }
                    </ScrollView>
                </View>
            </Animated.View>
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: corFundoNavegacao,
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        justifyContent: 'space-around',
        display: 'flex',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 10,
    },
    barraPesquisa: {
        flex: 2,
        backgroundColor: '#fff',
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 5,
        height: 35
    },
    Botao: {
        marginLeft: 10,
        marginRight: 10
    },
    IconePesquisa: {
        marginLeft: 4,
        marginRight: 4
    },
    campo: {
        flex: 1,
        fontSize: 15
    },
    containerAnimated: {
        position: 'absolute',
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerResults: {
        flex: 1,
        backgroundColor: '#fafafa',
        width: windowWidth - 50,
        maxHeight: windowHeight - 120,
        justifyContent: 'center',
    },
    contatoPessoa: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        marginVertical: 5,
        alignItems: 'center',
        columnGap: 10
    },
    contatoImagem: {
        borderRadius: 25
    },
    contatoTipo: {
        fontStyle: 'italic',
        color: 'gray'
    },
});

export default HeaderExplorar