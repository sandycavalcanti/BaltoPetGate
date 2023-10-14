import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Modal } from 'react-native-modals';
import { Divider } from "react-native-elements";

const SairDaConta = (props) => {
    const navigation = useNavigation();
    const SairDaConta = async () => {
        await AsyncStorage.removeItem('token');
        navigation.navigate('Login');
    }

    const Fechar = () => {
        props.set(false)
    }

    return (
        <Modal visible={props.val} swipeDirection={['up', 'down']} swipeThreshold={200} onSwipeOut={Fechar} onTouchOutside={Fechar}>
            <View style={styles.dropdown}>
                <Text style={styles.dropdownTitle}>Deseja sair da conta?</Text>
                <View style={styles.dropdownButtons}>
                    <TouchableOpacity style={styles.dropdownButton} onPress={SairDaConta}>
                        <Text style={styles.textDropdownButton}>Sair</Text>
                    </TouchableOpacity>
                    <Divider orientation="vertical" width={1} color="grey" />
                    <TouchableOpacity style={styles.dropdownButton} onPress={Fechar}>
                        <Text style={styles.textDropdownButton}>Não</Text>
                    </TouchableOpacity>
                </View>
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
        alignSelf: 'center',
        width: '100%',
        alignItems: 'center',
        position: 'relative',
    },
    dropdownTitle: {
        fontSize: 20,
        textAlign: 'center',
        paddingVertical: 25,
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
export default SairDaConta