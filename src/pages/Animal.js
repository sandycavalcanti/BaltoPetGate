import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { corFundoCad } from "../constants";

const Animal = ({ navigation: { navigate } }) => {

    const Ficha = () => {
        navigate("Ficha");
    }

    return (
        <View style={styles.container}>
            <Text>Animal</Text>
            <TouchableOpacity onPress={Ficha}>
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

export default Animal;