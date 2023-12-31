import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const Questao = (props) => {
    return (
        <View style={styles.Questao}>
            <Text style={styles.Pergunta}>{props.texto}</Text>
            <View style={styles.Resposta}>
                <Text>{props.resposta}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    Questao: {
        width: '100%',
        alignItems: 'center',
        borderColor: '#fff',
        borderBottomWidth: 1,
        padding: 20
    },
    Pergunta: {
        fontSize: 19,
        textAlign: 'center'
    },
    Resposta: {
        backgroundColor: "#fff",
        paddingHorizontal: 30,
        paddingVertical: 10,
        marginTop: 15,
        borderRadius: 15
    },
});

Questao.propTypes = {
    texto: PropTypes.string,
    resposta: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default Questao