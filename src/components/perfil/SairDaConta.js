import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from "react-native-modal";
import { Divider } from "react-native-elements";

const SairDaConta = (props) => {
    const navigation = useNavigation();
    const SairDaConta = async () => {
        await AsyncStorage.removeItem('token');
        navigation.navigate('Login');
    }

    return (
        <Modal isVisible={props.val} backdropOpacity={0.2} onBackdropPress={() => props.set(false)} swipeDirection="down">
            <View style={styles.dropdown}>
                <Text style={styles.dropdownTitle}>Deseja sair da conta?</Text>
                <View style={styles.dropdownButtons}>
                    <TouchableOpacity style={styles.dropdownButton} onPress={SairDaConta}>
                        <Text style={styles.textDropdownButton}>Sim</Text>
                    </TouchableOpacity>
                    <Divider orientation="vertical" width={1} color="grey" />
                    <TouchableOpacity style={styles.dropdownButton} onPress={() => props.set(false)}>
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
        width: '70%',
        alignItems: 'center'
    },
    dropdownButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        flex: 1,
    },
    textDropdownButton: {
        fontSize: 15,
    },
    dropdownTitle: {
        fontSize: 20,
        textAlign: 'center',
        paddingVertical: 20,
    },
    dropdownButtons: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: 'grey',
        backgroundColor: '#F2DFE1',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    }
});
export default SairDaConta