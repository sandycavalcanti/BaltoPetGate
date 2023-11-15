import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const BotaoImg = (props) => {
    return (
        <TouchableOpacity {...props} style={[styles.botaocadastro, props.styleBotao]}>
            <Text style={[styles.textocadastro, props.styleTexto]}>{props.texto ? props.texto : 'Acrescentar uma imagem'}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    botaocadastro: {
        width: '90%',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEECEC',
        borderRadius: 10,
        marginTop: '10%',
        elevation: 5,
    },
    textocadastro: {
        color: '#8EBF81',
        fontSize: 18,
    },
});

BotaoImg.propTypes = {
    onPress: PropTypes.func,
    texto: PropTypes.string,
    styleBotao: PropTypes.object,
    styleTexto: PropTypes.object
}

export default BotaoImg