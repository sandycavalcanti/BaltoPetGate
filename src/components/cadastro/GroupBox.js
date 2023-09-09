import { View, Text, StyleSheet } from 'react-native';
import { corBordaBoxCad, corFundoCad, corTituloBoxCad } from '../../constants';

const GroupBox = (props) => {
    return (
        <View style={styles.groupBox}>
            <Text style={styles.titulo}>{props.titulo}</Text>
            {props.children}
        </View>
    );
};
const styles = StyleSheet.create({
    groupBox: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        paddingTop: 10,
        paddingBottom: 10,
        borderWidth: 2,
        borderColor: corBordaBoxCad,
        borderRadius: 10,
        marginVertical: 20,
        position: 'relative',
    },
    titulo: {
        fontSize: 22,
        color: corTituloBoxCad,
        position: 'absolute',
        top: -20,
        marginBottom: 10,
        paddingHorizontal: 5,
        backgroundColor: corFundoCad,
    },
});

export default GroupBox