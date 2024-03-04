import { StyleSheet, Text, View, TouchableOpacity, Modal, ScrollView, TouchableWithoutFeedback } from "react-native";
import { Divider } from "react-native-elements";
import PropTypes from 'prop-types';

const ModalConfirmacao = (props) => {
    const Press = () => {
        props.press();
        Fechar();
    }

    const Fechar = () => {
        props.set(false)
    }

    return (
        <Modal visible={props.val} transparent animationType='slide' onDismiss={Fechar} onRequestClose={Fechar}>
            <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPressOut={Fechar}>
                <ScrollView directionalLockEnabled={true} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableWithoutFeedback>
                        <View style={[styles.dropdown, { width: props.width ? props.width : '90%' }]}>
                            <Text style={[styles.dropdownTitle, { paddingBottom: props.subtexto ? 15 : 25 }]}>{props.texto}</Text>
                            {props.subtexto &&
                                <>
                                    <Divider width={1} color="grey" style={{ alignSelf: 'stretch' }} />
                                    <Text style={styles.dropdownSubTitle}>{props.subtexto}</Text>
                                </>}
                            <View style={styles.dropdownButtons}>
                                <TouchableOpacity style={styles.dropdownButton} onPress={Press}>
                                    <Text style={styles.textDropdownButton}>{props.sim ? props.sim : 'Sim'}</Text>
                                </TouchableOpacity>
                                <Divider orientation="vertical" width={1} color="grey" />
                                <TouchableOpacity style={styles.dropdownButton} onPress={Fechar}>
                                    <Text style={styles.textDropdownButton}>{props.nao ? props.nao : 'Não'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </TouchableOpacity>
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
        alignSelf: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    dropdownTitle: {
        fontSize: 20,
        textAlign: 'center',
        paddingTop: 25,
        paddingHorizontal: 20
    },
    dropdownSubTitle: {
        fontSize: 16,
        textAlign: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    dropdownButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        flex: 1,
    },
    dropdownButtons: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: 'grey',
        backgroundColor: '#F2DFE1',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    textDropdownButton: {
        fontSize: 18,
        fontWeight: '400',
    },
});

ModalConfirmacao.propTypes = {
    press: PropTypes.func,
    set: PropTypes.func,
    val: PropTypes.bool,
    texto: PropTypes.string,
    subtexto: PropTypes.string,
    sim: PropTypes.string,
    nao: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ModalConfirmacao