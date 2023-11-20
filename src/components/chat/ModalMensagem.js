import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Modal } from 'react-native-modals';
import { Divider } from 'react-native-elements';

const ModalMensagem = (props) => {
    const setModalVisible = props.set;
    const modalVisible = props.val;
    return (
        <Modal visible={modalVisible} swipeDirection={['up', 'down']} swipeThreshold={200} onSwipeOut={() => setModalVisible(false)} onTouchOutside={() => setModalVisible(false)} >
            <View style={styles.dropdown}>
                {props.msgPessoal ?
                    <>
                        {props.podeExcluir &&
                            <>
                                {props.podeEditar &&
                                    <TouchableOpacity style={styles.dropdownButton} onPress={() => { props.alterar(); setModalVisible(false) }}>
                                        <Text style={styles.textDropdownButton}>Editar mensagem</Text>
                                    </TouchableOpacity>}
                                <Divider orientation="vertical" width={1} color="grey" />
                                <TouchableOpacity style={styles.dropdownButton} onPress={() => { props.excluir(); setModalVisible(false) }}>
                                    <Text style={styles.textDropdownButton}>Excluir mensagem</Text>
                                </TouchableOpacity>
                            </>
                        }
                    </>
                    :
                    <>
                        <TouchableOpacity style={styles.dropdownButton} onPress={() => { props.responder(); setModalVisible(false) }}>
                            <Text style={styles.textDropdownButton}>Responder</Text>
                        </TouchableOpacity>
                        <Divider orientation="vertical" width={1} color="grey" />
                        <TouchableOpacity style={styles.dropdownButton} onPress={() => { props.denunciar(); setModalVisible(false) }}>
                            <Text style={styles.textDropdownButton}>Denunciar conversa</Text>
                        </TouchableOpacity>
                    </>
                }
                <Divider orientation="vertical" width={1} color="grey" />
                <TouchableOpacity style={styles.dropdownButton} onPress={() => setModalVisible(false)}>
                    <Text style={styles.textDropdownButton}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    dropdown: {
        backgroundColor: 'white',
        borderColor: '#B18888',
        borderRadius: 10,
        zIndex: 12,
        borderWidth: 1,
    },
    dropdownButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 220,
        height: 45,
    },
    textDropdownButton: {
        fontSize: 18,
        fontWeight: '400',
    },
})

export default ModalMensagem