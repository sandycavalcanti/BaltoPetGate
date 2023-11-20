import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const Temperamento = (props) => {
    return (
        <View style={styles.Campo}>
            <Text style={styles.Texto}>{props.texto.TB_TEMPERAMENTO.TB_TEMPERAMENTO_TIPO}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    Campo: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 12,
        borderColor: '#74AC86',
        paddingVertical: 2,
        paddingHorizontal: 4,
        marginLeft: 5,
    },
    Texto: {
        color: '#74AC86',
        fontSize: 16
    }
});

Temperamento.propTypes = {
    texto: PropTypes.object
}

export default Temperamento;