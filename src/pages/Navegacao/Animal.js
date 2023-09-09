import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { corFundoCad } from "../../constants";

const Animal = ({ navigation: { navigate } }) => {

    return (
        <View style={styles.container}>
            <Text>Animal</Text>
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