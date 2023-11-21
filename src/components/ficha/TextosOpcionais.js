import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const TextosOpcionais = (props) => {
    return (
        <View style={styles.Container}>
            <Text style={styles.Descricao}>
                {props.textosOpcionais}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        backgroundColor: '#FAF1F1',
        marginLeft: 5,
        borderColor: '#CE7272',
        borderWidth: 2,
        borderRadius: 12,
        padding: 6
    },
    Descricao: {
        color: '#CE7272',
        fontSize: 15,
        margin: 3
    }
});

TextosOpcionais.propTypes = {
    textosOpcionais: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default TextosOpcionais;