import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { corBotaoCad, corTextoBotaoCad } from '../../constants';
import PropTypes from 'prop-types';

const BotaoOpcaoCadastro = (props) => {
    return (
        <TouchableOpacity {...props} style={[styles.botao, props.styleBotao]}>
            <Text style={[styles.texto, props.styleTexto]}> {props.texto} </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    botao: {
        width: '80%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: corBotaoCad,
        borderRadius: 10,
        marginVertical: 10,
        elevation: 5,
    },
    texto: {
        color: corTextoBotaoCad,
        fontSize: 20,
    },
});

BotaoOpcaoCadastro.propTypes = {
    texto: PropTypes.string,
    onPress: PropTypes.func,
    styleBotao: PropTypes.object,
    styleTexto: PropTypes.object
}

export default BotaoOpcaoCadastro