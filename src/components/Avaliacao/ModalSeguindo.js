import { View, Text, StyleSheet, ScrollView, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import Imagem from '../geral/Imagem'

const ModalSeguindo = (props) => {

    const altura = props.seguindo?.length * 60 + 5;

    const Fechar = () => {
        props.set(false)
    }

    return (
        <Modal visible={props.val} transparent animationType='fade' onDismiss={Fechar} onRequestClose={Fechar}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPressOut={Fechar}>
                    <ScrollView directionalLockEnabled={true} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableWithoutFeedback>
                            <View style={[styles.ContainerAvaliacao, { height: altura }]} >
                                <ScrollView style={{ flex: 1 }}>
                                    <View>
                                        {props.seguindo && props.seguindo.map((item, index) => {
                                            const nome = item["TB_PESSOA_REMETENTE.TB_PESSOA_NOME_PERFIL"];
                                            const possuiImg = item["TB_PESSOA_REMETENTE.TB_PESSOA_POSSUI_IMG"];
                                            return (
                                                <View style={styles.ContainerSeguindo} key={index}>
                                                    <Imagem id={item.TB_PESSOA_REMETENTE_ID} existe={possuiImg} style={styles.Imagem} />
                                                    <Text style={styles.nome}>{nome}</Text>
                                                </View>
                                            )
                                        })}
                                    </View>
                                </ScrollView>
                            </View>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                </TouchableOpacity></View>
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