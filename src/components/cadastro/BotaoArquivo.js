import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { corPlaceholderCad } from '../../constants';
import PropTypes from 'prop-types';

const BotaoArquivo = (props) => {
    return (
        <TouchableOpacity {...props} style={[styles.botaocadastro, props.styleBotao]}>
            <Text style={[styles.textocadastro, props.styleTexto]}>{props.texto ? props.texto : 'Escolha um arquivo'}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    botaocadastro: {
        width: '50%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fafafa',
        borderRadius: 50,
        marginTop: 10,
        // marginBottom: 35,
        elevation: 5,
    },
    textocadastro: {
        color: corPlaceholderCad,
        fontSize: 18,
    },
});

BotaoArquivo.propTypes = {
    texto: PropTypes.string,
    onPress: PropTypes.func,
    styleBotao: PropTypes.object,
    styleTexto: PropTypes.object
}

export default BotaoArquivo