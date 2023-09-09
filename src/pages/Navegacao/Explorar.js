import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { corFundoCad } from "../../constants";

const Explorar = ({ navigation: { navigate } }) => {

    const Logar = () => {
        navigate("HisChat");
    }

    return (
        <View style={styles.container}>
            <Text>Explorar</Text>
            <TouchableOpacity onPress={Logar}>
                <Text>Clique</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: corFundoCad,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
});

export default Explorar;