import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { corBotaoCad, corBotaoAceitar, corTextoBotaoCad } from '../../constants';
import PropTypes from 'prop-types';

const BotaoAceitar = (props) => {
    return (
        <TouchableOpacity {...props} style={styles.botaocadastro}>
            <Text style={styles.textocadastro}>{props.texto ? props.texto : 'Cadastrar'}</Text>
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

BotaoAceitar.propTypes = {
    texto: PropTypes.string,
    onPress: PropTypes.func,
}

export default BotaoAceitar