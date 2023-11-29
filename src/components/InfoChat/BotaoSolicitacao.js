import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { corBotaoAceitar, corTextoBotaoCad } from '../../constants';
import PropTypes from 'prop-types';

const BotaoSolicitacao = (props) => {
    return (
        <TouchableOpacity {...props} style={[styles.botaocadastro, props.styleBotao]}>
            <Text style={[styles.textocadastro,props.styleTexto]}>{props.texto ? props.texto : 'Aceitar'}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    botaocadastro: {
        width: '80%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: corBotaoAceitar,
        borderRadius: 10,
        marginBottom: 35,
        elevation: 5,
    },
    textocadastro: {
        color: corTextoBotaoCad,
        fontSize: 20,
    },
});

BotaoSolicitacao.propTypes = {
    texto: PropTypes.string,
    onPress: PropTypes.func,
    styleBotao: PropTypes.object,
    styleTexto: PropTypes.object
}

export default BotaoSolicitacao