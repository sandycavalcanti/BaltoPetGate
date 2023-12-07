import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import Modal from 'react-native-modals'
import Imagem from '../geral/Imagem'
import { urlAPI } from '../../constants'

const ModalSeguindo = (props) => {
    const altura = props.seguindo?.length * 60 + 5;
    return (
        <Modal visible={props.val} onTouchOutside={() => props.set(false)}>
            <View style={[styles.ContainerAvaliacao, { height: altura }]} >
                <ScrollView style={{ flex: 1 }}>
                    <View>
                        {props.seguindo && props.seguindo.map((item, index) => {
                            const urlImg = urlAPI + 'selpessoaimg/' + item.TB_PESSOA_REMETENTE_ID;
                            const nome = item["TB_PESSOA_REMETENTE.TB_PESSOA_NOME_PERFIL"];
                            return (
                                <View style={styles.ContainerSeguindo} key={index}>
                                    <Imagem url={urlImg} style={styles.Imagem} />
                                    <Text style={styles.nome}>{nome}</Text>
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    ContainerAvaliacao: {
        width: 320,
        backgroundColor: '#EFEFEF',
        borderColor: '#CF8989',
        borderWidth: 2,
        borderRadius: 6
    },
    ContainerSeguindo: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
    },
    Imagem: {
        borderRadius: 100,
        marginLeft: 10,
    },
    nome: {
        color: '#A50C0C',
        fontSize: 18,
        marginLeft: 10,
    }
});
export default ModalSeguindo