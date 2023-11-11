import { Text, TouchableOpacity, Modal, StyleSheet, View } from 'react-native';
import { Divider } from "react-native-elements";
import PropTypes from 'prop-types';

const Dropdown = (props) => {
    let valorScroll = valorDireita = 0;
    if (props.valorScroll) valorScroll = props.valorScroll;
    if (props.valorDireita) valorDireita = props.valorDireita;

    return (
        <View style={{ position: 'absolute' }}>
            <Modal visible={props.val} transparent={true} animationType="none" onRequestClose={() => props.set(false)} >
                <TouchableOpacity style={styles.dropdownBackdrop} onPress={() => props.set(false)} >
                    <View style={[styles.dropdown, { top: 45 - valorScroll, right: 15 - valorDireita }]}>
                        <TouchableOpacity style={styles.dropdownButton} onPress={props.item1.press} >
                            {props.item1.icone &&
                                <View style={{ marginRight: 10 }}>
                                    {props.item1.icone}
                                </View>}
                            <Text style={styles.textDropdownButton}>{props.item1.texto}</Text>
                        </TouchableOpacity>
                        {props.item2 &&
                            <>
                                <Divider width={1} color="black" />
                                <TouchableOpacity style={styles.dropdownButton} onPress={props.item2.press}>
                                    {props.item2.icone &&
                                        <View style={{ marginRight: 10 }}>
                                            {props.item2.icone}
                                        </View>}
                                    <Text style={styles.textDropdownButton} >{props.item2.texto}</Text>
                                </TouchableOpacity>
                            </>}
                        {props.item3 &&
                            <>
                                <Divider width={1} color="black" />
                                <TouchableOpacity style={styles.dropdownButton} onPress={props.item3.press}>
                                    {props.item3.icone &&
                                        <View style={{ marginRight: 10 }}>
                                            {props.item3.icone}
                                        </View>}
                                    <Text style={styles.textDropdownButton}>{props.item3.texto}</Text>
                                </TouchableOpacity>
                            </>}
                        {props.item4 &&
                            <>
                                <Divider width={1} color="black" />
                                <TouchableOpacity style={styles.dropdownButton} onPress={props.item4.press}>
                                    {props.item4.icone &&
                                        <View style={{ marginRight: 10 }}>
                                            {props.item4.icone}
                                        </View>}
                                    <Text style={styles.textDropdownButton} >{props.item4.texto}</Text>
                                </TouchableOpacity>
                            </>}
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    dropdown: {
        position: 'absolute',
        backgroundColor: 'white',
        borderColor: '#B18888',
        borderWidth: 1,
        borderRadius: 10,
        paddingTop: 10,
        paddingBottom: 5,
        zIndex: 1,
        borderWidth: 1,
        borderColor: 'gray',
    },
    dropdownButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        minWidth: 175,
        maxWidth: 235,
        paddingLeft: 10,
        paddingRight: 25,
    },
    dropdownBackdrop: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textDropdownButton: {
        fontSize: 15,
    },
    opcao: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
});

Dropdown.propTypes = {
    set: PropTypes.func,
    val: PropTypes.bool,
    item1: PropTypes.object,
    item2: PropTypes.object,
    item3: PropTypes.object,
    item4: PropTypes.object,
    valorScroll: PropTypes.number,
    valorDireita: PropTypes.number,
}

export default Dropdown