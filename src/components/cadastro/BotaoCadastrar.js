import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { corBotaoCad, corTextoBotaoCad } from '../../constants';
import PropTypes from 'prop-types';

const BotaoCadastrar = (props) => {
    return (
        <TouchableOpacity {...props} style={[styles.botaocadastro, props.styleBotao]}>
            <Text style={[styles.textocadastro, props.styleTexto]}>{props.texto ? props.texto : 'Cadastrar'}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    botaocadastro: {
        width: '80%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: corBotaoCad,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 35,
        elevation: 5,
    },
    textocadastro: {
        color: corTextoBotaoCad,
        fontSize: 20,
    },
});

BotaoCadastrar.propTypes = {
    texto: PropTypes.string,
    onPress: PropTypes.func,
    styleBotao: PropTypes.object,
    styleTexto: PropTypes.object
}

export default BotaoCadastrar