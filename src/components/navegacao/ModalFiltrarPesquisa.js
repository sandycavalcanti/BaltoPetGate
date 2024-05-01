import { View, Text, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import RetornarTipoNome from '../../utils/RetornarTipoNome';
import { AntDesign } from '@expo/vector-icons';
import { corHabilitado } from '../../constants';
import BotaoCheckBox from '../geral/BotaoCheckBox';
import { useRoute } from '@react-navigation/native';

const modalWidth = 300;

const ModalFiltrarPesquisa = (props) => {
    const route = useRoute();
    const nomeDaTelaAtual = route.name;

    const pesquisandoTipos = props.filtroTipo;
    const pesquisandoEspecies = props.filtroEspecie;
    const pesquisandoCastrado = props.filtroCastrado;
    const pesquisandoVermifugado = props.filtroVermifugado;
    const pesquisandoMicrochipado = props.filtroMicrochipado;
    const [pesquisandoPessoas, setPesquisandoPessoas] = useState(true);

    const toggleCheckboxTipo = (index) => {
        const checkboxes = pesquisandoTipos.current;
        const updatedCheckboxes = [...checkboxes];
        updatedCheckboxes[index] = !updatedCheckboxes[index];
        pesquisandoTipos.current = updatedCheckboxes;
    };

    const toggleCheckboxEspecies = (index) => {
        const checkboxes = pesquisandoEspecies.current;
        const updatedCheckboxes = [...checkboxes];
        updatedCheckboxes[index] = !updatedCheckboxes[index];
        pesquisandoEspecies.current = updatedCheckboxes;
    }

    const toggleCheckboxAplicacoes = (array, index) => {
        const checkboxes = array.current;
        const updatedCheckboxes = [...checkboxes];
        updatedCheckboxes[index] = !updatedCheckboxes[index];
        array.current = updatedCheckboxes;
    }

    const Fechar = () => {
        props.set(false)
    }

    const CliqueFiltroSelecionar = (bool) => {
        setPesquisandoPessoas(bool);
        props.filtroSelecionar.current = bool;
    }

    useEffect(() => {
        if (nomeDaTelaAtual == 'Animal') {
            CliqueFiltroSelecionar(false);
        }
    }, []);

    return (
        <>
            <Modal visible={props.val} transparent animationType='slide' onDismiss={Fechar} onRequestClose={Fechar}>
                <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPressOut={Fechar}>
                    <ScrollView directionalLockEnabled={true} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableWithoutFeedback>
                            <View style={styles.dropdown}>
                                <Text style={[styles.dropdownTitle, { color: 'grey', fontSize: 18 }]}>Opções de filtro</Text>
                                <Text style={styles.dropdownTitle}>Pesquisar por:</Text>
                                <View style={styles.viewBotoesSelecionar}>
                                    <TouchableOpacity onPress={() => CliqueFiltroSelecionar(true)} style={[styles.botaoSelecionar, { backgroundColor: pesquisandoPessoas ? corHabilitado : '#ededed' }]}>
                                        <Text>Pessoas</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => CliqueFiltroSelecionar(false)} style={[styles.botaoSelecionar, { backgroundColor: pesquisandoPessoas ? '#ededed' : corHabilitado }]}>
                                        <Text>Animais</Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity onPress={Fechar} style={styles.botaoFechar}>
                                    <AntDesign name="close" size={25} color="black" />
                                </TouchableOpacity>
                                <View style={styles.containerOpcoes}>
                                    {pesquisandoPessoas ?
                                        <>
                                            <Text style={styles.containerOpcoesTitle}>Tipo:</Text>
                                            {pesquisandoTipos.current.map((isChecked, index) => {
                                                let tipo = RetornarTipoNome(index + 1)
                                                return (
                                                    <BotaoCheckBox texto={tipo} valor={isChecked} styleViewTexto={{ width: 140 }} onPress={() => toggleCheckboxTipo(index)} key={index} />
                                                )
                                            })}
                                        </>
                                        :
                                        <>
                                            <Text style={styles.containerOpcoesTitle}>Espécie:</Text>
                                            <View style={styles.viewBotoesSelecionar}>
                                                <View style={styles.botaoFiltroEsquerda}>
                                                    <BotaoCheckBox texto='Cachorro' valor={pesquisandoEspecies.current[0]} onPress={() => toggleCheckboxEspecies(0)} />
                                                </View>
                                                <View style={styles.botaoFiltroDireita}>
                                                    <BotaoCheckBox texto='Gato' valor={pesquisandoEspecies.current[1]} onPress={() => toggleCheckboxEspecies(1)} />
                                                </View>
                                            </View>
                                            <Text style={styles.containerOpcoesSubtitle}>Castrado:</Text>
                                            <View style={styles.viewBotoesSelecionar}>
                                                <View style={styles.botaoFiltroEsquerda}>
                                                    <BotaoCheckBox texto='Castrado' valor={pesquisandoCastrado.current[0]} onPress={() => toggleCheckboxAplicacoes(pesquisandoCastrado, 0)} />
                                                </View>
                                                <View style={styles.botaoFiltroDireita}>
                                                    <BotaoCheckBox texto='Não' valor={pesquisandoCastrado.current[1]} onPress={() => toggleCheckboxAplicacoes(pesquisandoCastrado, 1)} />
                                                </View>
                                            </View>
                                            <Text style={styles.containerOpcoesSubtitle}>Vermifugado:</Text>
                                            <View style={styles.viewBotoesSelecionar}>
                                                <View style={styles.botaoFiltroEsquerda}>
                                                    <BotaoCheckBox texto='Vermifugado' valor={pesquisandoVermifugado.current[0]} onPress={() => toggleCheckboxAplicacoes(pesquisandoVermifugado, 0)} />
                                                </View>
                                                <View style={styles.botaoFiltroDireita}>
                                                    <BotaoCheckBox texto='Não' valor={pesquisandoVermifugado.current[1]} onPress={() => toggleCheckboxAplicacoes(pesquisandoVermifugado, 1)} />
                                                </View>
                                            </View>
                                            <Text style={styles.containerOpcoesSubtitle}>Microchipado:</Text>
                                            <View style={styles.viewBotoesSelecionar}>
                                                <View style={styles.botaoFiltroEsquerda}>
                                                    <BotaoCheckBox texto='Microchipado' valor={pesquisandoMicrochipado.current[0]} onPress={() => toggleCheckboxAplicacoes(pesquisandoMicrochipado, 0)} />
                                                </View>
                                                <View style={styles.botaoFiltroDireita}>
                                                    <BotaoCheckBox texto='Não' valor={pesquisandoMicrochipado.current[1]} onPress={() => toggleCheckboxAplicacoes(pesquisandoMicrochipado, 1)} />
                                                </View>
                                            </View>
                                        </>
                                    }
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                </TouchableOpacity>
            </Modal >
        </>
    )
}

const styles = StyleSheet.create({
    dropdown: {
        backgroundColor: 'white',
        borderColor: '#B18888',
        borderRadius: 10,
        zIndex: 12,
        borderWidth: 1,
        alignSelf: 'center',
        width: modalWidth,
        alignItems: 'center',
        position: 'relative',
    },
    dropdownTitle: {
        fontSize: 20,
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 5,
        paddingHorizontal: 20
    },
    viewBotoesSelecionar: {
        width: modalWidth - 2,
        height: 35,
        flexDirection: 'row',
        marginBottom: 5,
        justifyContent: 'center',
    },
    botaoSelecionar: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    botaoFechar: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    containerOpcoes: {
        width: modalWidth,
        alignItems: 'center',
        height: 300,
    },
    containerOpcoesTitle: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 10,
        paddingBottom: 5,
    },
    containerOpcoesSubtitle: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 5,
    },
    botaoFiltroEsquerda: {
        width: '60%',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        paddingLeft: 20,
    },
    botaoFiltroDireita: {
        width: '40%',
        justifyContent: 'flex-start',
        flexDirection: 'row'
    }
});

export default ModalFiltrarPesquisa