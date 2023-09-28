import AnimalPost from '../../components/perfil/AnimalPost';
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { corFundoCad } from "../../constants";

const Animal = ({ navigation: { navigate } }) => {
    return (
        <View style={styles.container}>
           
            {/* Renderize AnimalPost aqui */}
            <AnimalPost navigate={navigate} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: corFundoCad,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '80%',
    },
});

export default Animal;
