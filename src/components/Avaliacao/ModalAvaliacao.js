import { View, ScrollView, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import Avaliacoes from './Avaliacoes'

const ModalAvaliacao = (props) => {

    const Fechar = () => {
        props.set(false)
    }

    return (
        <Modal visible={props.val} transparent animationType='fade' onDismiss={Fechar} onRequestClose={Fechar}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPressOut={Fechar}>
                    <ScrollView directionalLockEnabled={true} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableWithoutFeedback>
                            <View style={styles.ContainerAvaliacao} >
                                <ScrollView style={{ flex: 1 }}>
                                    {props.avaliacoes.Selecionar && props.avaliacoes.Selecionar.map((item, index) => <Avaliacoes key={index} data={item} />)}
                                </ScrollView>
                            </View>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                </TouchableOpacity>
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
});

export default ModalAvaliacao